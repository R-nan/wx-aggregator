import { h, render, Component } from 'preact';

class DarkSky extends Component {
  render(props) {
    return (
      <section>
        <header>
          <h1>Darksky</h1>
        </header>
        <div>
          {props.daysForecast.map((forecast) => {
            return <p>{forecast.time}</p>
          })}
        </div>
      </section>
    );
  }
}

export default DarkSky;
