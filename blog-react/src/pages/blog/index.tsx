import React, { useState, useEffect } from 'react'
import { Row, Col, BackTop, List, Avatar, Space, Input, Button } from 'antd';
import { UpCircleOutlined, FolderOpenOutlined, MessageOutlined, LikeOutlined, ClockCircleOutlined, PlusCircleOutlined  } from '@ant-design/icons';
import avatar from "../../public/images/zp.png";
import { history } from 'umi'
import { timestampToTime } from "../../util/time";
import { getArticlesList, getArticlesData, getSearch } from "../../server/blogApi";

import './index.scss'

const index = () => {
    const { Search } = Input;
    const [ listData, setListData ] = useState([])
    const [ data, setData ] = useState({})
    const [ typeList, setTypeList ] = useState([])

    const blog_Info = localStorage.getItem('blog_Info')
    const role = blog_Info ? JSON.parse(blog_Info).role : ''

    useEffect(() => {
        getArticlesList({ page: 1, limit: 10}).then(res => {
            res.data.data.forEach((item: {avatar: string}) => {
                item.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100'
            })
            setListData(res.data.data)
        })
    }, [])

    useEffect(() => {
        getArticlesData().then(res => {
            console.log(res.data)
            setData(res.data.data)
            const list = []
            const arr = Object.keys(res.data.data.classify)
            arr.forEach((item, index) => {
                const obj = { 
                    id: index,
                    type: item,
                    count: res.data.data.classify[item]
                }
                list.push(obj)
            })
            setTypeList(list)
        })
    }, [])


    const IconText = (item: { icon: any, text: any }) => (
    <Space>
        {React.createElement(item.icon)}
        {item.text}
    </Space>
    )

    // 点击分类类型
    const searchType = (type: string) => {
        getArticlesList({ page: 1, limit: 10, type}).then(res => {
            res.data.data.forEach((item: {avatar: string}) => {
                item.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100'
            })
            setListData(res.data.data)
        })
    }
    
    // 搜索
    const onSearch = (value: String) => {
        console.log(value)
        getSearch({title: value}).then(res => {
            console.log(res.data)
            res.data.data.forEach((item: {avatar: string}) => {
                item.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100'
            })
            setListData(res.data.data)
        })
    }

    // 点击进去写作中心
    const handleClick = () => {
        history.push('/blog/edite')
    }

    // 删除
    const handleDelete = (id: string) => {
        console.log(id, '暂无接口')
    } 

    // 编辑
    const handleUpdate = (id:string) => {
        console.log(id)
        history.push('/blog/edite')
    } 

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            <div style={{padding: '15px 0', position: 'relative'}}>
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                创作中心
            </Button>
                <Row>
                    <Col span={16} offset={4}>
                        <Row gutter={15} style={{position: 'relative'}}>
                            {/* 左侧栏 */}
                            <Col span={6} style={{position: 'sticky', top: '79px', left: '0', height: '0'}}>
                                <div>
                                    {/* 博客 信息 */}
                                    <div style={{background: "#fff", paddingTop: '15px', marginBottom: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,1)', borderRadius: '2px'}}>
                                        <Avatar size={64} src={avatar} style={{marginBottom: '15px', border: '1px solid #eee'}} />
                                        <ul className="blog-data">
                                            <li><span className="number">{data.total}</span> <br/>原创</li>
                                            <li><span className="number">{data.likeNum}</span> <br/>点赞</li>
                                            <li><span className="number">{data.commitNum}</span> <br/>评论</li>
                                        </ul>
                                    </div>
                                    {/* 搜索文章 */}
                                    <Search style={{marginBottom: '15px'}} placeholder="请输入文章标题" onSearch={onSearch} enterButton />
                                    {/* 分类专栏 */}
                                    <div style={{background: "#fff", padding: '10px', boxShadow: '0 2px 10px rgba(0,0,0,1)',  borderRadius: '2px'}}>
                                        <div className="classify-title"><b>分类专栏</b></div>
                                        <ul className="classify">
                                            {typeList.map(item => {
                                                return (
                                                    <li className="type-style" key={item.id} onClick={() => searchType(item.type)}>
                                                        <span><FolderOpenOutlined />{item.type}</span>
                                                        <span style={{color: '#999aaa'}}>{item.count}篇</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            {/* 右侧 */}
                            {/* style={{overflow: "auto", height: 'calc(100vh - 144px)'}} */}
                            <Col span={18} >
                                <div style={{background: "#fff", padding: '10px', boxShadow: '0 2px 10px rgba(0,0,0,1)',  borderRadius: '2px'}}>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                    onChange: page => {
                                        console.log(page);
                                    },
                                    pageSize: 10,
                                    }}
                                    dataSource={listData}
                                    footer={
                                    <div></div>
                                    }
                                    renderItem={item => (
                                    <List.Item
                                        key={item._id}
                                        actions={[
                                        <IconText icon={LikeOutlined} text={item.like.length} key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text={item.comments.length} key="list-vertical-message" />,
                                        <IconText icon={ClockCircleOutlined} text={timestampToTime(new Date(item.date).getTime())} key="list-vertical-message" />,
                                        <IconText icon={FolderOpenOutlined} text={item.type} key="list-vertical-message" />,
                                        ]}
                                        extra={
                                            role === 'admin' ? (
                                                    <div>
                                            <span onClick={() => handleUpdate(item._id)} style={{padding: '4px 6px', cursor: 'pointer'}}>
                                                编辑
                                            </span>
                                            <Button onClick={() => handleDelete(item._id)} style={{padding: '4px 6px'}} type="link" danger>
                                                删除
                                            </Button>
                                        </div>
                                                ) : ''
                                        }
                                    >
                                        <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                    )}
                                />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
