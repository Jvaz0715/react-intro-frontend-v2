import React, { Component } from 'react';

export class TodoList extends Component {

   render() {
      console.log(this.props)
      return (
         <div>
            {this.props.item.todo}
         </div>
      )
   }
}

export default TodoList;
