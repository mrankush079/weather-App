# ☀️ WeatherFlow Frontend

WeatherFlow is a simple, beautiful, and responsive weather application built with React. It provides current weather conditions and a multi-day forecast for any city, featuring dynamic styling (color gradients) and icons based on the weather conditions and temperature.

---

## 🚀 Features

* **Current Weather Card:** Displays temperature, condition, location, and a dynamic icon.
* **3-Day Forecast Strip:** Shows min/avg/max temperatures and condition icons for upcoming days.
* **Dynamic Theming:** The application background changes color gradient based on the current temperature (using the `tempToGradient` helper).
* **Unit Toggle:** Switch between Celsius (°C) and Fahrenheit (°F).
* **Recent Search History:** Saves and quickly loads recent city searches using local storage.
* **Robust DEMO Mode:** Automatically falls back to local demo data if the backend API connection fails.

---

## 🛠️ Tech Stack

* **Frontend:** React (Create React App or similar structure)
* **Styling:** Pure CSS / Sass (Assumed based on class names like `weather-card`, `forecast-item`)
* **API:** Custom Backend API (via `/weather/forecast` endpoint)

---

## ⚙️ Setup and Installation

Follow these steps to get the project running locally.

### Prerequisites

* Node.js and npm (or yarn) installed.
* (Optional but Recommended) A running **WeatherFlow Backend API** or a compatible weather API endpoint.

### 1. Clone the Repository


```bash
git clone [https://github.com/YourUsername/weatherflow-frontend.git](https://github.com/YourUsername/weatherflow-frontend.git)
cd weatherflow-frontend


2. Install Dependencies

npm install

3. Configure the API Endpoint
You must create a .env file in the root of the project directory to configure the backend API connection.

# Replace this with the URL of your deployed or local backend server.
# Example if your backend is running locally on port 8080:
REACT_APP_WEATHER_BASE=http://localhost:8080/weather/forecast 

# Replace this with the API key or secret required by your backend:
REACT_APP_WEATHER_KEY=YOUR_API_KEY_OR_SECRET

Note: If the API connection fails, the application will automatically display DEMO data.


4. Add Static Assets (Icons)
The application uses local images for weather icons, which must be placed in the public folder.

1.Create a folder named icons inside the public directory. ./public/icons/

2.Add the necessary weather icons (PNG format is assumed) to this folder using the exact file names used in App.jsx:


Condition,File Name
Mist,mist.png
Partly Cloudy,partly_cloudy.png (Note the underscore)
Sunny,sunny.png
"(And others like 'rainy.png', 'cloudy.png', etc.)",


5. Run the Application
Start the development server:
npm start

The application should open in your browser at http://localhost:3000.

App.jsx
Manages the top-level state: data, loading, unit, city, and recent searches.

Contains the fetchFor asynchronous function for fetching data.

Defines the DEMO object which includes the static icon paths (e.g., /icons/partly_cloudy.png).

WeatherCard.jsx
Renders the main, large weather information block.

Uses a dynamic CSS class (is-sunny, is-foggy, etc.) based on the condition string to style the card's graphics.

ForecastItem.jsx
Renders a single day's weather forecast.

Displays the temperature range and uses the day.icon prop for the weather image.

utils.js (Helpers)
cToF(c) / fToC(f): Standard temperature conversion formulas.

tempToGradient(tempC): Returns a unique CSS linear gradient string to dynamically color the page based on temperature, providing a visual mood

📝 Troubleshooting Icon Issues
If the icons appear as broken images, the problem is a file path mismatch.

Check Filenames: Ensure the names in public/icons (e.g., partly_cloudy.png) exactly match the names in App.jsx.

Hard Refresh: Clear the browser cache by pressing Ctrl + Shift + R (Windows/Linux) or Cmd + Shift + R (Mac).

Check Network Tab: Use the browser's DevTools to verify that the icon requests are not returning a 404 (Not Found) status code.
