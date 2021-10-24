import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./TodoList.css";

export class TodoList extends Component {
   state = {
      canEdit: false,
      editInput: this.props.item.todo,
   };

   onHandleEditClick = () => {
      this.setState((prevState)=>{
         return {
            canEdit: !prevState.canEdit,
         }
      })
   };

   handleEditOnChange = (e) => {
      this.setState({
         editInput: e.target.value,
      })
   };

   onHandleEditSubmit = (id) => {
      this.onHandleEditClick();
      this.props.handleEditByID(id, this.state.editInput)
   }

   render() {
      // console.log(this.props.handleDeleteByID)
      const { todo, id, isDone, } = this.props.item;
      const {handleDoneByID, handleDeleteByID, } = this.props;
      const { canEdit, editInput } = this.state;

      return (
         <div style={{display: "flex", justifyContent: "center", listStyle: "none",}}>
            
            {/* edit/submit dynamic input to line item*/}
            {canEdit ? (
               <input type="text" name="editInput" value={editInput} onChange={this.handleEditOnChange}/> 
            ) : (
               <li className={`${isDone && `li-done`}`}>{todo}</li>
            )}
            
            
            {/* edit/submit dynamic button*/}
            {canEdit 
               ? (<button className="todo-buttons" id="edit-button" onClick={() => this.onHandleEditSubmit(id)}>Submit</button>)
               : (<button className="todo-buttons" id="edit-button" onClick={this.onHandleEditClick}>Edit</button>)
            }

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
   handleEditByID: PropTypes.func.isRequired,
}

export default TodoList;
