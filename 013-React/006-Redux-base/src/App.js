import React from 'react'

import './App.css'
//引入antd
import { Input,Button,List } from 'antd';
//使用Redux管理数据
import store from './store'

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
    }
    handleChenge(ev){
        const val = ev.target.value;
        //派发action
        const action = {
            type:'chenge_input',
            payload:val
        }
        store.dispatch(action)
    }    
    handleAdd(){
        let list = [...this.state.list];
        // list.push(this.state.task);
        const action = {
            type:'add_item',
            payload:list
        }
        store.dispatch(action)

    }
    handleDel(index){
		// const list = [...this.state.list];
        // list.splice(index,1);
        const action = {
            type:'del_item',
            payload:index
        }
        store.dispatch(action)
    }
    render() {
        return (
            <div className="App">
               <Input 
                    value = {this.state.task}
                    onChange = {this.handleChenge.bind(this)}
               />
                <Button
                    type="primary"
                    onClick = {this.handleAdd.bind(this)}
                >
                    提交
                </Button>
                <List
                    style={{marginTop:10}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item,index) => (
                        <List.Item
                            task={item}
                            onClick = { this.handleDel.bind(this,index) }
                        >
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
export default App;