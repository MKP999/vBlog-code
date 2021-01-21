import React, { useState, useEffect } from 'react'
import { Row, Col, BackTop, List, Avatar, Space, Input, Button, Skeleton, message, Modal, Form } from 'antd';
import { UpCircleOutlined, FolderOpenOutlined, MessageOutlined, LikeOutlined, ClockCircleOutlined, PlusCircleOutlined  } from '@ant-design/icons';
import avatar from "../../public/images/zp.jpg";
import { history, Link } from 'umi'
import { timestampToTime } from "../../util/time";
import { getArticlesList, getArticlesData, getSearch, deleteArticle } from "../../server/blogApi";
import { getStorageFn } from "../../util/storageFn";

import './index.scss'

const index = () => {
    const { Search } = Input;
    const [ listData, setListData ] = useState([])
    const [ data, setData ] = useState({})
    const [ typeList, setTypeList ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ visible, setVisible ] = useState(false)
    const [ deleteId, setdeleteId ] = useState('')
    
    const blog_Info:{role:string} = getStorageFn('blog_Info')
    const role:string = blog_Info ? blog_Info.role : ''

    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        setLoading(true)
        getArticlesList({ page: 1, limit: 10}).then(res => {
            res.data.data.forEach((item: {avatar: string}) => {
                item.avatar = 'http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100'
            })
            setListData(res.data.data)
            setLoading(false)
        })
    }

    interface obj {
        id: number,
        type: string,
        count: number
    }

    useEffect(() => {
        getTypeData()
    }, [])
    const getTypeData = () => {
        getArticlesData().then(res => {
            setData(res.data.data)
            const list:[] = []
            const arr = Object.keys(res.data.data.classify)
            arr.forEach((item, index) => {
                const obj:obj = { 
                    id: index,
                    type: item,
                    count: res.data.data.classify[item]
                }
                list.push(obj)
            })
            setTypeList(list)
        })
    }


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
        getSearch({title: value}).then(res => {
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

    // 点击取消
    const handleCancel = () => {
        setVisible(false)
    }

    // 点击确认
    const handleOk = () => {
        deleteArticle({id: deleteId}).then(res => {
            if (res.data.success) {
                message.success('删除成功')
                setVisible(false)
                getData()
                getTypeData()
            } else {
                message.error('删除失败，请重试!')
            }
        })
    }

    // 删除
    const handleDelete = (id: string) => {
        setVisible(true)
        setdeleteId(id)
    } 

    // 编辑
    const handleUpdate = (id:string) => {
        history.push(`/blog/edite?id=${id}`)
    } 

    // 骨架
    const loadingSkeleton: [] = []
    for (let i = 0; i < 1; i++) {
        loadingSkeleton.push(1)
    }

    // 点击进入文章详情
     const getDetail = (id: string) => {
         console.log(id)
     }

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            <div style={{padding: '15px 0', position: 'relative'}}>
            {role === 'admin' &&  
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                创作中心
            </Button>
        }
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
                                { listData.length === 0 ? 
                                (
                                    <div>
                                        {loadingSkeleton.map(i =>{
                                            return (
                                                <Skeleton key={i}  avatar title={false} loading={loading} paragraph={{ rows: 4 }} active></Skeleton>
                                            )
                                        } )}
                                    </div>
                                ): 
                                (
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
                                                onClick={() => getDetail(item._id)}
                                            >   
                                                    <List.Item.Meta
                                                    avatar={<Avatar src={item.avatar} />}
                                                    title={<Link to={'/blog/detail?id=' + item._id}>{item.title}</Link>}
                                                    description={item.description}
                                                    />
                                                    <div className="list-text">{item.text}</div>
                                            </List.Item>
                                        )}
                                    />
                                )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Modal
                    maskClosable={false}
                    title="删除文章"
                    visible={visible}
                    onOk={handleOk}
                    okText="删除文章"
                    cancelText="取消"
                    onCancel={handleCancel}
                    forceRender={true}
                >   

                    <Form>
                        <Form.Item>
                            <p>是否确认删除该文章{deleteId}</p>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right'}} loading={loading} 
                            onClick={() => handleOk()}>
                                删除文章
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
