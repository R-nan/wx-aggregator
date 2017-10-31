import { h, Component } from 'preact';

import styles from './home.pcss';

import Aeris from 'components/apis/aeris';
import ApiXU from 'components/apis/apixu';
import DarkSky from 'components/apis/darksky';
import OpenWeather from 'components/apis/openweather';
import WeatherUnderground from 'components/apis/wunderground';

var aerisData = require('../../fixtures/aeris.json');
var apixuData = require('../../fixtures/apixu.json');
var darkSkyData = require('../../fixtures/darksky.json');
var openWeatherData = require('../../fixtures/openweathermap.json');
var wundergroundData = require('../../fixtures/wunderground.json');


// Conversion functions
// Converts Kelvin to Fahrenheit
const convertKToF = (kelvin) => {
  var fahrenheit = (kelvin * 9/5 - 459.67).toFixed(2);

  return fahrenheit;
};

// Converts UNIX timestamps to human readable dates
const convertUnixTime = (unixTime) => {
  var options = {
    weekday: 'short', year: 'numeric', month: 'short',
    day: 'numeric'
  };

  return new Date(unixTime * 1000).toLocaleDateString('en-us', options);
};

// Converts Epoch timestamps to human readable dates
const convertEpochTime = (epochTime) => {
  var options = {
    weekday: 'short', year: 'numeric', month: 'short',
    day: 'numeric'
  };
  
  return new Date(epochTime * 60000).toLocaleDateString('en-us', options);
};

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


// Data massagers for API sources
const aerisDataMassager = (data) => {
  var forecasts = data['response'][0]['periods'];
  var payload = [];

  for (var i = 0; i < 5; i++) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['timestamp']),
      'descrip': forecasts[i]['weather'],
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

const apixuDataMassager = (data) => {
  var forecasts = data['forecast']['forecastday'];
  var payload = [];
  var pop = [];
  var windDir = [];  

  for (var i in forecasts) {
    var hours = forecasts[i]['hour'];

    payload.push({
      'time': convertUnixTime(forecasts[i]['date_epoch']),
      'descrip': forecasts[i]['day']['condition']['text'],
      'maxTemp': forecasts[i]['day']['maxtemp_f'], 
      'minTemp': forecasts[i]['day']['mintemp_f'],
      'humidity': Math.round(forecasts[i]['day']['avghumidity']),
      'pop': (pop.reduce((a, b) => a + b, 0) / 24) * 100,
      'windDir': convertWindDir(windDir.reduce((a, b) => a + b, 0) / 24),
      'windSpeed': forecasts[i]['day']['maxwind_mph']
    });

    for (var i in hours) {
      pop.push(hours[i]['will_it_rain']);
      windDir.push(hours[i]['wind_degree']);
    }    
  }

  return payload;
};

const darkSkyDataMassager = (data) => {
  var forecasts = data['daily']['data'];
  var payload = [];

  for (var i = 0; i < 5; i++) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['time']),
      'descrip': forecasts[i]['summary'],
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

  for (var i in forecasts) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['dt']),
      'descrip': forecasts[i]['weather'][0]['description'],
      'maxTemp': convertKToF(forecasts[i]['temp']['max']),
      'minTemp': convertKToF(forecasts[i]['temp']['min']),
      'humidity': Math.round(forecasts[i]['humidity']),
      'windDir': convertWindDir(forecasts[i]['deg']),
      'windSpeed': forecasts[i]['speed']
    });
  }

  return payload;
};

const wundergroundDataMassager = (data) => {
  var forecasts = data['forecast']['simpleforecast']['forecastday'];
  var payload = [];

  for (var i in forecasts) {
    payload.push({
      'time': convertUnixTime(forecasts[i]['date']['epoch']),
      'descrip': forecasts[i]['conditions'],
      'maxTemp': forecasts[i]['high']['fahrenheit'],
      'minTemp': forecasts[i]['low']['fahrenheit'],
      'humidity': forecasts[i]['avehumidity'],
      'windDir': forecasts[i]['avewind']['dir'],
      'windSpeed': forecasts[i]['avewind']['mph']
    });
  }

  return payload;
};


// Home component
class Home extends Component {
  constructor() {
    super();
    this.state.aerisDaysForecast = aerisDataMassager(aerisData);
    this.state.apixuDaysForecast = apixuDataMassager(apixuData);
    this.state.darkSkyDaysForecast = darkSkyDataMassager(darkSkyData);
    this.state.openWeatherDaysForecast = openWeatherDataMassager(openWeatherData);
    this.state.wundergroundDaysForecast = wundergroundDataMassager(wundergroundData);
  }

  componentDidMount() {
    console.log(this.state.wundergroundDaysForecast);
  }

  render() {
    return (
      <main>
        <p class={styles.text}>It feels like home</p>
        <Aeris daysForecast={this.state.aerisDaysForecast} />
        <ApiXU daysForecast={this.state.apixuDaysForecast} />
        <DarkSky daysForecast={this.state.darkSkyDaysForecast} />
        <OpenWeather daysForecast={this.state.openWeatherDaysForecast} />
        <WeatherUnderground daysForecast={this.state.wundergroundDaysForecast} />
      </main>
    );
  }
}

export default Home;
