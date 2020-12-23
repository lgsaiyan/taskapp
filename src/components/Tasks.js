import React from 'react'
import TaskList from './TaskList'
import Create from './Create'
import uniqid from 'uniqid'

class Tasks extends React.Component {
    state = { tasks: [], 
        modalStyle: ''
    };

    componentDidMount= () => { 
        //Load data from local storage; if none, add sample tasks
        const savedTasks = localStorage.getItem("tasks")
        const parsedtasks = JSON.parse(savedTasks)
        if (parsedtasks.length > 0) {
            this.setState({ tasks: parsedtasks })
        } else {
            const laundry = {
                id: uniqid(),
                name: "Laundry",
                category: "House",
                description: "Wash and dry, and stuff.",
                due: "Dec 28, 2020",
                status: "INCOMPLETE"
            };

            const clean = {
                id: uniqid(),
                name: "Clean room",
                category: "House",
                description: "Organize, vacuum, and stuff.",
                due: "Dec 30, 2020",
                status: "INCOMPLETE"
            }
            const sampleTasks = [laundry, clean];
            this.setState({ tasks: sampleTasks })
        };
    };  

    modalToggle = (value) => {
        this.setState({modalStyle: value})
    };

    onReorder = (newArray) => {
        this.setState({ tasks: newArray }, ()=> {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        });
    };

    onCreate = (task) => {                          
        let tasks = [...this.state.tasks]
        tasks.push({...task})
        this.setState({ tasks: tasks }, ()=> {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
        });
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