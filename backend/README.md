# HighwayCab Backend (Distance API)

Express backend that computes city-to-city distances using OpenStreetMap services:
- Geocoding via Nominatim
- Routing via OSRM
- File-based JSON caching (persisted to `routeCache.json` and ignored from git)

## Install & Run

```bash
cd backend
npm install

## Optional: environment
# No secrets are required. If you add envs, keep them in `.env` (gitignored).

npm start        # production
npm run dev      # nodemon watch
```

## API

### GET /api/distance

Query:
- `from` (string) – origin city
- `to` (string) – destination city

Response:
```json
{
  "from": "Delhi, India",
  "to": "Jaipur, India",
  "distanceKm": 276,
  "durationHrs": 3.4,
  "source": "cache" | "osrm"
}
```

Routes are cached bidirectionally (Delhi-Jaipur ≡ Jaipur-Delhi).

### POST /api/distance

Body:
```json
{
  "cities": ["Delhi, India", "Agra, India", "Jaipur, India"],
  "tripType": "round" // or "oneway"
}
```

Response:
```json
{
  "cities": ["Delhi, India", "Agra, India", "Jaipur, India"],
  "tripType": "round",
  "totalKm": 708.8,
  "totalHours": 8.8,
  "source": "cache" | "osrm"
}
```