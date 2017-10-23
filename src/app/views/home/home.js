import { h, Component } from 'preact';

import styles from './home.pcss';

import DarkSky from 'components/apis/darksky';

var darkSkyData = require('../../fixtures/darksky.json');

const darkSkyDataMassager = (data) => {
  var forecasts = data['daily']['data'];
  var payload = [];

  for (var i in forecasts) {
    payload.push({
      'time': forecasts[i]['time'],
      'maxTemp': forecasts[i]['temperatureMax'], 
      'minTemp': forecasts[i]['temperatureMin'],
      'humidity': forecasts[i]['humidity'],
      'pop': forecasts[i]['precipProbability'],
      'pType': forecasts[i]['precipType'],
      'windDir': forecasts[i]['windBearing'],
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
