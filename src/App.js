import React, { Component } from 'react';
import Header from './components/Header/Header';
import Todo from './components/Todo/Todo';

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Todo />
      </div>
    )
  }
}

export default App;
