import {useEffect, useState} from "react";
import rain from './pictures/rain.jpg';
import heavy_rain from './pictures/heavy_rain.jpg'
import cloudy from './pictures/cloudy.jpg';
import light_cloud from './pictures/light_cloud.jpg';
import snow from './pictures/snow.jpg';
import sunny from './pictures/sunny.jpg';
import thunder from './pictures/thunder.jpg';
import moment from "moment";

import "./app.css"

function App() {
  const ApiKey = "e2dd2eace0d715cfbe11d12c30c3c727";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [cities, setCities] =  useState([]);

  //Function which takes data from api
  const fetchData = async (e) => {
    if(e.key === "Enter"){
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
    .then(res => {
      if(res.ok){
        return res.json()
      }
      else{
        alert("Oops, there seems to be an error!");
        throw new Error("You have an error");
      }})
    .then(result => {
      // console.log(result)
      setCity('');
      setCities(cities => [result,...cities])
      setWeather(result);
    })
  }}

  //Function which sets appropriate background and color of the text
  const background = (city) => {
    switch(city.weather[0].description){
      case 'snow':
        return {background: `url(${snow})`, color: "black"}
      case 'thunderstorm':
        return {background: `url(${thunder})`, color: "black"}
      case 'shower rain':
        return {background: `url(${heavy_rain})`, color: "black"}
      case 'moderate rain':
      case 'rain':
        return {background: `url(${rain})`, color: "white"}
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':  
        return {background: `url(${thunder})`, color: "white"}
      case 'few clouds':
        return {background: `url(${light_cloud})`, color: "black"}
      case 'clear sky':
        return {background: `url(${sunny})`, color: "black"}
    }
  }

  return (
    <div className="App">
      <div className="search_weather_form">
        <h1>Check your weather</h1>
        <input onChange={(e) => {setCity((e.target.value))}} onKeyPress={(e)=>fetchData(e)} value={city} className="input_City" placeholder="Search.."/>
      </div>
      {(typeof weather.sys != "undefined") ? (
      <div> 
        {cities.map((city, index) => ( 
        <div className="weather_information_block" key={index} style={background(city)}>
          <h2 className="city_title">{city.name}, {city.sys.country}</h2>
          <h2 className="city_date">{moment().format("DD-MM-YYYY")}</h2>
          <h2 className="city_temp">{Math.round(city.main.temp)-273}°C</h2>
          <h2 className="city_state">{city.weather[0].description}</h2>
        </div>))}
      </div>
      ) : ('')}
    </div>
  );
}

export default App;
