import React from 'react'
import TaskList from './TaskList'
import Create from './Create'

class Tasks extends React.Component {
    state = { tasks: [], 
        modalStyle: ''
    };

    componentDidMount= () => { 
        //localStorage.clear()
        //Load data from local storage
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            const parsedtasks = JSON.parse(savedTasks);
            this.setState({ tasks: parsedtasks })
        };
    };  

    modalToggle = (value) => {
        this.setState({modalStyle: value})
    };

    onReorder = (newArray) => {
        this.setState({ tasks: newArray }, ()=> {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        }, console.log(this.state.tasks));
    };

    onCreate = (task) => {                          
        let tasks = [...this.state.tasks]
        tasks.push({...task})
        this.setState({ tasks: tasks }, ()=> {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        }, console.log(this.state.tasks));
    };

    onDelete = (id) => {
        const index = this.state.tasks.findIndex(el => el.id === id);
        if(index !== -1){
            let modTasks = [...this.state.tasks]
            modTasks = modTasks.filter(t => t.id !== id)
            this.setState({ tasks: modTasks }, () => {
                // Update local storage
                localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
            });
        };
    };

    onCheck = (id) => {
        const index = this.state.tasks.findIndex(el => el.id === id);
        if(index !== -1){
            let modTasks = [...this.state.tasks]
            if(modTasks[index].status === 'COMPLETE') {
                modTasks[index].status = 'INCOMPLETE'
                this.setState({ tasks: modTasks }, () => {
                    // Update local storage
                    localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
                });
            } else {
                modTasks[index].status = 'COMPLETE'
                this.setState({ tasks: modTasks }, () => {
                    // Update local storage
                    localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
                });
            };
        };
    };
    
    render() {
        return (
            <div>
            <React.Fragment>
                <Create modalStyle={this.state.modalStyle} modalToggle={this.modalToggle} onCreate={this.onCreate} />
            </React.Fragment>
                <div className="subheader">
                    <div>
                    <button className="ui orange button" onClick={() => this.modalToggle('active')}>
                        Create Task
                    </ button> 
                    <span className="hint">
                        <span className="bold">Hint:</span> drag and drop tasks to prioritize your list
                    </span>
                    </div>         
                </div>
                <div >
                    <TaskList tasks={this.state.tasks} onDelete={this.onDelete} onCheck={this.onCheck} onReorder={this.onReorder} />
                </div>
            </div>
        )
    }
};

export default Tasks