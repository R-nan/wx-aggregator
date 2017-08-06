import { h } from 'preact';

var data = require('../../fixtures/darksky.json');
console.log(data['daily'])

const DarkSky = (props) => (
  <div>
    <header>
      <h1>DarkSky</h1>
    </header>
    <div>
      WHA
    </div>
  </div>
);

export default DarkSky;