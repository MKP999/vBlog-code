import React from 'react'
import { Layout, Menu, Button, Dropdown } from 'antd';
const { Header, Content, Footer } = Layout;
import { HomeOutlined, UnorderedListOutlined, PlayCircleOutlined, CalendarOutlined, LinkOutlined, FieldTimeOutlined, DingtalkOutlined, LoginOutlined, UserAddOutlined, UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory, history } from 'umi'
import './index.scss'
import { getStorageFn, removeStorageFn } from "../../util/storageFn";
import logo from "../../../public/static/Ckp.jpg";

const index = (props: { children: React.ReactNode }) => {
    const { location } = useHistory()

    // 获取用户信息
    const blog_Info:{username: string} = getStorageFn('blog_Info')
    const name:string = blog_Info ? blog_Info.username : ''

    const blogLogin:string | boolean = getStorageFn('blog_login')

    // 点击出现退出登录
    const menu = (
        <Menu>
          <Menu.Item>
            <Button onClick={() => logout()}><LogoutOutlined /> 退出登录</Button>
          </Menu.Item>
        </Menu>
      )

      const logout = ():void => {
          removeStorageFn('blog_Info')
          removeStorageFn('blog_login')
          history.push('/home')
      }

      // 退出登录

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
                        <img src={logo} alt="" className="img" />
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
                        {blogLogin ? (
                            <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={['click']}>
                                <span style={{cursor: 'pointer'}}><UserOutlined /> {name} <DownOutlined style={{fontSize: '10px'}} /></span>
                          </Dropdown>
                        ) : (
                            <>
                                <Menu.Item key="/login" icon={<LoginOutlined />}>
                                    <Link to='/login' >登录</Link>
                                </Menu.Item>
                                <Menu.Item key="/register" icon={<UserAddOutlined />}>
                                    <Link to='/register' >注册</Link>
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                </div>

            </Header>
                <Content className="content-warpper">
                    {props.children}
                </Content>
            <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
                Copyright ©2020 <a target="_blank" href="http://www.fsakp.top" style={{color:'#fff'}}>www.fsakp.top</a> All Rights Reserved. <br/>
                <img src="http://www.beian.gov.cn/img/new/gongan.png" alt=""/> 备案号 : <a target="_blank" href="https://beian.miit.gov.cn">粤ICP备2021011159号-1 </a> 
            </Footer>
        </Layout>
    )
}

export default index
