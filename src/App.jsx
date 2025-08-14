import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b992704c7824da33d4211b8bf1316329&units=metric&lang=es`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Ciudad no encontrada o error en la búsqueda.");
      setWeather(null);
    }
  };

  const iconUrl = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : "";

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#3a6e99",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Consulta el clima de tu ciudad o pais
        </h1>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Ingresa una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              width: "60%",
              marginRight: "10px",
            }}
          />
          <button
            onClick={fetchWeather}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#f6fffc",
              color: "#3a6e99",
              border: "none",
              cursor: "pointer",
            }}
          >
            Buscar
          </button>
        </div>

        {error && <p style={{ color: "#ffdddd", textAlign: "center" }}>{error}</p>}
        {!weather && !error && <p style={{ textAlign: "center" }}>Ingresa una ciudad para ver el clima.</p>}

        {weather && (
          <div style={{ textAlign: "center" }}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img src={iconUrl} alt={weather.weather[0].description} />
            <p><strong>Temperatura:</strong> {weather.main.temp} °C</p>
            <p><strong>Mínima:</strong> {weather.main.temp_min} °C | <strong>Máxima:</strong> {weather.main.temp_max} °C</p>
            <p><strong>Descripción:</strong> {weather.weather[0].description}</p>
            <p><strong>Humedad:</strong> {weather.main.humidity} %</p>
            <p><strong>Viento:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Presión:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Fecha y hora:</strong> {new Date(weather.dt * 1000).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;




