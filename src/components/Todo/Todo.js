import React, { Component } from 'react';
// import { v4 as uuidv4 } from "uuid";
import Button from '../common/Button';
import axios from "axios";
import TodoList from './TodoList';
import "./Todo.css";

// the below will take account of working locally or if in deployed cloud address like we did in AWS
// const URL = process.env.NODE_ENV === "production" ? "DEPLOYED ADDRESS" : "http://localhost:3001"
const URL = "http://localhost:3001";

export class Todo extends Component {

   //================= Our State ====================
   state = {
      todoList: [],
      todoInput: "",
      error: null,
      errorMessage:"",
   };

   //================= lifecycles to use data ====================
   // after render, data will be updated
   async componentDidMount() {
      try{
         let allTodos = await axios.get("http://localhost:3001/api/todos/get-all-todos");
         // console.log(allTodos)
         this.setState({
            todoList: allTodos.data.payload,
         })
      } catch(e) {
         console.log(e)
      }
   };

   //================= Handles input and submit of new todo ====================
   // functions
   // handleTodoOnChange is a function that takes an event inside of the input field and uses setState to change the todoInput, you still need to handle the form submit
   handleTodoOnChange = (e) => {
      this.setState({
         todoInput: e.target.value,
         error: false,
         errorMessage: "",
      })
   };

   // we use handleOnSubmit to use in the form so that when the submit button is clicked, we actually add the input todo to the state's todoList array! handle on submit also takes an e(event) as an argument
   handleOnSubmit = async (e) => {
      // inside of this function is where we add the preventDefault, otherwise the page will keep refreshing onsubmit click
      e.preventDefault();

      if(this.state.todoInput.length === 0) {
         this.setState({
            error: true,
            errorMessage: "Cannot create an empty todo",
         })
      } else {

         let checkIfTodoExists = this.state.todoList.findIndex(item => item.todo.toLowerCase() === this.state.todoInput.toLowerCase());

         if (checkIfTodoExists > -1) {
            this.setState({
               error: true,
            errorMessage: "Todo already exists!",
            });
         } else {
            try {
               let createdTodo = await axios.post(`${URL}/api/todos/create-todo`, {todo: this.state.todoInput,});
               
               // // logic to add a new todo below is based on not hitting backend
               let newTodoArray = [
                  ...this.state.todoList, 
                  createdTodo.data.payload,
               ];

               // once we have our NEW array, we setState to it
               this.setState({
                  todoList: newTodoArray,
                  todoInput: "",
               });
            } catch(e){
               console.log(e)
            }
         };
         
      };
   };

    //================= Todo Items buttons ====================

   // handleEditByID => Really pay attention to this as it relies on code inside of TodoList.js
   handleEditByID = async (id, editInput) => {
      try{
         let updatedTodo = await axios.put(`${URL}/api/todos/update-todo-by-id/${id}`, {todo: editInput});
         let updatedArray = this.state.todoList.map(item => {
            if(item._id === updatedTodo.data.payload._id) {
               item.todo = updatedTodo.data.payload.todo;
            }
            return item;
         });
   
         this.setState({
            todoList: updatedArray,
         })
      } catch(e){
         console.log(e)
      }
   };

   // handleDeleteByID
   handleDeleteByID = async (id) => {
      try{
         let deletedTodo = await axios.delete(`${URL}/api/todos/delete-todo-by-id/${id}`);
         let newTodoArray = this.state.todoList.filter(item => item._id !== deletedTodo.data.payload._id);

         this.setState({
            todoList: newTodoArray,
         });
         
      } catch(e){
         console.log(e)
      }

   };

   // handleDoneByID
   handleDoneByID = async (id, isDone) => {
      try {
         let updatedTodo = await axios.put(`${URL}/api/todos/update-todo-by-id/${id}`, {isDone: !isDone});
         let updatedArray = this.state.todoList.map((item) => {
            if (item._id === updatedTodo.data.payload._id) {
               item.isDone = updatedTodo.data.payload.isDone;
            }
            return item;
         });
   
         this.setState({
            todoList: updatedArray,
         })
      } catch(e) {
         console.log(e)
      }
   };

   //=================Todo list sort buttons ====================

   sortByDate = async (sortOrder) => {
      try {
         let sortedTodos = await axios.get(`${URL}/api/todos/get-todos-by-sort?sort=${sortOrder}`);

         this.setState({
            todoList: sortedTodos.data.payload,
         })
      } catch(e) {
         console.log(e);
      }
   };

   // below is without the backend
   // sortByDateNewestToOldest = () => {
   //    let sortedTodoList = this.state.todoList
   //       .sort((a, b) => {
   //          return new Date(a.dateAdded) - new Date(b.dateAdded);
   //       })
   //       .reverse();
      
   //    this.setState({
   //       todoList: sortedTodoList,
   //    })
   // };

   // sortByDateOldestToNewest = () => {
   //    let sortedTodoList = this.state.todoList
   //       .sort((a, b) => {
   //          return new Date(a.dateAdded) - new Date(b.dateAdded);
   //       });
      
   //    this.setState({
   //       todoList: sortedTodoList,
   //    })
   // };

   sortByDone = async (isDone) => {
      try {
         let isDoneArray = await axios.get(`${URL}/api/todos/get-todos-by-done?isDone=${isDone}`);
      
         this.setState({
            todoList: isDoneArray.data.payload,
         })
      } catch (e) {
         console.log(e)
      }
   };

// =============== Render Below ======================
   render() {
      return (
         <div className="todo-div">
            
            {/* form/submit div */}
            <div className="form-div">
               <form
                  onSubmit={this.handleOnSubmit}
               >
                  <div>
                     <input
                        type="text"
                        name="todoInput"
                        onChange={this.handleTodoOnChange}
                        value={this.state.todoInput}
                        autoFocus
                     />
                     <button>Submit</button>
                  </div>
                  
                  {/* the below will only show up if we have made a mistake of some sort */}
                  <span className="submit-error-message">
                     {this.state.error && this.state.errorMessage}
                  </span>
               </form>
            </div>

            {/* place sorting buttons below */}
            <div className="sorting-buttons-container">
               <ul>
                  
                  {/* date newest to oldest */}
                  <li>
                     {/* <button onClick={()=> this.sortByDate("desc")}>
                        Most Recent
                     </button> */}
                     {/* Above is hardcoded, below is refactor to use common Button.js */}
                     <Button 
                        buttonName="Most Recent"
                        clickFunc={() => this.sortByDate("desc")}
                     />
                  </li>

                  {/* date oldest to newest */}
                  <li>
                     {/* <button onClick={() => this.sortByDate("asc")}>
                        Oldest
                     </button> */}
                     {/* Above is hardcoded, below is refactor to use common Button.js */}
                     <Button 
                        buttonName="Oldest"
                        clickFunc={() => this.sortByDate("asc")}
                     />
                  </li>

                  {/* sort by isDone */}
                  <li>
                     {/* <button onClick={() => this.sortByDone("true")}>
                        Completed
                     </button> */}
                     {/* Above is hardcoded, below is refactor to use common Button.js */}
                     <Button 
                        buttonName="Completed"
                        clickFunc={() => this.sortByDone("true")}
                     />
                  </li>

                  {/* sort by is *NOT* Done */}
                  <li>
                     {/* <button onClick={() => this.sortByDone("false")}>
                        Not Completed
                     </button> */}
                     {/* Above is hardcoded, below is refactor to use common Button.js */}
                     <Button 
                        buttonName="Not Completed"
                        clickFunc={() => this.sortByDone("false")}
                     />
                  </li>
               </ul>
            </div>

            {/* Todo List Container with all todos! */}
            <div className="todo-list-container">
               <ul className="todo-unordered-list">
                  {this.state.todoList.map((item) => {
                     return (
                        <TodoList 
                           key={item._id} 
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
};

export default Todo;