import React from "react";
import { cToF } from "../utils";

const WeatherCard = ({ weatherResponse, unit = "C" }) => {
  if (!weatherResponse) return null;
  
  // Destructure with a clean alias for the icon URL
  const { city, region, country, condition, temperature, iconUrl, } = weatherResponse; // <-- iconUrl is now guaranteed from DEMO
  
  // --- Calculations ---

  const temp = unit === "C" ? Math.round(temperature) : Math.round(cToF(temperature));

  // Calculates mercury height (0% to 100%) based on a common range, e.g., -40C to 60C
  // The logic is robust, but I'll make the calculation slightly clearer here.
  const minTemp = -40;
  const maxTemp = 60;
  const tempRange = maxTemp - minTemp;
  const normalizedTemp = Math.max(0, temperature - minTemp);
  const mercuryHeight = Math.min(100, (normalizedTemp / tempRange) * 100);

  // --- Mood Detection (Simplified for CSS) ---

  const low = (condition || "").toLowerCase();
  let mood = "sunny"; // Default
  if (low.includes("rain") || low.includes("shower")) mood = "rainy";
  else if (low.includes("cloud") || low.includes("overcast")) mood = "cloudy";
  else if (low.includes("storm") || low.includes("thunder")) mood = "stormy";
  else if (low.includes("snow") || low.includes("ice") || low.includes("sleet")) mood = "snowy";
  else if (low.includes("fog") || low.includes("mist")) mood = "foggy"; // <-- 'Mist' will trigger 'foggy' mood
  
  // --- Date & Time Display ---
  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });


  return (
    <section className={`weather-card is-${mood}`} aria-label={`Current weather in ${city}`}>
      <div className="left">
        <div className="temp">
          <span className="value">{temp}</span>
          <span className="unit">°{unit}</span>
        </div>
        
        <div className="place">
          <strong>{city}</strong>
          <div className="muted">{region}, {country}</div>
        </div>

        {/* --- Time & Condition Row --- */}
        <div className="condition-row">
            {/* Using the iconUrl passed in the response */}
            <img 
                src={iconUrl || '/icons/mist.png'} 
                alt={condition} 
                className="main-weather-icon" 
                width="60" 
                height="60"
            />
            <div className="condition-details">
                <div className="condition">{condition}</div>
                <div className="muted update-time">
                    {dateStr} | {timeStr}
                </div>
            </div>
        </div>
        {/* End Time & Condition Row */}
      </div>

      <div className="right">
        <div className="weather-graphic">
          {/* Graphic driven by mood class */}
          <div className={`graphic-element sun-cloud-group mood-${mood}`} aria-hidden>
              {/* We will define the content of this group in CSS using the mood class */}
          </div>
          
          <div className="thermometer">
            <div
              className="mercury"
              style={{ height: `${mercuryHeight}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;