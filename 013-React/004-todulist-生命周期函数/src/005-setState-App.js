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
        // console.log(ev.target.value)
        const val = ev.target.value;
        this.state.task = val;

    }    
    handleClick(){
        console.log('push before::',this.state.list);//push before:: (3) ["吃饭", "睡觉", "敲代码xxx"]
        this.state.list.push(this.state.task);
        console.log('push after::',this.state.list);//push after:: (4) ["吃饭", "睡觉", "敲代码xxx", "xxx"]
        //先获取state.list值显示到页面,然后通过chenge监听输入值，把输入值用数组的方法push到state.list里面
        //这样做并不能改变this.state中的值！！！！！！！！！！！！！！！！！！
    }
    render() {
        return (
            <div className="App">
                <input
                    onChange = {this.handleChenge.bind(this)}
                />
                <button
                    onClick = {this.handleClick.bind(this)}
                >提交</button>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                //Each child in a list should have a unique "key" prop.
                                <li key={index}>
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