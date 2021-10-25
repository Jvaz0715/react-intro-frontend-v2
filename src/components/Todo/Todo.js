import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import TodoList from './TodoList';
import "./Todo.css";

export class Todo extends Component {

   //================= Our State ====================
   state = {
      todoList: [
         {
            id: uuidv4(),
            todo: "walk tokyo",
            isDone: false,
            dateAdded: new Date().getTime(),
         },
         {
            id: uuidv4(),
            todo: "code project",
            isDone: false,
            dateAdded: new Date().getTime() + 1,
         },
         {
            id: uuidv4(),
            todo: "clean apartment",
            isDone: false,
            dateAdded: new Date().getTime() + 2,
         }
      ],
      todoInput: "",
   };

   //================= Handles input and submit of new todo ====================
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
            dateAdded: new Date().getTime(),
         }
      ];

      // once we have our NEW array, we setState to it
      this.setState({
         todoList: newTodoArray,
         todoInput: "",
      })
   };

    //================= Todo Items buttons ====================

   // handleEditByID => Really pay attention to this as it relies on code inside of TodoList.js
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

   //=================Todo list sort buttons ====================

   sortByDateNewestToOldest = () => {

   };

   sortByDateOldestToNewest = () => {

   };

   sortByDone = () => {

   };

   sortByNotDone = () => {

   };


// =============== Render Below ======================
   render() {
      console.log(this.state)
      return (
         <div className="todo-div">
            
            {/* form/submit div */}
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

            {/* place sorting buttons below */}
            <div className="sorting-buttons-container">
               <ul>
                  
                  {/* date newest to oldest */}
                  <li>
                     <button onClick={this.sortByDateNewestToOldest}>
                        Most Recent
                     </button>
                  </li>

                  {/* date oldest to newest */}
                  <li>
                     <button onClick={this.sortByDateOldestToNewest}>
                        Oldest
                     </button>
                  </li>

                  {/* sort by isDone */}
                  <li>
                     <button onClick={this.sortByDone}>
                        Completed
                     </button>
                  </li>

                  {/* sort by is *NOT* Done */}
                  <li>
                     <button onClick={this.sortByNotDone}>
                        Not Completed
                     </button>
                  </li>



               </ul>
            </div>


            {/* Todo List Container with all todos! */}
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
