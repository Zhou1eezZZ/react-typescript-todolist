import React from 'react';
import './App.css';
import ListCard from './components/ListCard/index';
import InputBlock from './components/InputBlock/index';

interface todoItem {
  content: string,
  isDone: Boolean
}

class App extends React.Component {
  state = {
    todoLists: [{
      content: 'Learning typescript',
      isDone: false
    },
    {
      content: 'Learning React',
      isDone: true
    }]
  }
  changeTodoStauts = (item: todoItem): void => {
    let arr = this.state.todoLists
    arr.map((e, i) => {
      if (e.content === item.content) {
        arr[i].isDone = !arr[i].isDone
        this.setState({
          todoLists: arr
        })
      }
      return ''
    })
  }
  deleteTodo = (item: todoItem): void => {
    let arr = this.state.todoLists
    arr.map((e, i) => {
      if (e.content === item.content) {
        arr.splice(i, 1)
        this.setState({
          todoLists: arr
        })
      }
      return ''
    })
  }
  addTodo = (todo: todoItem): void => {
    let arr: todoItem[] = this.state.todoLists
    arr.push(todo)
    this.setState({
      todoLists: arr
    })
  }
  render() {
    return (
      <div className="App">
        <img src="./favicon.png" alt="logo" style={{width:100}}/>
        <h1>React-TodoList</h1>
        <InputBlock onTodoAdd={this.addTodo} />
        <ListCard todoLists={this.state.todoLists} onCompleted={this.changeTodoStauts} onDelete={this.deleteTodo} />
      </div>
    )
  }

}

export default App;
