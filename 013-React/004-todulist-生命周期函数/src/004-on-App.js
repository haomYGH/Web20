import React from 'react'

import './App.css'

class App extends React.Component {
    handleClick(){
        console.log(this)//我们需要将this始终指向组件
        console.log('btn click ...')
    }
    render() {
        console.log(this)//指向组件自身
        return (
            <div className="App">
                <input />
                <button
                    // onClick = {()=>{console.log('aa')}}//要通过函数才能做到点击执行，不然不用点击就能执行
                    onClick = {this.handleClick.bind(this)}
                >提交</button>
                <ul>
                    <li>吃饭</li>
                    <li>睡觉</li>
                    <li>打游戏</li>
                </ul>
            </div>
        )
    }
}
export default App;