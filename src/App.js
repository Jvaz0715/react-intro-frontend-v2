import React, { Component } from 'react'

export class App extends Component {
  // because we will use arrow functions, we don't really need to do constructor, props, super (REFERENCE: App-1.js)
  // we could still declare our state without need to do "this.state" inside the constructor
  state ={
    name: "Charmander",
    backgroundColor: "black",
  };

  // lifecycle methods from React.js reference docs

  // lifecycle componentDidMount()
  componentDidMount() {
    // this will run after render only once!
    this.setState({
      name: "Meow",
      backgroundColor: "yellow",
    })
  };

  // lifecycle componentDidUpdate()
  componentDidUpdate(prevProps, prevState) {
    // anytime componentDidMount runs, componentDidUpdate will be triggered and run
    if (prevState.name === "Charmander") {
      this.setState({name: "Meow"})
    }
  };


  render() {
    return (
      <div style={{backgroundColor: this.state.backgroundColor, color: "white"}}>
        {this.state.name}

      </div>
    )
  }
}

export default App;
