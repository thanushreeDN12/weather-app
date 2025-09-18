import  { useState } from 'react'
import './Search.css'

const Search = () => {
    const [searchData, setSearchData]= useState('')
    const [weatherData,setWeatherData]= useState('')

    //to handle when the data in input changes
    const handleInputChange=(event) => {
        //console.log(event.target.value)
        setSearchData(event.target.value)
    }

    //to format time from linux
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], {
     hour: '2-digit',
     minute: '2-digit',
      hour12: true, // change to false for 24-hour format
    });
  };

  const API_key= process.env.REACT_APP_API_KEY;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=${API_key}&units=metric`
   
  const handleBtnClick= async (e) => {
    //send searchData to api
    e.preventDefault()
    if (!searchData.trim()) {
      alert('Please enter a city name.');
      return;
    }
    
    
     try {
      const response = await fetch(URL); //url must be string
      if (!response.ok) throw new Error('Network response was not OK');

      const data = await response.json();

      setWeatherData({
        name: data.name,
        temp: Math.floor(data.main.temp),
        desc: data.weather[0].description,
        humidity:data.main.humidity,
        sunrise:data.sys.sunrise,
        sunset:data.sys.sunset,
        windspeed:data.wind.speed,
        icon: data.weather[0].icon
      });
       //console.log(data); // this will log the response
     

    } catch (error) {
      console.error('Fetch error:', error);
    }
    
   }

  return (
    <>
      <div className='search-box'>
          <form className='form'>
              <input type='text' placeholder='search city' onChange={handleInputChange} value={searchData} />
              <button onClick={handleBtnClick}>search</button>
        </form>
      </div>

     
       {weatherData && (
        <div className='info'>
          <h2 className='name'>Weather in {weatherData.name}</h2>

          <p className='temp'>Temperature: {weatherData.temp}&deg;C</p>

        <div className='desc'>
          <p>Weather: {weatherData.desc}</p>

         {weatherData?.icon && (
        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon"/> )}
        </div>

         <div className='humnwind'>
          <p>Humidity: {weatherData.humidity}</p>
          <p>wind speed: {weatherData.windspeed}</p>
          </div>

          <div className='sun'>
          <p>Sunrise: {formatTime(weatherData.sunrise)}</p>
          <p>Sunset: {formatTime(weatherData.sunset)}</p>

          </div>
      
      </div>
      )}
    
    </>
  );
  
}

export default Search
