import React from 'react'
import axios from 'axios'

import './App.css'
//引入UI
import { AppUI }  from './AppUI.js'
//使用Redux管理数据
import store from './store'
//引入派发action的参数
import { getChangeInput,getAddItem,getDelItem } from './store/actionCreators'

class App extends React.Component {
    constructor(props){
        super(props);
        //初始化数据
        this.state = store.getState();
		//当store中的数据发生变化时触发
		store.subscribe(()=>{
			//获取store中的最新数据来更新当前组件的state数据
            this.setState(()=>store.getState())
        }); 
        //bind(this):方便管理
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)               
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:3000')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })        
    }
    handleChange(ev){
        const val = ev.target.value;
        store.dispatch(getChangeInput(val));
    }    
    handleAdd(){
        store.dispatch(getAddItem())

    }
    handleDel(index){
        store.dispatch(getDelItem(index))
    }
    render() {
        return (
           <AppUI 
				handleChange={this.handleChange}
				value = {this.state.task}
				handleAdd={this.handleAdd}
				list={this.state.list}
				handleDel={this.handleDel}               
           />
        )
    }
}
export default App;