import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './configureStore';
import App from './components/App';
require('react-datepicker/dist/react-datepicker-cssmodules.css');

const store = configureStore();

function renderMain(App: React.ReactType) {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>
  );
}

render(renderMain(App), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(renderMain(require('./components/App').default), document.getElementById('root'));
  });
}
