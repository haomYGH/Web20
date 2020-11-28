import React,{ Component } from 'react'
import './style.css'

import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import $ from 'jquery';


class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoaded:false
		}
		//通过jquery在发送请求时携带cookie
		$.ajaxSetup({
			xhrFields: {
		      	withCredentials: true
		   }
		})
	}
	//富文本编辑器option配置项
	toolbar = [
		'title',
		'bold',
		'italic',
		'underline',
		'strikethrough',
		'fontScale',
		'color',
		'ol',          
		'ul',            
		'blockquote',
		'code',         
		'table',
		'link',
		'image',
		'hr',            
		'indent',
		'outdent',
		'alignment',
	]
	componentDidMount(){
		this.editor = new Simditor({
			textarea:this.textarea,//DOM节点
			toolbar:this.toolbar,
			upload:{
				url:this.props.url,
				fileKey:'fileKey'
			}
		})
		this.editor.on('valuechanged',()=>{
			// console.log('富文本变化就打印')
			// console.log(this.editor.getValue());//获取富文本变化后的值
			//将值传递给父组件save.js。目的是当save_edit提交时可以拿到数据
			// this.props.getValues(this.editor.getValue());
			//解决数据回填影响新增页面isLoaded:true
			this.setState({isLoaded:true},()=>{
				this.props.getValues(this.editor.getValue());
			})
		})
	}
	componentDidUpdate(){
		// console.log(this.props.values);//这values跟下面的不太一样
		//这个条件是不是有问题？确实是实现了刷新页面组件第一次加载时，那组件不刷新，他这个isLoaded就一直是true，就不可能走到里面了
		if(this.props.values && !this.state.isLoaded){//设置条件，只有编辑页面能数据回填
			// console.log(this.props.values)
			this.editor.setValue(this.props.values)
			this.setState({
				isLoaded:true
			})
		}
		//所有我现在要实现2个条件：编辑页面数据回填，并且只
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor"></textarea>
		)
	}	
}


export default RichEditor