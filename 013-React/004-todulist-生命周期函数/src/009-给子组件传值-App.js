import React from 'react'

import './App.css'
import Item from './son/Item'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:['吃饭','睡觉','敲代码xxx'],
            task:''
        }
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
		this.setState({
			list
        })
    }
    render() {
        return (
            <div className="App">
                <input
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
                                /*
                                <li 
                                    key={index}
                                    onClick = {this.handleDel.bind(this,index)}//第一个参数是改变this，第二个参数是传值
                                >
                                    {item}
                                </li>
                                */
                                <Item 
                                    key={index}
                                    task={item}//向儿子传值，名称自定义
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