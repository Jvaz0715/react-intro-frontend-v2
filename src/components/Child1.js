import React, { Component } from 'react';


export class Child1 extends Component {
   constructor(props){
      super(props);
      console.log(this);
   }
   render() {
      return (
         <div>
            Hi my name is {this.props.name} and I am {this.props.age} years old.
         </div>
      )
   }
}

export default Child1;
