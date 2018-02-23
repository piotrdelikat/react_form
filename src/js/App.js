import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import Form from './components/Form';


class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row flex-column justify-content-center">
          <h1 className="title text-center">Vote for the best date for the next JavaScript event</h1>
          <Form />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
