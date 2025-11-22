import React, { useEffect, useState } from "react";
import { buildWeatherUrl } from "./config";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastItem from "./components/ForecastItem";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { tempToGradient } from "./utils";

const DEFAULT_CITY = "indore";
const RECENT_KEY = "wf_recent_cities_v1";

const DEMO = {
  weatherResponse: {
    city: "Indore", // Match the city in the image
    region: "Madhya Pradesh",
    country: "India",
    condition: "Mist", // Match the condition in the image
    temperature: 27, // Match the temperature in the image
    iconUrl: "/icons/mist.png", // Correct path based on your file list
  },
  dayTemp: [
    { 
      date: "2025-11-22", 
      minTemp: 20.0, avgTemp: 20.0, maxTemp: 20.0,
      icon: "/icons/partly_cloudy.png", // <--- FIX: Changed hyphen (-) to underscore (_)
      conditionText: "partly", 
    },
    { 
      date: "2025-11-23", 
      minTemp: 22.0, avgTemp: 22.0, maxTemp: 22.0,
      icon: "/icons/partly_cloudy.png", // <--- FIX: Changed hyphen (-) to underscore (_)
      conditionText: "partly", 
    },
    { 
      date: "2025-11-24", 
      minTemp: 23.0, avgTemp: 23.0, maxTemp: 23.0,
      icon: "/icons/partly_cloudy.png", // <--- FIX: Changed hyphen (-) to underscore (_)
      conditionText: "partly", 
    },
  ],
};

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [unit, setUnit] = useState("C");
  const [city, setCity] = useState(DEFAULT_CITY);
  const [days, setDays] = useState(3);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchFor({ city: DEFAULT_CITY, days: 3 });
    // eslint-disable-next-line
  }, []);

  async function fetchFor({ city: cityIn, days: daysIn }) {
    const cityTrim = cityIn?.trim();
    if (!cityTrim) {
      setErr("Please provide a city");
      return;
    }
    setCity(cityTrim);
    setDays(daysIn || 3);
    setErr(null);
    setLoading(true);

    try {
      const url = buildWeatherUrl({ city: cityTrim, days: daysIn || 3 });
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error " + res.status);
      const json = await res.json();
      setData(json);

      setRecent((prev) => {
        const filtered = [cityTrim, ...prev.filter((c) => c.toLowerCase() !== cityTrim.toLowerCase())].slice(0, 6);
        localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
        return filtered;
      });
    } catch (e) {
      setErr("Failed to fetch — showing demo data. Check backend / CORS.");
      setData(DEMO);
    } finally {
      setLoading(false);
    }
  }

  const bgStyle = data?.weatherResponse?.temperature ? { background: tempToGradient(data.weatherResponse.temperature) } : {};

  return (
    <div className="page" style={bgStyle}>
      <Navbar />

      {err && (
        <div className="error-toast" role="alert">
          <strong>{err}</strong>
          <div className="error-helpers">
            <small>Check backend URL and CORS. See console for details.</small>
          </div>
        </div>
      )}

      {/* hero area (kept mostly same) */}
      <header className="hero hero-large" id="search" aria-labelledby="site-title">
        <div className="hero-overlay">
          <div className="hero-left">
            <h1 id="site-title">WeatherFlow</h1>
            <p className="subtitle">Beautiful, simple weather for any city</p>

            <SearchBar onSearch={({ city, days }) => fetchFor({ city, days })} defaultCity={city} />

            <div className="controls compact">
              <div className="toggle">
                <label className="small">Units</label>
                <button className={`unit-btn ${unit === "C" ? "active" : ""}`} onClick={() => setUnit("C")}>°C</button>
                <button className={`unit-btn ${unit === "F" ? "active" : ""}`} onClick={() => setUnit("F")}>°F</button>
              </div>

              <div className="recent">
                <label className="small">Recent</label>
                <div className="recent-list">
                  {recent.length === 0 && <span className="muted">—</span>}
                  {recent.map((c) => (
                    <button key={c} className="chip" onClick={() => fetchFor({ city: c, days })}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right hero-art-wrap">
            <img
              src="/hero.png"
              alt="hero art"
              className="hero-art"
            />
          </div>
        </div>

        <div className="clouds">
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="cloud c3" />
        </div>
      </header>

      <main className="container">
        <div className="centered">
          {loading && <div className="status">Loading weather…</div>}

          {!loading && data && (
            <>
              <WeatherCard weatherResponse={data.weatherResponse} unit={unit} />
              <section id="forecast" className="forecast-strip" aria-label="forecast">
                {data.dayTemp?.map((d) => (
                  <ForecastItem key={d.date} day={d} unit={unit} />
                ))}
              </section>
            </>
          )}
        </div>

        {!loading && !data && !err && <div className="status">Search above to see weather</div>}
      </main>

      <Footer />
    </div>
  );
}