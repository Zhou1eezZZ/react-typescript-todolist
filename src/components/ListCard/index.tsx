import * as React from 'react';
import style from './ListCard.module.scss';
import { Card, Divider, Icon ,Popconfirm } from 'antd';
import { CSSTransition } from 'react-transition-group';

interface todoItem{
    content: string,
    isDone: Boolean
}

interface IProps {
    todoLists: todoItem[],
    onCompleted:any,
    onDelete:any
}

interface IState{
    isDoneChange:Boolean
}
class ListCard extends React.Component<IProps,IState> {
    state = {
        isDoneChange :false
    }
    render() {
        return (
            <div className={style['container']}>
                <Divider><Icon type="calendar" theme="twoTone" /></Divider>
                {
                    this.props.todoLists.filter(e => !e.isDone).map((e, i) =>
                        <CSSTransition
                        in={this.state.isDoneChange}
                        timeout={1000}
                        classNames='fade'
                        key={i}>
                            <Card className={style['todoListCard']} key={i}>
                                <p>{e.content}</p>
                                <Popconfirm
                                    title="Are you sure delete this todo task?"
                                    onConfirm={() => this.handleDeleteTodo(e)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
                                </Popconfirm>
                                <Icon type="down-circle" theme="twoTone" twoToneColor="#52c41a" onClick={() => this.toggleComplete(e)} />
                            </Card>
                        </CSSTransition>
                    )
                }
                <Divider><Icon type="check" className={style['iconColor']} /></Divider>
                {
                    this.props.todoLists.filter(e => e.isDone).map((e, i) =>
                        <CSSTransition
                            in={!this.state.isDoneChange}
                            timeout={1000}
                            classNames='fade'
                            key={i}>
                            <Card className={style['todoListCard']} key={i}>
                                <p className={style['doneList']}>{e.content}</p>
                                <Popconfirm
                                    title="Are you sure delete this todo task?"
                                    onConfirm={() => this.handleDeleteTodo(e)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"  />
                                </Popconfirm>
                                <Icon type="up-circle" theme="twoTone" onClick={() => this.toggleComplete(e)} />
                            </Card>
                        </CSSTransition>
                    )
                }
            </div>
        )
    }

    toggleComplete = (item: todoItem): void => {
        this.props.onCompleted(item)
        this.setState({
            isDoneChange:!this.state.isDoneChange
        })
    }
    handleDeleteTodo = (item: todoItem):void => {
        this.props.onDelete(item)
    }
}

export default ListCard