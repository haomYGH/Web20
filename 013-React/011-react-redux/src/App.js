import React from 'react'
// import axios from 'axios'

import './App.css'
//引入UI
import { Input,Button,Row, Col,List  } from 'antd';
//使用Redux管理数据
// import store from './store'
//使用React-Redux管理数据
import { connect } from 'react-redux'
//引入派发action的参数
import { getChangeInput,getAddItem,getDelItem,loadInitAxiosData,getAxiosData } from './store/actionCreators'

class App extends React.Component {
	componentDidMount(){
		this.props.handleInitData()
	}
    render(){
		const {task,list,handleChange,handleAdd,handleDel,handleInitData} = this.props;
		return( 
			<div className="App">
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
const mapStateToProps = (state)=>({
	list:state.list,
	val:state.task
})
//映射Store里面的action并派发
const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        const val = ev.target.value;
        // store.dispatch(getChangeInput(val));
        dispatch(getChangeInput(val));
    },    
    handleAdd:()=>{
        dispatch(getAddItem())

    },
    handleDel:(index)=>{
        dispatch(getDelItem(index))
	},
    handleInitData(){
        const action = getAxiosData();
        dispatch(action)  
    }	
})

export default connect(mapStateToProps,mapDispatchToProps)(App);