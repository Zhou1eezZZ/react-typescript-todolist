import React from 'react';
import './App.css';
import ListCard from './components/ListCard/index';
import InputBlock from './components/InputBlock/index';
import { message } from 'antd';

interface todoItem {
  content: string,
  isDone: Boolean
}

class App extends React.Component {
  state = {
    todoLists: [{
      content: '',
      isDone: false
    }]
  }
  componentWillMount() {
    this.getListFromLocal()
  }
  changeTodoStauts = (item: todoItem): void => {
    let arr = this.state.todoLists
    arr.forEach((e, i) => {
      if (e.content === item.content) {
        arr[i].isDone = !arr[i].isDone
      }
    })
    this.setState({
      todoLists: arr
    })
    this.addListToLocal()
  }
  deleteTodo = (item: todoItem): void => {
    let arr = this.state.todoLists
    arr.forEach((e, i) => {
      if (e.content === item.content) {
        arr.splice(i, 1)
      }
    })
    this.setState({
      todoLists: arr
    })
    this.addListToLocal()
  }
  addTodo = (todo: todoItem): void => {
    if (this.state.todoLists.find(e => e.content.trim() === todo.content.trim())) {
      message.warning('已存在相同的todo项')
      return
    }
    let arr: todoItem[] = this.state.todoLists
    arr.push(todo)
    this.setState({
      todoLists: arr
    })
    this.addListToLocal()
  }
  addListToLocal = (): void => {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoLists))
  }
  getListFromLocal = (): void => {
    let localList: any = localStorage.getItem('todoList')
    if (localList) {
      this.setState({
        todoLists: JSON.parse(localList)
      })
    }
  }
  render() {
    return (
      <div className="App">
        <img src="./favicon.png" alt="logo" style={{ width: 100 }} />
        <h1>React-TodoList</h1>
        <InputBlock onTodoAdd={this.addTodo} />
        <ListCard todoLists={this.state.todoLists} onCompleted={this.changeTodoStauts} onDelete={this.deleteTodo} />
      </div>
    )
  }

}

export default App;
