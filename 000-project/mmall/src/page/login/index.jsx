import React from 'react';

import './index.scss';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || '/'
		}
	}
	componentWillMount () {
		document.title = '登陆-MMALL ADMIN'
	}
	// 当用户名或者密码发生改变
	onInputChange (e) {
		let inputName 	= e.target.name,
			inputValue 	= e.target.value;
		this.setState({
			[inputName]: inputValue
		})
	}
	// 表单提交
	onSubmit (e) {
		let loginInfo = {
			username: this.state.username,
			password: this.state.password
		},
			checkResult = _user.checkLoginInfo(loginInfo);
		if (checkResult.status) {
			_user.login(loginInfo).then((res) => {
				_mm.setStorage('userInfo', res)
				this.props.history.push(this.state.redirect)
			}, (errMsg) => {
				_mm.errorTips(errMsg)
			})
		}
		else {
			_mm.errorTips(checkResult.msg)
		}			
	}
	// 回车触发提交
	onInputKeyUp (e) {
		if (e.keyCode === 13) {
			this.onSubmit()
		}
	}	
	render () {
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default login-panel">
						<div className="panel-heading">欢迎登陆-MMALL管理系统</div>
						<div className="panel-body">
						   	<div>
							   	<div className="form-group">
							   	    <input 
							   	    	type="text"
							   	    	name="username" 
							   	    	className="form-control" 
							   	    	placeholder="请输入用户名"
							   	    	onKeyUp={ e => this.onInputKeyUp(e) }
							   	    	onChange={ e => this.onInputChange(e)}/>
							   	</div>
							   	<div className="form-group">
							   	    <input 
							   	    	type="password"
							   	    	name="password" 
							   	    	className="form-control" 
							   	    	placeholder="请输入密码"
							   	    	onKeyUp={ e => this.onInputKeyUp(e) } 
							   	    	onChange={ e => this.onInputChange(e)}/>
							   	</div>
							   	<button 
							   		className="btn btn-lg btn-block btn-primary"
							   		onClick={ e => this.onSubmit(e)}>登陆</button>
						   	</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;