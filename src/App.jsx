import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { Oval } from 'react-loader-spinner'

function App() {
  const [input, setInput] = useState('')
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  })

  const toDate = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const currentDate = new Date()
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`
    return date
  }

  const search = (event) => {
    if (event.key === 'Enter') {
      setInput('')
      setWeather({ ...weather, loading: true })
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: 'metric',
          appid: '264aa255078a2070a49d93e194bef611'
        }
      }).then(res => {
        console.log(res)
        setWeather({ data: res.data, loading: false, error: false })
      }).catch(err => {
        setWeather({ ...weather, data: {}, error: true })
      })
    }
  }

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-search">
          <input
            type="text"
            className="city"
            placeholder="Enter city name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {weather.loading && (
          <Oval color="#00BFFF" height={80} width={80} />
        )}
        {weather.error && (
          <div className="error">
            <span className="error-message">City not found</span>
          </div>
        )}
        {weather && weather.data && weather.data.main && (
          <div>
            <div className='city-name'>
              <h2>
                {weather.data.name},
                <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className='date'>
              <span>{toDate()}</span>
            </div>
            <div className='weather'>
              <img src={`https://openweathermap.org/img/w/${weather.data.weather[0].icon}.png`} alt="weather icon" />
              {Math.round(weather.data.main.temp)}
              <sup className='degree'>°C</sup>
            </div>
            <div className='description'>
              <p>{weather.data.weather[0].description.charAt(0).toUpperCase() + weather.data.weather[0].description.slice(1)}</p>
              <p>Wind speed: {weather.data.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
