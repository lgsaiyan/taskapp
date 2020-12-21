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
        nameError: 'false',
        catError: 'false',
        descError: 'false',
        dueError: 'false'
      };
    };

    // Input Updates ///////////////////////////////

    onInputChangeName = (event) => {
        this.setState( prevState => ({ 
          task: {
          ...prevState.task, 
          name: event.target.value
         }
         }), this.validateName(this.state.task.name))
      };
  
     onInputChangeCat = (event) => {
        this.setState( prevState => ({
          task: {
            ...prevState.task, category: event.target.value
          }
        }), this.validateCat(this.state.task.category))
      };
  
    onInputChangeDesc = (event) => {
      this.setState( prevState => ({
        task: {
          ...prevState.task, description: event.target.value
        }
      }), this.validateDesc(this.state.task.description))
    };
  
    onInputChangeDue = (input) => {
      this.setState( prevState => ({
        task: {
          ...prevState.task, due: input
        }
      }))
    };

    // Form Validation ////////////////////////////////////////////////

    validateName = (input) => {  //input is NOT updating quick enough for check to be performed correctly // 
      console.log(input.length + 1)
        if((input.length + 1) > 4) {
            this.setState({ nameError: 'true'}, console.log('should be true but is', this.state.nameError, '||| input: ', input))
        } else {
            this.setState({ nameError: 'false'}, console.log('should be false but is', this.state.nameError, '||| input: ', input))
        }
    };

    validateCat = (input) => { 
      if(input.length > 4) {
          this.setState({ catError: 'true'})
      } else {
          this.setState({ catError: 'false'})
      }
    };

    validateDesc = (input) => { 
      if(input.length > 4) {
          this.setState({ descError: 'true'})
      } else {
          this.setState({ descError: 'false'})
      }
    };

    // validateDue = (input) => { 
    //   if(input.length > 4) {
    //       this.setState({ dueError: 'true'})
    //   } else {
    //       this.setState({ dueError: 'false'})
    //   }
    // };

    renderError = (input, name) => {
      if (name === 'description'){
        if(input.length > 4){
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
        if(input.length > 4) {
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
        && this.state.catError == 'false' 
        && this.state.descError == 'false' 
        && this.state.dueError === 'false') { 
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
        alert("Form cannot be submitted; verify input(s) as noted")
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