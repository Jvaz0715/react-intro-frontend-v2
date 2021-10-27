
import React from 'react'

function Button(props) {
   return (
      // using React.Fragment or <> </> will allow for your styling to stay the same across even after refactoring buttons
      <React.Fragment>
         <button 
            className={props.className} 
            id={props.cssid}
            onClick={() => props.clickFunc()}
         >
            {props.buttonName}
         </button>
      </React.Fragment>
   )
}

export default Button
