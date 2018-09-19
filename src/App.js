import React, { Component } from 'react';

class TaskRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.value.description}</td>
          <td><button className="deleteButton" onClick={this.props.deleteTask}>X</button></td>
      </tr>
    )
  }
}

class TasksTable extends Component {
  render() {
    const tasks = this.props.tasks;
    const tasksList = []
    console.log("CLEARLIST", this.props.clearList);

    tasks.forEach((task) =>
      tasksList.push(
        <TaskRow key={tasks.indexOf(task)} value={task} index={tasks.indexOf(task) + 1}
          deleteTask={() => this.props.deleteTask(task)} />
      )
    )

    return (
      <table className="tasksTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>(x)</th>
          </tr>
        </thead>
        <tbody>
          {tasksList}
        </tbody>
      </table>
    )
  }
}

class CreateTask extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const inputTask = event.target.elements.addTask.value;
      this.props.addTasks(inputTask);
    }
    return (
      <div>
        <form className="create-task" onSubmit={onSubmit}>
          <input className="new-task" name="addTask" type="text" placeholder="Enter Task" />
          <br />
          <button className="submit-task" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: TASKS,
    }
    this.addTasks = this.addTasks.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.clearList = this.clearList.bind(this);
    this.resetList = this.resetList.bind(this);
  }

  addTasks(newTask) {
    const oldTasks = this.state.tasks;
    const newTasks = {
      description: newTask,
    }
    const newTaskList = [...oldTasks, newTasks];
    this.setState({ tasks: newTaskList })
  }

  deleteThisTask(deleteTask) {
    const oldTasks = this.state.tasks;
    const newTasks = oldTasks.filter(task => task !== deleteTask);
    this.setState({ tasks: newTasks })
  }

  clearList() {
    this.setState({ tasks: [], })
  }

  resetList() {
    this.setState({ tasks: TASKS })
  }


  render() {
    return (
      <div className="main-container">
        <div className="main-content">
          <div className="titles">
            <h1 className="main-title">React To-Do List</h1>
          </div>
          <CreateTask addTasks={this.addTasks} />
          <TasksTable tasks={this.state.tasks} taskCompleted={this.state.taskCompleted} deleteTask={this.deleteThisTask} clearList={this.clearList} />
          <div className="clear-reset">
            <button className="clear" onClick={this.clearList}>Clear List</button>
            <button className="reset" onClick={this.resetList}>Reset List</button>
          </div>
        </div>
      </div>
    )
  }
}

const TASKS = [
  { description: "Finish To Do List" },
  { description: "Learn React" },
  { description: "Get awesome at coding" },
  { description: "Make cool stuff" }
]

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <ToDoApp tasks={TASKS} />
      </div>
    );
  }
}

export default App;
