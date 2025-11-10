require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // v2 for CommonJS

const { geocodeCity } = require('./services/nominatim');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File-based cache
const CACHE_FILE = path.join(__dirname, 'routeCache.json');
let cache = {};

function loadCache() {
  try {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    cache = raw ? JSON.parse(raw) : {};
  } catch {
    cache = {};
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  }
}

function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (err) {
    console.error('Failed to write cache:', err.message);
  }
}

function makeKey(a, b) {
  return [String(a).toLowerCase().trim(), String(b).toLowerCase().trim()].sort().join('::');
}

function normalizeCityName(name) {
  return String(name).toLowerCase().trim();
}

function makeTripKey(cities, tripType) {
  const type = (String(tripType || 'oneway').toLowerCase().trim());
  const list = cities.map(normalizeCityName);
  return `trip::${type}::${list.join('>')}`;
}

loadCache();

/**
 * GET /api/distance?from=Delhi,India&to=Agra,India
 */
app.get('/api/distance', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Missing from/to query' });

  const fromName = String(from).trim();
  const toName = String(to).trim();
  if (fromName.toLowerCase() === toName.toLowerCase()) {
    return res.status(400).json({ error: 'from and to must be different' });
  }

  // Cache-first lookup
  const key = makeKey(fromName, toName);
  const cached = cache[key];
  if (cached) {
    console.log('Cache hit:', key);
    const roundedKm = Math.round(Number(cached.distanceKm));
    return res.json({
      from: fromName,
      to: toName,
      distanceKm: roundedKm,
      durationHrs: cached.durationHrs,
      source: 'cache'
    });
  }

  // Step 1: Geocode both cities using Nominatim
  try {
    const [fromGeo, toGeo] = await Promise.all([
      geocodeCity(fromName),
      geocodeCity(toName)
    ]);

    if (!fromGeo || !toGeo) {
      return res.status(400).json({ error: 'Unable to geocode one or both cities' });
    }

    // Step 2: Call OSRM with coordinates
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromGeo.lon},${fromGeo.lat};${toGeo.lon},${toGeo.lat}?overview=false`;
    const response = await fetch(osrmUrl);
    if (!response.ok) {
      return res.status(502).json({ error: `OSRM HTTP ${response.status}` });
    }
    const data = await response.json();
    const route = data?.routes?.[0];
    if (!route) {
      return res.status(404).json({ error: 'No route found' });
    }

    const distanceKm = Math.round(route.distance / 1000);
    const durationHrs = Number((route.duration / 3600).toFixed(1));

    // Step 3: Cache result persistently
    cache[key] = {
      distanceKm,
      durationHrs,
      updatedAt: new Date().toISOString(),
      from: fromGeo.displayName || fromName,
      to: toGeo.displayName || toName
    };
    saveCache();

    // Step 4: Return OSRM result
    return res.json({ from: fromName, to: toName, distanceKm, durationHrs, source: 'osrm' });
  } catch (err) {
    console.error('Error computing route:', err.message);
    return res.status(500).json({ error: 'Failed to compute route' });
  }
});

/**
 * POST /api/distance
 * Body: { cities: string[], tripType?: 'round'|'oneway' }
 * Computes multi-stop/round-trip total distance and duration via OSRM.
 */
app.post('/api/distance', async (req, res) => {
  try {
    const { cities, tripType } = req.body || {};
    if (!Array.isArray(cities) || cities.length < 2) {
      return res.status(400).json({ error: 'Provide at least two cities in the "cities" array' });
    }

    const cleaned = cities.map((c) => String(c).trim()).filter(Boolean);
    if (cleaned.length < 2) {
      return res.status(400).json({ error: 'Insufficient valid cities provided' });
    }

    const isRound = String(tripType || '').toLowerCase().trim() === 'round';

    // Cache-first using an order-preserving key
    const effectiveCities = isRound ? [...cleaned, cleaned[0]] : cleaned;
    const tripKey = makeTripKey(effectiveCities, isRound ? 'round' : 'oneway');
    const cached = cache[tripKey];
    if (cached) {
      console.log('Cache hit:', tripKey);
      return res.json({
        cities: cleaned,
        tripType: isRound ? 'round' : 'oneway',
        totalKm: cached.totalKm,
        totalHours: cached.totalHours,
        source: 'cache'
      });
    }

    // Geocode all cities via Nominatim
    const geocoded = await Promise.all(effectiveCities.map((c) => geocodeCity(c)));
    if (geocoded.some((g) => !g)) {
      return res.status(400).json({ error: 'Unable to geocode one or more cities' });
    }

    // Build OSRM multi-waypoint request
    const coords = geocoded.map(({ lon, lat }) => `${lon},${lat}`).join(';');
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`;
    const response = await fetch(osrmUrl);
    if (!response.ok) {
      return res.status(502).json({ error: `OSRM HTTP ${response.status}` });
    }
    const data = await response.json();
    const route = data?.routes?.[0];
    if (!route) {
      return res.status(404).json({ error: 'No route found for the provided cities' });
    }

    const totalKm = Number((route.distance / 1000).toFixed(1));
    const totalHours = Number((route.duration / 3600).toFixed(1));

    // Cache persistently
    cache[tripKey] = {
      totalKm,
      totalHours,
      updatedAt: new Date().toISOString(),
      cities: effectiveCities
    };
    saveCache();

    return res.json({
      cities: cleaned,
      tripType: isRound ? 'round' : 'oneway',
      totalKm,
      totalHours,
      source: 'osrm'
    });
  } catch (err) {
    console.error('Multi-stop route error:', err.message);
    return res.status(500).json({ error: 'Failed to compute multi-stop route' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});