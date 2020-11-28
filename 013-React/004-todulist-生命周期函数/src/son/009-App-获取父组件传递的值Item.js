import React,{ Component } from 'react'

class Item extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li>{this.props.task}</li>
        )
    }
}
export default Item;