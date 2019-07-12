import * as React from 'react'
import style from './InputBlock.module.scss'
import { Input, Button, message } from 'antd'

interface todoItem {
    content: string,
    isDone: Boolean
}

interface IProps {
    onTodoAdd: any
}

interface IState {
    userInput: string
}

class InputBlock extends React.PureComponent<IProps, IState>{
    state = {
        userInput: ''
    }
    render() {
        return (
            <div className={style['container']}>
                <Input className={style['todo-input']} value={this.state.userInput} onChange={this.handleChange} placeholder="输入待办事项..." />
                <Button onClick={this.handleAdd}>添加</Button>
            </div>
        )
    }
    handleChange = (e: any): void => {
        this.setState({
            userInput: e.target.value
        })
    }
    handleAdd = (): void => {
        if (this.state.userInput.trim()) {
            let todo: todoItem = {
                content: this.state.userInput,
                isDone: false
            }
            this.props.onTodoAdd(todo)
            this.setState({
                userInput: ''
            })
        }else{
            message.warning('请输入todo内容.')
        }

    }
}

export default InputBlock