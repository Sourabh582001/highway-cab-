const fetch = require('node-fetch');

// Geocode a city name using Nominatim; returns { lat, lon, displayName } or null
async function geocodeCity(name) {
  const query = encodeURIComponent(String(name).trim());
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'HighwayCab/1.0 (+http://localhost)'
    }
  });
  if (!resp.ok) return null;
  const results = await resp.json();
  const first = Array.isArray(results) ? results[0] : null;
  if (!first) return null;
  const lat = parseFloat(first.lat);
  const lon = parseFloat(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon, displayName: first.display_name };
}

module.exports = { geocodeCity };