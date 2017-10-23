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
              <p>{forecast.maxTemp}</p>
              <p>{forecast.minTemp}</p>
              <p>{forecast.humidity}</p>
              <p>{forecast.pop}</p>
              <p>{forecast.pType}</p>
              <p>{forecast.windDir}</p>
              <p>{forecast.windSpeed}</p>
            </li>
          })}
          </ul>
        </div>
      </section>
    );
  }
}

export default DarkSky;
