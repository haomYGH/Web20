import React from 'react'
//引入路由
import { NavLink,Link,withRouter } from 'react-router-dom'
import './index.css'
//引入UI
import { Layout, Menu,Button } from 'antd';
//引入icon
import { HomeOutlined,UserOutlined,BarsOutlined } from '@ant-design/icons'
//引入子UI
const { Sider } = Layout;
const { SubMenu } = Menu;


const AdminSider = withRouter(({ history }) => {
    // console.log(history.location.pathname);//以/拆分选取第一位/
    /*
        /product/save [product,save]
    */
//    const locationPath = (history.location.pathname).split('/')[1];
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                defaultSelectedKeys={['/']}
                selectedKeys={[history.location.pathname]}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="/">
                    <NavLink exact to="/"><HomeOutlined /> 首页</NavLink>
                </Menu.Item>
                <Menu.Item key="/user">
                    <NavLink exact to="/user"><UserOutlined /> 用户列表</NavLink>
                </Menu.Item>
                <Menu.Item key="/category">
                    <NavLink exact to="/category"><BarsOutlined /> 分类管理</NavLink>
                </Menu.Item>
                <Menu.Item key="/product">
                    <NavLink exact to="/product"><BarsOutlined /> 商品管理</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
})
export default AdminSider