import { h, render, Component } from 'preact';

class DarkSky extends Component {
  template(props) {
    return(
      JSON.stringify(props.data)      
    );
  }

  render(props) {
    return (
      <section>
        <header>
          <h1>DarkSky</h1>
        </header>
        <div>
          
        </div>
      </section>
    );
  }
}

render(<DarkSky />);

export default DarkSky;
