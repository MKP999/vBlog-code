import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message, Modal, Form, Input, Spin, Space, List  } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { LikeOutlined, MessageOutlined, ClockCircleOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useHistory } from "umi";
import './index.scss'
import { timestampToTime } from "../../util/time";


import { getArticle } from "../../server/blogApi";


const index = () => {
    
    const blog_Info = localStorage.getItem('blog_Info')
    const role = blog_Info ? JSON.parse(blog_Info).role : ''
    const { location } = useHistory()

    const [ blogInfo, setBlogInfo ] = useState({})

    const IconText = (item: { icon: any, text: any }) => (
        <Space>
            {React.createElement(item.icon)}
            {item.text}
            <Divider type="vertical" />
        </Space>
        )

    useEffect(() => {
        getData()
    }, [])

    // 获取数据
    const getData = () => {
        const id = location.query.id
        getArticle({id}).then(res => {
            console.log(res.data)
            setBlogInfo(res.data.data)
        })
    }

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            {/* <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                添加链接
            </Button> */}
             <Row>
                <Col span={16} offset={4} >
                    <div className="blog-detail">
                        {JSON.stringify(blogInfo) === '{}' ? <div className="loading-box"><Spin size="large" /></div> : 
                        (
                        <Row style={{padding: '10px'}}>
                            <div>
                                <span className="blog-title">{blogInfo.title}</span>
                                <List.Item>
                                    <IconText icon={LikeOutlined} text={blogInfo.like.length} key="list-vertical-like-o" />
                                    <IconText icon={MessageOutlined} text={blogInfo.comments.length} key="list-vertical-message" />
                                    <IconText icon={ClockCircleOutlined} text={timestampToTime(new Date(blogInfo.date).getTime())} key="list-vertical-message" />
                                    <IconText icon={FolderOpenOutlined} text={blogInfo.type} key="list-vertical-message" />
                                </List.Item>
                            </div>
                            <Divider />
                            {blogInfo.content}
                        </Row>
                        )}
                    </div>
                    {/* 留言板块 */}
                    <div className="blog-detail">
                        <div className="publish">
                            <div className="context">
                                    <img src="" alt="" className="avatar-img" />
                                    <div className="text">
                                        <span><b style={{fontSize: '18px'}}>K.P</b></span>
                                        <p style={{color: '#ccc', paddingRight: '200px', fontSize: '16px'}}>6666</p>
                                    </div>
                                </div>
                                <span style={{color: '#848484'}}>2020-12-31 00:00:00</span>
                            </div>
                        </div>
                </Col>
            </Row>
        </div>
    )
}

export default index
