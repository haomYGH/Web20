import React, { Children } from 'react'//代码解析
import Header from '@common/header'
import Sider from '@common/sider'
import './index.css'
//引入UI
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
//子UI(引入UI里面的UI)
const { SubMenu } = Menu;
const { Content } = Layout;


const AdminLayout = (props)=>{
    return (
        <Layout>
            <Header />
            <Layout>
                <Sider />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
            </Layout>
            </Layout>
        </Layout>        
    );
}

export default AdminLayout