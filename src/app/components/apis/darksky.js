import { h } from 'preact';

var data = require('../../fixtures/darksky.json');
console.log(data['daily']);

const DarkSky = (data, props) => (
  <div>
    <header>
      <h1>DarkSky</h1>
    </header>
    <div>
      { data }
    </div>
  </div>
);

export default DarkSky;