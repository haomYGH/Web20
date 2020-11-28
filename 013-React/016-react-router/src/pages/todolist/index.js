import React from 'react'

import './index.css'
//引入UI
import { Input,Button,Row, Col,List  } from 'antd';
//使用React-Redux管理数据
import { connect } from 'react-redux'
//引入dispatch的参数action
// import { getChangeInput,getAddItem,getDelItem,loadInitAxiosData,getAxiosData } from '../../store/actionCreators'
import {actionTodoList} from './store/index.js'

class TodoList extends React.Component {
	componentDidMount(){
		this.props.handleInitData()
	}
    render(){
		const {task,list,handleChange,handleAdd,handleDel,handleInitData} = this.props;
		return( 
			<div className="TodoList">
				<Row>
					<Col span={20}>
						<Input
							value={task} 
							onChange = {handleChange}
						/>
					</Col>
					<Col span={4}>
						<Button type="primary" 
							onClick = {handleAdd}
						>新增</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:10}}
				  	bordered
				  	dataSource={list}
				  	renderItem={(item,index) => (<List.Item onClick={handleDel}>{item}</List.Item>)}
				/>				
			</div>
		)
	}
}
//映射Store里面的state
const mapStateToProps = (state)=>{
	console.log(state);
	return{
		list:state.get('todolist').get('list'),
		task:state.get('todolist').get('task')
	}
}
//映射Store里面的action并派发
const mapDispatchToProps = (dispatch)=>({//当里面返回的只有一个对象时可以外加小括号,省略里面的return
    handleChange:(ev)=>{
        const val = ev.target.value;
        // store.dispatch(getChangeInput(val));
        dispatch(actionTodoList.getChangeInput(val));
    },    
    handleAdd:()=>{
        dispatch(actionTodoList.getAddItem())

    },
    handleDel:(index)=>{
        dispatch(actionTodoList.getDelItem(index))
	},
    handleInitData(){
        const action = actionTodoList.getAxiosData();
        dispatch(action)  
    }	
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);