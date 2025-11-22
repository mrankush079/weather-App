import React, { useState } from "react";

export default function SearchBar({ onSearch, defaultCity = "" }) {
  const [city, setCity] = useState(defaultCity);
  const [days, setDays] = useState(3);

  function submit(e) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch({ city: city.trim(), days: Number(days) });
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        aria-label="city input" // More descriptive ARIA label
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g., Bengaluru)"
        className="search-input"
        type="text" // Explicit type for clarity
      />
      
      {/* For accessibility, this select would ideally have an associated <label>,
        but since it's already visually labeled by its context, we ensure ARIA-label is strong.
      */}
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="days-select"
        aria-label="Select forecast days"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <option key={d} value={d}>
            {d} day{d > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      
      <button type="submit" className="btn search-btn">
        <span role="img" aria-label="magnifying glass">🔍</span> Search
      </button>
    </form>
  );
}