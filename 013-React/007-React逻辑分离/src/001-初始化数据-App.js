import React from 'react'

import './App.css'
//引入antd
import { Input,Button,List } from 'antd';
//使用Redux管理数据
import store from './store'

class App extends React.Component {
    constructor(props){
        super(props);
        /*
        this.state = {
            list:['吃饭','睡觉','敲代码xxx'],
            task:''
        }
        */
        // 初始化数据
        this.state = store.getState();
    }
    handleChenge(ev){
        const val = ev.target.value;
        this.setState({
            task:val
        })

    }    
    handleAdd(){
       let list = [...this.state.list];
       list.push(this.state.task);
       this.setState({
           list:list,
           task:''
       })

    }
    handleDel(index){
		const list = [...this.state.list];
        list.splice(index,1);
       this.setState(preState=>({
           list
       }))
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