import React, { Component } from 'react'

export class App extends Component {
  // because we will use arrow functions, we don't really need to do constructor, props, super (REFERENCE: App-1.js)
  // we could still declare our state without need to do "this.state" inside the constructor
  state ={
    name: "Charmander",
    backgroundColor: "black",
    username: "",
  };

  // lifecycle methods from React.js reference docs

  // lifecycle componentDidMount()
  componentDidMount() {
    // this will run after render only once!
    this.setState({
      name: "Meow",
      
    })
  };

  // lifecycle componentDidUpdate()
  componentDidUpdate(prevProps, prevState) {
    // anytime componentDidMount runs, componentDidUpdate will be triggered and run
    if (prevState.name === "Charmander") {
      this.setState({name: "Meow"})
    }
  };

  // lifecycles shouldComponentUpdate()
  shouldComponentUpdate(nextProps, nextState) {
    
  }

  // handle changes inside input
  handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);

    this.setState({
      username: e.target.value,
    })
  };


  render() {
    return (
      <div>
        <div style={{backgroundColor: this.state.backgroundColor, color: "white"}}>
          {this.state.name}
        </div>
        
        <hr />

        <div>
          <input 
            type="text"
            name="username"
            onChange={this.handleOnChange}
          />
          <button>Submit</button>
          <br/>
          Input Value: {this.state.username}
        </div>

      </div>
    )
  }
}

export default App;
