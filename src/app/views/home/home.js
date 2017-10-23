import { h, Component } from 'preact';

import styles from './home.pcss';

import DarkSky from 'components/apis/darksky';

var darkSkyData = require('../../fixtures/darksky.json');

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

class Home extends Component {
  constructor() {
    super();
    this.state.daysForecast = darkSkyDataMassager(darkSkyData);
  }

  componentDidMount() {
    console.log(this.state.daysForecast);
  }

  render() {
    return (
      <main>
        <p class={styles.text}>It feels like home</p>
        <DarkSky daysForecast={this.state.daysForecast} />
      </main>
    );
  }
}

export default Home;
