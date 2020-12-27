import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { PlusCircleOutlined  } from '@ant-design/icons';

import './index.scss'

import { getBlogrollList, updateBlogroll } from "../../server/blogroll";


const index = () => {
    
    const blog_Info = localStorage.getItem('blog_Info')
    const role = blog_Info ? JSON.parse(blog_Info).role : ''

    const { Meta } = Card;
    const [ loading, setLoading ] = useState(true)
    const [ info, setInfo ] = useState({})
    const [ list, setList ] = useState([])
    const [ checklist, setCheckList ] = useState([])

    useEffect(() => {
        getData()
    }, [])

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


      const handleClick = (item: object) => {
          console.log('item', item)
          setInfo(item)
      }
    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                添加链接
            </Button>
            <PageWrapper>
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>友情链接</Divider>
                <Row gutter={16} style={{padding: '10px'}}>
                    {list.map(item => {
                        return (
                            <Col key={item._id} span={8}>
                                <Card style={{ width: '100%', marginTop: 16 }} >
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
            </PageWrapper>
            <PageWrapper>
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>审批中</Divider>
                <Row gutter={16} style={{padding: '10px'}}>
                    {checklist.map(item => {
                        return (
                            <Col key={item._id} span={8}>
                                <Popconfirm
                                    title="请确认该友链通过审核吗"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="确定"
                                    cancelText="取消"
                                    >
                                    <Card style={{ width: '100%', marginTop: 16 }} onClick={() => handleClick(item)} >
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
                </Row>
            </PageWrapper>
        </div>
    )
}

export default index
