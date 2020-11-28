import React from 'react'

import './App.css'

class App extends React.Component {
    constructor(prop){
        super(prop);
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
        // console.log(index);
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
                                <li 
                                    key={index}
                                    onClick = {this.handleDel.bind(this,index)}//第一个参数是改变this，第二个参数是传值
                                >
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default App;