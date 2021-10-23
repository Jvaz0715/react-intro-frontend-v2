import React, { Component } from 'react';
import Todo from './components/Todo/Todo';

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div>
        <Todo />
      </div>
    )
  }
}

export default App;
