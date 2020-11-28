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
        // this.state.task = val;
        //要想改变this.state里面的值，得通过setState
        this.setState({
            task:val
        })

    }    
    handleClick(){
        /*
        console.log('push before::',this.state.list);//push before:: (3) ["吃饭", "睡觉", "敲代码xxx"]
        this.state.list.push(this.state.task);
        console.log('push after::',this.state.list);//push after:: (4) ["吃饭", "睡觉", "敲代码xxx", "xxx"]
        */
       let list = [...this.state.list];
       list.push(this.state.task);
       this.setState({
           list:list,
           task:''
       })
       //点击改变后怎么清空输入框的值
       //将input的值跟task绑定

    }
    render() {
        return (
            <div className="App">
                <input
                    value = {this.state.task}
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