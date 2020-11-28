import React from 'react'

import './App.css'
import Item from './son/Item'

class App extends React.Component {
    constructor(props){//constructor调用App组件时就会自动执行里面的东西
        super(props);
        this.state = {
            list:['吃饭','睡觉','敲代码xxx'],
            task:''
        }
    }
    handleChenge(ev){
        // const val = ev.target.value;
        // console.log(this.input);//可以获取DOM节点
        const val = this.input.value;
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
        /*
		this.setState({
			list
        })
        */
       //setState写法二
       this.setState(preState=>({
           list
       }))
    }
    render() {
        return (
            <div className="App">
                <input
                    ref={(input)=>{this.input = input}}
                    value = {this.state.task}
                    onChange = {this.handleChenge.bind(this)}
                />
                <button
                    onClick = {this.handleAdd.bind(this)}
                >提交</button>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                <Item 
                                    key={index}
                                    task={item}
                                    handleDel = { this.handleDel.bind(this,index) }
                                />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default App;