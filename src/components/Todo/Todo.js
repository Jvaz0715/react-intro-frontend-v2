import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import TodoList from './TodoList';
import "./Todo.css";

export class Todo extends Component {

   state = {
      todoList: [
         {
            id: uuidv4(),
            todo: "walk tokyo",
            isDone: false,
         },
         {
            id: uuidv4(),
            todo: "code project",
            isDone: false,
         },
         {
            id: uuidv4(),
            todo: "clean apartment",
            isDone: false,
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
            id: uuidv4(),
            todo: this.state.todoInput,
            isDone: false,
         }
      ];

      // once we have our NEW array, we setState to it
      this.setState({
         todoList: newTodoArray,
         todoInput: "",
      })
   };

   // handleEditByID
   handleEditByID = (id, editInput) => {
      let updatedArray = this.state.todoList.map(item => {
         if(item.id === id) {
            item.todo = editInput;
         }
         return item;
      });

      this.setState({
         todoList: updatedArray,
      })
   };

   // handleDeleteByID
   handleDeleteByID = (id) => {
      let newTodoArray = this.state.todoList.filter(item => item.id !== id);

      this.setState({
         todoList: newTodoArray,
      })
   };

   // handleDoneByID
   handleDoneByID = (id, isDone) => {
      let updatedArray = this.state.todoList.map(item => {
         if (item.id === id) {
            item.isDone = !item.isDone;
         }
         return item;
      });

      this.setState({
         todoList: updatedArray,
      })
   };


// =====================================
   render() {
      return (
         <div className="todo-div">
            
            <div className="form-div">
               <form
                  onSubmit={this.handleOnSubmit}
               >
                  <input
                     type="text"
                     name="todoInput"
                     onChange={this.handleTodoOnChange}
                     value={this.state.todoInput}
                  />
                  <button>Submit</button>
               </form>
            </div>

            <div className="todo-list-container">
               <ul className="todo-unordered-list">
                  {this.state.todoList.map((item) => {
                     return (
                        <TodoList 
                           key={item.id} 
                           item={item}
                           handleDoneByID={this.handleDoneByID}
                           handleDeleteByID={this.handleDeleteByID}
                           handleEditByID={this.handleEditByID}
                        />
                     )
                  })}
               </ul>
            </div>
            
         </div>
      )
   }
}

export default Todo;
