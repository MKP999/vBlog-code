import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message, Modal, Form, Input, Spin } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { PlusCircleOutlined, BankOutlined, HeatMapOutlined, BranchesOutlined, FileTextOutlined } from '@ant-design/icons';

import './index.scss'
import { getStorageFn } from "../../util/storageFn"
import { blogRollItem } from "../../util/interface"

import { getBlogrollList, updateBlogroll, addBlogroll } from "../../server/blogrollApi";


const index = () => {
    const blog_Info:{role:string} = getStorageFn('blog_Info')
    const role:string = blog_Info ? blog_Info.role : ''

    const { Meta } = Card;
    const [ loading, setLoading ] = useState(false)
    const [ info, setInfo ] = useState({})
    const [ list, setList ] = useState([])
    const [ checklist, setCheckList ] = useState([])

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    // 获取数据
    const getData = () => {
        getBlogrollList().then(res => {
            console.log(res.data)
            const list1: [] = []
            const list2: [] = []
            res.data.data.forEach((item: {type: number}) => {
                if (item.type === 0) {
                    list2.push(item)
                } else {
                    list1.push(item)
                }
            })
            setList(list1)
            setCheckList(list2)
            setLoading(false)
        })
    }

    // 获取需要修改的友链 id
    const handleUpdate = (item:object) => {
        setInfo(item)
    }

    // 确认通过审核
    const confirm = () => {
        if (role === 'admin') {
            updateBlogroll({id: info._id}).then(res => {
                if (res.data.success) {
                    message.success(`${info.title}(${info._id})通过审核`);
                    getData()
                } else {
                    message.error('审核失败，请重试~');
                }
            })
        } else {
            message.error('抱歉，你没有该权限~');
        }
      }
      
      const cancel = () => {
        return
      }

      // 打开添加友链弹窗
      const handleClick = () => {
        if (role === 'admin') {
            setVisible(true)
        }
      }

      // 点击确认添加
      const onFinish = (values: object) => {
        console.log(values)
        setLoading(true)
        addBlogroll(values).then(res => {
            setVisible(false);
            setLoading(false);
            getData()
        })
      }
  
    // 取消
    const handleCancel = () => {
      setVisible(false);
    }

    // 点击进入该网站
    const enterUrl = (url:string) => {
        console.log(url)
        window.open(url)
    }

    return (
        <div className="blog-roll-page" style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                添加链接
            </Button>
            {/* 添加弹窗 */}
            <Modal
                    title="添加友链"
                    visible={visible}
                    okText="确认"
                    cancelText="取消"
                    onCancel={handleCancel}
                    maskClosable={false}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: '请输入网站名！' }]}
                        >
                            <Input prefix={<BankOutlined className="site-form-item-icon" />} maxLength={50} placeholder="网站名" />
                        </Form.Item>
                        <Form.Item
                            name="avatar"
                            rules={[{ required: true, message: '请输入网站logo！' }]}
                        >
                            <Input prefix={<HeatMapOutlined className="site-form-item-icon" />} placeholder="LOGO" />
                        </Form.Item>
                        <Form.Item
                            name="url"
                            rules={[{ required: true, message: '请输入网站地址！' }]}
                        >
                            <Input prefix={<BranchesOutlined className="site-form-item-icon" />} placeholder="网站地址" />
                        </Form.Item>
                        <Form.Item
                            name="describe"
                            rules={[{ required: true, message: '请输入网站描述！' }]}
                        >
                            <Input prefix={<FileTextOutlined className="site-form-item-icon" />} maxLength={50} placeholder="网站描述" />
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right'}} loading={loading}>
                            确认
                        </Button>
                    </Form.Item>

                    </Form>
                </Modal>
            <PageWrapper>
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>友情链接</Divider>
                {list.length === 0 ? <div className="loading-box"><Spin size="large" /></div> : 
                (
                    <Row gutter={16} style={{padding: '10px'}}>
                    {list.map((item:blogRollItem) => {
                        return (
                            <Col key={item._id} span={8}>
                                <Card style={{ width: '100%', marginTop: 16, cursor: 'pointer'}} onClick={() => enterUrl(item.url)}>
                                    <Skeleton loading={loading} avatar active>
                                        <Meta
                                            avatar={
                                            <Avatar src={item.avatar} />
                                            }
                                            title={item.title}
                                            description={item.describe}
                                        />
                                    </Skeleton>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                )}
                
            </PageWrapper>
            <PageWrapper>
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>审批中</Divider>
                {list.length === 0 ? <div className="loading-box"><Spin size="large" /></div> : 
                (
                <Row gutter={16} style={{padding: '10px'}}>
                    {checklist.map((item:blogRollItem) => {
                        return (
                            <Col key={item._id} span={8}>
                                <Popconfirm
                                    title="请确认该友链通过审核吗"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="确定"
                                    cancelText="取消"
                                    >
                                    <Card style={{ width: '100%', marginTop: 16 }} onClick={() => handleUpdate(item)}>
                                        <Skeleton loading={loading} avatar active>
                                            <Meta
                                                avatar={
                                                <Avatar src={item.avatar} />
                                                }
                                                title={item.title}
                                                description={item.describe}
                                            />
                                        </Skeleton>
                                    </Card>
                                </Popconfirm>
                            </Col>
                        )
                    })}
                </Row>)}
            </PageWrapper>
        </div>
    )
}

export default index
