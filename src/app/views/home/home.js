import { h, Component } from 'preact';

import styles from './home.pcss';

import Aeris from 'components/apis/aeris';
import DarkSky from 'components/apis/darksky';

var aerisData = require('../../fixtures/aeris.json');
var darkSkyData = require('../../fixtures/darksky.json');
var openWeatherData = require('../../fixtures/openweathermap.json');

// Converts wind direction in degress to cardinal directions
const convertWindDir = (degrees) => {
  var val = Math.round((((degrees/22.5) + 0.5)) % 16);
  const directions = [
    'N', 
    'NNE', 
    'NE', 
    'ENE', 
    'E', 
    'ESE', 
    'SE', 
    'SSE', 
    'S', 
    'SSW', 
    'SW', 
    'WSW', 
    'W', 
    'WNW', 
    'NW', 
    'NNW'
  ];

  return directions[val];
};

// Converts UNIX timestamps to human readable dates
const convertUnixTime = (unixTime) => {
  var options = {
    weekday: 'short', year: 'numeric', month: 'short',
    day: 'numeric'
  };
  
  return new Date(unixTime * 1000).toLocaleDateString('en-us', options);
};

const aerisDataMassager = (data) => {
  var forecasts = data['response'][0]['periods'];
  var payload = [];

  for (var i = 0; i < 5; i++) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['timestamp']),
      'maxTemp': forecasts[i]['maxTempF'], 
      'minTemp': forecasts[i]['minTempF'],
      'humidity': Math.round(forecasts[i]['humidity']),
      'pop': forecasts[i]['pop'],
      'windDir': forecasts[i]['windDir'],
      'windSpeed': forecasts[i]['windSpeedMPH']
    });
  }

  return payload;
};

const darkSkyDataMassager = (data) => {
  var forecasts = data['daily']['data'];
  var payload = [];

  for (var i = 0; i < 5; i++) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['time']),
      'maxTemp': forecasts[i]['temperatureMax'], 
      'minTemp': forecasts[i]['temperatureMin'],
      'humidity': Math.round(forecasts[i]['humidity'] * 100),
      'pop': forecasts[i]['precipProbability'] * 100,
      'pType': forecasts[i]['precipType'],
      'windDir': convertWindDir(forecasts[i]['windBearing']),
      'windSpeed': forecasts[i]['windSpeed']
    });
  }

  return payload;
};

const openWeatherDataMassager = (data) => {
  var forecasts = data['list'];
  var payload = [];

  // for (var i = 0; i < 5; i++) {
  //   payload.push({
  //     'time': convertUnixTime(forecasts[i]['time']),
  //     'maxTemp': forecasts[i]['temperatureMax'], 
  //     'minTemp': forecasts[i]['temperatureMin'],
  //     'humidity': Math.round(forecasts[i]['humidity'] * 100),
  //     'pop': forecasts[i]['precipProbability'] * 100,
  //     'pType': forecasts[i]['precipType'],
  //     'windDir': convertWindDir(forecasts[i]['windBearing']),
  //     'windSpeed': forecasts[i]['windSpeed']
  //   });
  // }

  return forecasts;
};

class Home extends Component {
  constructor() {
    super();
    this.state.aerisDaysForecast = aerisDataMassager(aerisData);
    this.state.darkSkyDaysForecast = darkSkyDataMassager(darkSkyData);
    this.state.openWeatherDaysForecast = openWeatherDataMassager(openWeatherData);
  }

  componentDidMount() {
    console.log(this.state.openWeatherDaysForecast);
  }

  render() {
    return (
      <main>
        <p class={styles.text}>It feels like home</p>
        <Aeris daysForecast={this.state.aerisDaysForecast} />
        <DarkSky daysForecast={this.state.darkSkyDaysForecast} />
      </main>
    );
  }
}

export default Home;
