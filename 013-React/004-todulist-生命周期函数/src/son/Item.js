import React,{ Component } from 'react'
import PropTypes from 'prop-types';//用于类型检查，如果不是此类型就会报错

class Item extends Component {
    //生命周期函数
    constructor(props){
        console.log('App constructor')
        super(props);
    }
    //生命周期函数
    static getDerivedStateFromProps(props, state){
        console.log('App getDerivedStateFromProps')

        //该函数需要有个返回值,返回值会和state对象进行合并
        return null
    } 
    //生命周期函数
    componentDidMount(){
        //一般用来发送ajax请求
        console.log('App componentDidMount')
    } 
    //生命周期函数
    shouldComponentUpdate(nextProps, nextState){
        console.log('App shouldComponentUpdate')        
    }  
    //生命周期函数
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('App getSnapshotBeforeUpdate')
    }  
    //生命周期函数
    componentDidUpdate(prevProps, prevState,snapshot){
        console.log('App componentDidUpdate')
    }
    //生命周期函数
    componentWillUnmount(){
        console.log('App componentWillUnmount')
    }
    //生命周期函数      
    render(){
        console.log('App render')
        return (
            <li
                onClick = {this.props.handleDel}
            >
                {this.props.task}
            </li>
        )
    }
}
Item.propTypes = {
    // task:PropTypes.string,//task的类型是字符串
    task:PropTypes.string.isRequired,//task的类型是字符串并且必须传到prop上,如果给他设置了默认值，就找默认值
    handleDel:PropTypes.func
};
Item.defaultProps = {
    task : 'learn React ...'
}
export default Item;