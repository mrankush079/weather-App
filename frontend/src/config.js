// config.js - build the API URL using env vars and arguments
// Uses REACT_APP_WEATHER_BASE and REACT_APP_WEATHER_KEY from .env
export function buildWeatherUrl({ city = "bengaluru", days = 3 }) {
  const base = process.env.REACT_APP_WEATHER_BASE || "http://localhost:8080/weather/forecast";
  const key = process.env.REACT_APP_WEATHER_KEY || "Value";
  const params = new URLSearchParams({
    key,
    city,
    days: String(days),
  });
  return `${base}?${params.toString()}`;
}
