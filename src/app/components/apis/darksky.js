import { h, render, Component } from 'preact';

import styles from './apis.pcss';

class DarkSky extends Component {
  render(props) {
    return (
      <section class="darkSky">
        <header>
          <h1>Darksky</h1>
        </header>
        <div>
          <ul class={styles.forecast_grid}>
          {props.daysForecast.map((forecast) => {
            return <li>
              <p>{forecast.time}</p>
              <p>{forecast.descrip}</p>
              <p>High: {forecast.maxTemp}°F</p>
              <p>Low: {forecast.minTemp}°F</p>
              <p>Humidity: {forecast.humidity}%</p>
              <p>Chance of Precip: {forecast.pop}% of {forecast.pType}</p>
              <p>Wind Speed: {forecast.windSpeed} mph {forecast.windDir}</p>
            </li>
          })}
          </ul>
        </div>
      </section>
    );
  }
}

export default DarkSky;
