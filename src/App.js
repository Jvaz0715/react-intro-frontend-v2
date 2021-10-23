import React, { Component } from "react";

import "./App.css";

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      toggle: false,
    };
  
  };

  addCount = () => {
    console.log("add is clicked")
    this.setState({
      count: this.state.count + 1,
    })
  };

  minusCount = () => {
    console.log("minus is clicked")

    this.setState({
      count: this.state.count -1,
    })
  };

  toggleColorFunc = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      }
    })
  };

  render() {
    return (
      <div className="counter-container">
        <div>
        Count: {this.state.count}
        </div>
        <button onClick={this.minusCount}>-</button>
        <button onClick={this.addCount}>+</button>

        <hr />

        <div className="hello-container">
          <h1>Hello, James</h1>
        </div>

        <hr />

        <div className={`toggle-container ${this.state.toggle ? "toggle-true" : "toggle-false"}`}>
          <button onClick={this.toggleColorFunc}>Toggle Me</button>
        </div>
      </div>
    );
  };
};

export default App;



// ===============
  // The below is the standard of what we get when we create react app. Above is a more react-centric approach
// ===============


// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       Hello, its me
//     </div>
//   );
// }

// export default App;
