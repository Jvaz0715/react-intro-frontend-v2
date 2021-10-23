import React, { Component } from 'react';
import "./TodoList.css";

export class TodoList extends Component {
   state = {
      canEdit: false,
   }
   render() {
      // console.log(this.props.handleDeleteByID)
      const { todo, id, isDone } = this.props.item;
      const { handleDoneByID, handleDeleteByID } = this.props;
      return (
         <div style={{display: "flex", justifyContent: "center", listStyle: "none",}}>
            <li className={`${isDone && `li-done`}`}>{todo}</li>
            <button id="edit-button">Edit</button>
            
            <button id="done-button" onClick={() => handleDoneByID(id, isDone)}>Done</button>
            
            <button id="delete-button" onClick={() => handleDeleteByID(id)}>Delete</button>
         </div>
      )
   }
}

export default TodoList;
