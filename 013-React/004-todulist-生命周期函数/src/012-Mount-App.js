import React from 'react'

import './App.css'
import Item from './son/Item'

class App extends React.Component {
    constructor(props){//constructor调用App组件时就会自动执行里面的东西
        console.log('App constructor')
        super(props);
        this.state = {
            list:['吃饭','睡觉','敲代码xxx'],
            task:''
        }
    }
    static getDerivedStateFromProps(props, state){
        console.log('App getDerivedStateFromProps')

        //该函数需要有个返回值,返回值会和state对象进行合并
        return null
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
    componentDidMount(){
        //一般用来发送ajax请求
        console.log('App componentDidMount')
    }
    render() {
        console.log('App render');
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