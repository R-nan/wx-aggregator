import { h } from 'preact';

var data = require('../../fixtures/darksky.json');

const DarkSky = (props) => (
  <div>
    <header>
      <h1>DarkSky</h1>
    </header>
    <div>
      { JSON.stringify(data['daily']) }
    </div>
  </div>
);

export default DarkSky;