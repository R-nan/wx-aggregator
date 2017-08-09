import { h, render, Component } from 'preact';

class DarkSky extends Component {
  render(props) {
    return (
      <section>
        <header>
          <h1>DarkSky</h1>
        </header>
        <div>
          {JSON.stringify(props.data)}
        </div>
      </section>
    );
  }
}

render(<DarkSky />);

export default DarkSky;
