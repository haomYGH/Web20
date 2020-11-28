import React from 'react'
// import axios from 'axios'

import './App.css'
//引入UI
import { AppUI }  from './AppUI.js'
//使用Redux管理数据
import store from './store'
//引入派发action的参数
import { getChangeInput,getAddItem,getDelItem,loadInitAxiosData,getAxiosData } from './store/actionCreators'

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
        //bind(this):方便查错
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)               
    }
    componentDidMount(){
        /*
        //action目前只能接受对象
        axios.get('http://127.0.0.1:3000')//000-server/服务器
        .then(function (response) {
            const action = loadInitAxiosData(response.data);
			store.dispatch(action)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        }) 
        */
        //action也可以是个函数（需要配置中间件react-thunk）
        const action = getAxiosData();//这个函数的返回值是个对象，对象里面有action(对象)
        // console.log(action);
        store.dispatch(action);//这一步是怎么进行的?答:这一步仅仅是执行getAxiosData函数
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