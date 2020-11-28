/*
* @Author: Chen
* @Date:   2020-08-01 16:44:25
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-01 16:53:57
*/
import React,{ Component,Fragment } from 'react'
import { Alert,Button } from 'antd'
import './index.css'

import { 
	Link ,
} from "react-router-dom"


//容器组件
class Err extends Component{
	render(){
 		return (
			<div className="Err">
				<Alert
			      message="Not Found!!"
			      description="您请求的页面走丢啦,请确认地址是否正确!!!"
			      type="error"
			      showIcon
			    />
			    <Link to = ""><Button type="link">返回首页</Button></Link>
			</div>
		)
	}
}

export default Err