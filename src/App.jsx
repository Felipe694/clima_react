import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=24.860207811129033&lon=-99.56907148818881&appid=b992704c7824da33d4211b8bf1316329&units=metric&lang=es
`
        );
        setWeather(response.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener el clima. Intenta más tarde.");
      }
    };

    fetchWeather();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return <p>Cargando clima...</p>;


  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;


  return (


 
        
    <div  style={{ 
        border: "10px solid #f6fffcff", 
        padding: "50px", 
        borderRadius: "50px", 
        width: "1000px", 
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#3a6e99ff"
      }}>
      <h2>Clima actual</h2>
      <p><strong>Ciudad:</strong> {weather.name} <strong>País:</strong> {weather.sys.country}</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p><strong>Temperatura:</strong> {weather.main.temp} °C</p>
      <p><strong>Temperatura Minima:</strong> {weather.main.temp_min} °C <strong>Temperatura Maxima:</strong>{weather.main.temp_max} °C</p>
      <p><strong>Fecha y hora:</strong> {new Date(weather.dt * 1000).toLocaleString()}</p>
      <p><strong>Presión:</strong> {weather.main.pressure} hPa</p>
      <p><strong>Descripción:</strong> {weather.weather[0].description}</p>
      <p><strong>Humedad:</strong> {weather.main.humidity} %</p>
      <p><strong>Viento:</strong> {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;


