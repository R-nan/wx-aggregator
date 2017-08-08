import Router from 'preact-router';
import { h, render } from 'preact';

import Home from 'views/home/home';

import Header from 'components/header/header';
import DarkSky from 'components/apis/darksky';

var darkSkyData = require('./fixtures/darksky.json');

const renderApp = () => {
  render((
    <div class="main-container">
      <div>
        <Header title="Forecast aggregator" />
        <Router>
          <Home path="/"/>
        </Router>
        <DarkSky />
      </div>   
    </div>
  ), document.getElementById('root'));
};

renderApp();

if (module.hot) {
  module.hot.accept('views/home/home', renderApp);
}

if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime');

  runtime.install({
    onUpdateReady: () => {
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      // Reload the webpage to load into the new version
      window.location.reload();
    },
  });
}
