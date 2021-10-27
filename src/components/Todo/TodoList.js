import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

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
      
      const { todo, _id, isDone, } = this.props.item;
      const {handleDoneByID, handleDeleteByID, } = this.props;
      const { canEdit, editInput } = this.state;

      return (
         <div style={{display: "flex", justifyContent: "center", listStyle: "none",}}>
            <table>
               <tbody>
                  <tr>
                     <td id="todo-td">
                        {/* edit/submit dynamic input to line item*/}
                        {canEdit ? (
                           <input type="text" name="editInput" value={editInput} onChange={this.handleEditOnChange}/> 
                        ) : (
                           <li className={`${isDone && `li-done`}`}>{todo}</li>
                        )}
                     </td>

                     <td>
                        {/* edit/submit dynamic button*/}
                        {canEdit 
                           ? (
                              // <button className="todo-buttons" id="edit-button" onClick={() => this.onHandleEditSubmit(_id)}>Submit</button>
                              // Above is hardcoded, below is refactor to use common Button.js
                              <Button 
                                 buttonName="Submit"
                                 cssid="edit-button"
                                 className="todo-buttons"
                                 clickFunc={() => this.onHandleEditSubmit(_id)}
                              />
                           ) : (
                              // <button className="todo-buttons" id="edit-button" onClick={this.onHandleEditClick}>Edit</button>
                              // Above is hardcoded, below is refactor to use common Button.js
                              <Button 
                                 buttonName="Edit"
                                 cssid="edit-button"
                                 className="todo-buttons"
                                 clickFunc={this.onHandleEditClick}
                              />
                           )
                        }
                     </td>

                     <td>
                        {/* done toggle for isDone */}
                        {/* <button className="todo-buttons" id="done-button" onClick={() => handleDoneByID(_id, isDone)}>Done</button> */}
                        {/* Above is hardcoded, below is refactor to use common Button.js */}
                        <Button 
                           buttonName="Done"
                           cssid="done-button"
                           className="todo-buttons"
                           clickFunc={() => handleDoneByID(_id, isDone)}
                        />
                     </td>

                     <td>
                        {/* <button className="todo-buttons" id="delete-button" onClick={() => handleDeleteByID(_id)}>Delete</button> */}
                        {/* Above is hardcoded, below is refactor to use common Button.js */}
                        <Button 
                           buttonName="Delete"
                           cssid="delete-button"
                           className="todo-buttons"
                           clickFunc={() => handleDeleteByID(_id)}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
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
