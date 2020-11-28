import React,{ Component } from 'react'

class Item extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // console.log(this.props);
        return (
            <li
                //子组件调用父组件传递过来的方法,把将要传递的参数传给该方法(直接在调用的时候传递参数)
                onClick = {this.props.handleDel}
            >{this.props.task}</li>
        )
    }
}
export default Item;