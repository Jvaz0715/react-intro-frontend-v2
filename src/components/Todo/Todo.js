import React, { Component } from 'react';

import "./Todo.css";

export class Todo extends Component {

   state = {
      todoList: [
         {
            id: 1,
            todo: "walk tokyo",
         },
         {
            id: 2,
            todo: "code project"
         },
         {
            id: 3,
            todo: "clean apartment",
         }
      ],
      todoInput: "",
   };

   // functions
   // handleTodoOnChange is a function that takes an event inside of the input field and uses setState to change the todoInput, you still need to handle the form submit
   handleTodoOnChange = (e) => {
      this.setState({
         todoInput: e.target.value,
      })
   };

   // we use handleOnSubmit to use in the form so that when the submit button is clicked, we actually add the input todo to the state's todoList array! handle on submit also takes an e(event) as an argument
   handleOnSubmit = (e) => {
      // inside of this function is where we add the preventDefault, otherwise the page will keep refreshing onsubmit click
      e.preventDefault();
      
      // logic to add a new todo below!
      let newTodoArray = [
         ...this.state.todoList, 
         {
            id: this.state.todoList.length,
            todo: this.state.todoInput
         }
      ];

      // once we have our NEW array, we setState to it
      this.setState({
         todoList: newTodoArray,
      })
   };


   render() {
      return (
         <div className="todo-div">
            
            <div>
               <form
                  onSubmit={this.handleOnSubmit}
               >
                  <input
                     type="text"
                     name="todoInput"
                     onChange={this.handleTodoOnChange}
                  />
                  <button>Submit</button>
               </form>
            </div>


            <hr />
            <div>
               <ul>
                  {this.state.todoList.map((item, index) => {
                     return <li key={index}>{item.todo}</li>
                  })}
               </ul>
            </div>
            
         </div>
      )
   }
}

export default Todo;
