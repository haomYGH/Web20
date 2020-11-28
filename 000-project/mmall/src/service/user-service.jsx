import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User {
	// 用户登陆	
	login (userInfo) {
		return _mm.request({
			type	: 'post',
			url		: '/manage/user/login.do',
			data	: userInfo
		})
	}
	// 验证登陆信息
	checkLoginInfo (loginInfo) {
		let username = $.trim(loginInfo.username),
			password = $.trim(loginInfo.password);
		if (typeof username !== 'string' || username === '') {
			return {
				status: 0,
				msg: '用户名不能为空'
			}
		}
		if (typeof password !== 'string' || password === '') {
			return {
				status: 0,
				msg: '密码不能为空'
			}
		}
		return {
			status: 1,
			msg: '登陆成功'
		}
	}
	// 退出登陆
	logout () {
		return _mm.request({
			type	: 'post',
			url		: '/user/logout.do',
		})
	}
	// 获取用户列表
	getUserList (pageNum) {
		return _mm.request({
			type	: 'post',
			url		: '/manage/user/list.do',
			data	: {
				pageNum: pageNum
			}
		})
	}
}

export default User;