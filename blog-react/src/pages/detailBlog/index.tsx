import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message, Modal, Form, Input, Spin, Space, List, BackTop, Tag } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { LikeOutlined, MessageOutlined, ClockCircleOutlined, FolderOpenOutlined, UpCircleOutlined, VerifiedOutlined } from '@ant-design/icons';
import { useHistory, Link, history } from "umi";
import './index.scss'
import { timestampToTime } from "../../util/time";

import { getStorageFn } from "../../util/storageFn";
import { getArticle, getLike, addArticleComment } from "../../server/blogApi";


const index = () => {
    const blog_Info = getStorageFn('blog_Info')
    const role = blog_Info ? blog_Info.role : ''
    const { location } = useHistory()

    const [ blogInfo, setBlogInfo ] = useState({})
    const [ liked, setLiked ] = useState(false)
    const [ likeText, setLikeText ] = useState('点赞')
    const [ loading, setLoading ] = useState(false)
    const [ form ] = Form.useForm()

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
            if (blog_Info) {
                const checkLike = res.data.data.like.filter((item: {user: string}) => {
                    return item.user === blog_Info._id
                })
                if (checkLike.length) {
                    setLikeText('已赞')
                    setLiked(true)
                } else {
                    setLikeText('点赞')
                    setLiked(false)
                }
            }
        })
    }

    // 编辑
    const handleUpdate = (id: string) => {
        console.log(id)
        history.push(`/blog/edite?id=${id}`)
    }

    // 点击评论
    let timer = null
    const onFinish = (e:{content:string}) => {
        if (!e.content) {
            message.error('请输入评论内容!')
            return
        }
        // 防抖设置
        clearTimeout(timer)
        timer = setTimeout(() => {
            setLoading(true)
            console.log(e)
            addArticleComment({id: blogInfo._id}, e).then(res => {
                clearTimeout(timer)
                getData()
                setLoading(false)
                form.setFieldsValue({
                    content: ''
                })
            })
        }, 300);
    }

    // 点击点赞 或取消点赞
    const handleLike = () => {
        // 没有登录 无法点赞
        if (blog_Info) {
            // 防抖设置
            clearTimeout(timer)
            timer = setTimeout(() => {
                getLike({id: blogInfo._id}).then(res => {
                    if (liked) {
                        setLikeText('点赞')
                    } else {
                        setLikeText('已赞')
                    }
                    setLiked(!liked)
                    clearTimeout(timer)
                })
            }, 300);
        } else {
            message.error('您需要登录后才点赞。')
        }
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
                        <Row>
                            <Col style={{padding: '10px', width: '100%'}}>
                                <span className="blog-title">{blogInfo.title}</span>
                                <div className="blog-des">
                                    <Tag icon={<VerifiedOutlined />} color="#ff4d4d">
                                        原创
                                    </Tag>
                                        <IconText icon={LikeOutlined} text={blogInfo.like.length} key="list-vertical-like-o" />
                                        <IconText icon={MessageOutlined} text={blogInfo.comments.length} key="list-vertical-message" />
                                        <IconText icon={ClockCircleOutlined} text={timestampToTime(new Date(blogInfo.date).getTime())} key="list-vertical-date" />
                                        <IconText icon={FolderOpenOutlined} text={blogInfo.type} key="list-vertical-type" />
                                    { role === 'admin' && <span onClick={() => handleUpdate(blogInfo._id)} className="update-btn">
                                        编辑
                                    </span>}
                                </div>
                            </Col>
                            {/* <div className="blog-content">
                                {blogInfo.content}
                            </div> */}
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: blogInfo.content}}></div>
                                <Tag icon={<LikeOutlined />} color={liked ? '#cccccc' : '#3490dc'} 
                                style={{fontSize: '16px', padding: '2px 5px', cursor: 'pointer'}} onClick={() => handleLike()} > {likeText}</Tag>
                        </Row>
                        )}
                    </div>
                    
                    {/* 留言板块 */}
                    <div className="blog-detail">
                        {/* 留言输入框 */}
                        <div>
                            { blog_Info ? (<Form form={form}  name="nest-messages" onFinish={onFinish}>
                                <div className="message-input">
                                    <img src={blog_Info.avatar} alt="" className="avatar-img" />
                                    <Form.Item name="content" >
                                        <Input.TextArea rows={4} placeholder="看完文章，有什么想说的吗"/>
                                    </Form.Item>
                                </div>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" loading={loading} className="detailblog-message">
                                        评论
                                    </Button>
                                </Form.Item>
                            </Form>) : (
                                <div className="unlogin-check">
                                    您需要登录后才发布评论。<Link to="/login">点此登录</Link> 
                                </div>
                            )
                            }
                        </div>
                        {/* 留言区 */}
                        {
                            blogInfo.comments && (blogInfo.comments.length ? (blogInfo.comments.map((item:{_id: string,avatar: string, name:string, content: string, date: string}) => {
                                return (
                                    <div className="publish" key={item._id}>
                                    <div className="context">
                                        <img src={item.avatar} alt="" className="avatar-img" />
                                        <div className="text">
                                            <span><b style={{fontSize: '18px'}}>{item.name}</b></span>
                                            <p style={{color: '#333333', paddingRight: '200px', fontSize: '16px'}}>{item.content}</p>
                                        </div>
                                    </div>
                                    <span style={{color: '#848484'}}>{timestampToTime(new Date(item.date).getTime())}</span>
                                </div>
                                )
                            })) : (<div className="uncomment">
                                暂无评论，赶紧发表一下你的看法吧。
                            </div>)
                            )
                        }
                           
                        </div>
                        
                </Col>
            </Row>
            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
