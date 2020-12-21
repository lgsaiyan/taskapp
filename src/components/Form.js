import React from 'react'

const Form = ({ name, category, description, due, onInputChangeName, onInputChangeCat, onInputChangeDesc, onInputChangeDue }) => {
 /* // use the state here, and include the button and button action Here as well! 
  onInputChangeName = (event) => {
      this.setState({ name: event.target.value });
      console.log(name)
    };

onInputChangeCat = (event) => {
      this.setState({ category: event.target.value });
    };

onInputChangeDesc = (event) => {
      this.setState({ description: event.target.value });
    };

onInputChangeDue = (event) => {
      this.setState({ due: event.target.value });
    }; */

  return (
    <div>
        <div className="ui input">
          <input type="text" placeholder="Enter name of task" value ={name} onChange={onInputChangeName}/>
        </div>
        <br />
        <br />
        <div className="ui input">
          <input type="text" placeholder="Enter a category" value ={category} onChange={onInputChangeCat}/>
        </div>
        <br />
        <br />
        <div className="ui form" >
          <div className="field">
            <textarea placeholder="Enter a description" rows="2" value ={description} onChange={onInputChangeDesc}></textarea>
          </div>
        </div>
        <br />
        <div className="ui input">
          <input type="text" placeholder="Enter a due date" value ={due} onChange={onInputChangeDue} />
        </div>
    </div>
    );
};

export default Form