import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import EventForm from './components/EventForm';
import store from './store';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row flex-column justify-content-center">
          <h1 className="title text-center">Vote for the best date for the next JavaScript event</h1>
          <Provider store={ store }>
            <EventForm />
          </Provider>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
