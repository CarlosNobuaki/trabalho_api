import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

/*  let getWeather = async () => {
    let res = await axios.get('http://api.openweathermap.org/data/2.5/weather?lat=-22&lon=-49&lang=pt&units=metric&appid=cb5b30a4742c3ff08c5f2ffa90845071');
    setWeather(res.data);
  }
*/


let getWeather = async (lat, lon) => {
  let res = await axios.get("http://api.openweathermap.org/data/2.5/weather?appid=cb5b30a4742c3ff08c5f2ffa90845071", {
    params: {
      lat: lat,
      lon: lon,      
      lang: 'pt',
      units: 'metric'
    }
  });
  setWeather(res.data);
}


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])


  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (      
      <Fragment>
        <h3 align='center'>Clima na Região ({weather['weather'][0]['description']})</h3>
        <hr/>       
        <ul class="w3-ul">
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
        
      </Fragment>
    )
  };
}
export default App;

