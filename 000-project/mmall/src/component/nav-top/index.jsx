import React 		from 'react';
import { Link } 	from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class NavTop extends React.Component {
	constructor (props) {
		super(props)
        this.state = {
            username: _mm.getStorage('userInfo') 
                        ? _mm.getStorage('userInfo').username 
                        : ''
        }
	}
    // 退出登录
    onLogout () {
        _user.logout().then(() => {
            _mm.removeStorage('userInfo')
            // this.context.history.push('/login')因为这个组件不是通过Route渲染的所以无法继承route的history属性
            window.location.href = '/login'
        }, (errMsg) => {
            _mm.errorTips(errMsg)
        })
    }
    // 跳转到登陆页
    toLogin () {
       window.location.href = '/login' 
    }
	render () {
		return (
			<nav className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{ this.state.username }</span>
                                : <span>请登录</span>
                            }
                    	   
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            
                            {
                                this.state.username === '' 
                                ? (<a onClick={(e) => this.toLogin(e)} href="javascript:;">
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>点击登录</span>
                                   </a>)

                                : (<a onClick={(e) => this.onLogout(e)} href="javascript:;">
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>退出登录</span>
                                  </a>)
                            }
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
		);
	}
}

export default NavTop;