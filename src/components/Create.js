import React from 'react'
import Modal from './Modal'
import uniqid from 'uniqid'
import Calendar from './Calendar'

class Create extends React.Component {
    constructor(props){
        super(props);
        this.state = { task: {
          id: uniqid(),
          name: "",
          category: "",
          description: "",
          due: "",
          status: "INCOMPLETE"
        },
        nameError: 'true',
        catError: 'true',
        descError: 'true'
      };
    };

    // Input Updates ///////////////////////////////

    onInputChangeName = (event) => {
        this.setState( prevState => ({ 
          task: {
          ...prevState.task, 
          name: event.target.value
         }
         }), () => this.validate(this.state.task.name, 'nameError'))
      };
  
     onInputChangeCat = (event) => {
        this.setState( prevState => ({
          task: {
            ...prevState.task, category: event.target.value
          }
        }), ()=> this.validate(this.state.task.category, 'catError'))
      };
  
    onInputChangeDesc = (event) => {
      this.setState( prevState => ({
        task: {
          ...prevState.task, description: event.target.value
        }
      }), () => this.validateDesc(this.state.task.description, 'descError'))
    };
  
    onInputChangeDue = (input) => {
      this.setState( prevState => ({
        task: {
          ...prevState.task, due: input
        }
      }))
    };

    validate = (input, property) => {
        this.setState(prevState => {
          const state = {...prevState};
          state[property] = (input.length > 18 || input.length <= 0) ? 'true': 'false';
          return state;
        },
          () => console.log(this.state[property], '||| input: ', input))
    };

    validateDesc = (input, property) => {
      this.setState(prevState => {
        const state = {...prevState};
        state[property] = (input.length > 40 || input.length <= 0) ? 'true': 'false';
        return state;
      },
        () => console.log(this.state[property], '||| input: ', input))
    };

    renderError = (input, name) => {
      if (name === 'description'){
        if(input.length > 40){
          return ( 
            <div>
              <div className="error">
                The {name} of your task has exceeded the maximum character count.
              </div>
              <br />
            </div>
            );
        } else {
          return (
            <br />
          )
        };
      } else {
        if(input.length > 18) {
          return ( 
          <div className="error">
            The {name} of your task has exceeded the maximum character count.
          </div>
          );
        } else {
          return (
            <br />
          )
        };
      };
    };

    onSubmit = () => {
      if (this.state.nameError === 'false' 
        && this.state.catError === 'false' 
        && this.state.descError === 'false'){ 
        this.props.onCreate({...this.state.task})
        this.props.modalToggle('')
        console.log(this.state)

        //Clear inputs for next use
        this.setState( prevState => ({ 
          task: {
            ...prevState.task,
            name:'',
            category: '',
            description: '',
            due: '',
            id: uniqid(),
          },
          error: 'false'
        }));
      
      } else {
        // Display Error Message
        alert("Form cannot be submitted; verify input(s)")
      };
      
    };

    // Render Functions //////////////////////////////////////////

    renderActions() {
        return (
            <React.Fragment>
                <button onClick={this.onSubmit} className="ui button primary">Create</button>
                <button onClick={() => this.props.modalToggle('none')} className="ui button">Cancel</button>
            </React.Fragment>
        )
    };

    renderContent() {
        return (
                <div>
                    <div className="ui input">
                      <input type="text" placeholder="Enter name of task" value ={this.state.task.name} onChange={this.onInputChangeName}/>
                    </div>
                    {this.renderError(this.state.task.name,'name')}
                    <br />
                    <div className="ui input">
                      <input type="text" placeholder="Enter a category" value ={this.state.task.category} onChange={this.onInputChangeCat}/>
                    </div>
                    {this.renderError(this.state.task.category,'category')}
                    <br />
                    <div className="ui form" >
                      <div className="field">
                        <textarea placeholder="Enter a description" rows="2" value ={this.state.task.description} onChange={this.onInputChangeDesc}></textarea>
                      </div>
                    </div>
                    {this.renderError(this.state.task.description,'description')}
                    <div>
                      <div className="date">
                        Due date:
                      </div>
                      <Calendar dueState={this.state.task.due} onInputChange={this.onInputChangeDue} />
                    </div>
                </div>
        )
    };

    render () {
        return (
            <Modal
                title="Create Task"
                content={this.renderContent()}
                actions={this.renderActions()}
                modalStyle={this.props.modalStyle}
                onDismiss={()=> this.props.modalToggle('')}
            />
        );
    };
};

export default Create 