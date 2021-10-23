import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            
            {/* edit/submit dynamic */}
            <button className="todo-buttons" id="edit-button">Edit</button>
            


            {/* done toggle for isDone */}
            <button className="todo-buttons" id="done-button" onClick={() => handleDoneByID(id, isDone)}>Done</button>
            
            <button className="todo-buttons" id="delete-button" onClick={() => handleDeleteByID(id)}>Delete</button>
         </div>
      )
   }
};

TodoList.propType = {
   item: PropTypes.object.isRequired,
   handleDeleteByID: PropTypes.func.isRequired,
   handleDoneByID: PropTypes.func.isRequired,
}

export default TodoList;
