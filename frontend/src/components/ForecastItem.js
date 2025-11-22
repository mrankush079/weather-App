import React from "react";
import { cToF } from "../utils";

// Assuming 'day' object now also contains 'icon' (e.g., URL or code) and 'conditionText'
function ForecastItem({ day, unit = "C", onClick }) {
  const date = new Date(day.date);
  // Example: "Sat, Nov 22"
  const label = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  // Helper function to convert and display temperature
  const toDisplay = (val) => unit === "C" ? Math.round(val) : Math.round(cToF(val));

  // Calculate the position of the average temperature bar fill
  // If min/max are the same, center the bar (50%) to avoid division by zero
  const widthPercent = day.maxTemp === day.minTemp ? 50 : Math.round(((day.avgTemp - day.minTemp) / (day.maxTemp - day.minTemp)) * 100);

  return (
    <article
      className="forecast-item"
      aria-label={`Forecast for ${label}, ${day.conditionText || 'Weather'}`} // Added fallback for accessibility
      onClick={onClick}
      tabIndex={onClick ? 0 : -1} // Make clickable items focusable
      role={onClick ? "button" : "article"}
    >
      <div className="day">{label}</div>

      {/* ☀️ Weather Icon/Image (New addition) */}
      <div className="icon-container">
        {/* Placeholder: Replace with actual image/icon component or URL */}
        <img
          src={day.icon || '/icons/sunny.png'} // Uses day.icon (now supplied in DEMO)
          alt={day.conditionText || 'Weather condition'} // Uses day.conditionText (now supplied in DEMO)
          className="weather-icon"
          width="40"
          height="40"
        />
      </div>
      
      <div className="temps">
        <div className="t min">Min <span>{toDisplay(day.minTemp)}°{unit}</span></div>
        <div className="t avg">Avg <span>{toDisplay(day.avgTemp)}°{unit}</span></div>
        <div className="t max">Max <span>{toDisplay(day.maxTemp)}°{unit}</span></div>
      </div>

      <div className="spark">
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${widthPercent}%` }} />
        </div>
      </div>
    </article>
  );
}

export default ForecastItem;