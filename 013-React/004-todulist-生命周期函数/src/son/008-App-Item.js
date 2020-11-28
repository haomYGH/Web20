import React,{ Component } from 'react'

class Item extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props);
        return (
            <li>儿子</li>
        )
    }
}
export default Item;