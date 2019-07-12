import * as React from 'react';
import style from './ListCard.module.scss';
import { Card, Divider, Icon, Popconfirm } from 'antd';
import { CSSTransition } from 'react-transition-group';

interface todoItem {
    content: string,
    isDone: Boolean
}

interface IProps {
    todoLists: todoItem[],
    onCompleted: any,
    onDelete: any
}

interface IState {
    isDoneChange: Boolean
}
class ListCard extends React.Component<IProps, IState> {
    state = {
        isDoneChange: false
    }
    render() {
        let { isDoneChange } = this.state
        let undoneList = this.props.todoLists.filter(e => !e.isDone)
        let doneList = this.props.todoLists.filter(e => e.isDone)
        return (
            <div className={style['container']}>
                {
                    undoneList.length > 0 ?
                        <Divider><Icon type="calendar" theme="twoTone" /></Divider>
                        : null
                }

                {
                    undoneList.map((e, i) =>
                        <CSSTransition
                            in={isDoneChange}
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
                {
                    doneList.length > 0 ?
                        <Divider><Icon type="check" className={style['iconColor']} /></Divider>
                        : null
                }

                {
                    doneList.map((e, i) =>
                        <CSSTransition
                            in={!isDoneChange}
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
                                    <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
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
            isDoneChange: !this.state.isDoneChange
        })
    }
    handleDeleteTodo = (item: todoItem): void => {
        this.props.onDelete(item)
    }
}

export default ListCard