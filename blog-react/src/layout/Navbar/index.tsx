import React from 'react'
import { Layout, Menu, Space, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { HomeOutlined, UnorderedListOutlined, PlayCircleOutlined, CalendarOutlined, LinkOutlined, FieldTimeOutlined, DingtalkOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'umi'
import './index.scss'

const index = (props: { children: React.ReactNode }) => {
    const { location } = useHistory()
    console.log('location => ', location)
    // 匹配路径
    // const matchUrl = (url) => {
    //     const 
    // }
    return (
        <Layout className="layout">
            <div className="header-replace"></div>
            <Header>
                <div className="navigation">
                    <div className="logo">
                        BLOG
                    </div>
                    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                        <Menu.Item key="/home" icon={<HomeOutlined />}>
                            <Link to='/home' >首页</Link>
                        </Menu.Item>
                        <Menu.Item key="/blog/list" icon={<UnorderedListOutlined />}>
                            <Link to='/blog/list' >博客</Link>
                        </Menu.Item>
                        <Menu.Item key="/production" icon={<PlayCircleOutlined />}>
                            <Link to='/production' >作品</Link>
                        </Menu.Item>
                        <Menu.Item key="/message" icon={<CalendarOutlined />}>
                            <Link to='/message' >留言板</Link>
                        </Menu.Item>
                        <Menu.Item key="/blogroll" icon={<LinkOutlined />}>
                            <Link to='/blogroll' >友情链接</Link>
                        </Menu.Item>
                        <Menu.Item key="/timeline" icon={<FieldTimeOutlined />}>
                            <Link to='/timeline' >时光轴</Link>
                        </Menu.Item>
                        <Menu.Item key="/joke" icon={<DingtalkOutlined />}>
                            <Link to='/joke' >每日段子</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="user-operation">
                    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                        <Menu.Item key="/login" icon={<LoginOutlined />}>
                            <Link to='/login' >登录</Link>
                        </Menu.Item>
                        <Menu.Item key="/register" icon={<UserAddOutlined />}>
                            <Link to='/register' >注册</Link>
                        </Menu.Item>
                    </Menu>
                </div>

            </Header>
            <Content className="content-warpper">
                {props.children}
            </Content>
            <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>Ant Design ©2020 Created by MKP</Footer>
        </Layout>
    )
}

export default index
