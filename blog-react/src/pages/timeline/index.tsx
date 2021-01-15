import React, { useState, useEffect } from 'react'
import { Timeline, Row, Col, BackTop, Divider, Button, Form, Modal, Input, Spin } from 'antd';
import { UpCircleOutlined, PlusCircleOutlined, BankOutlined, BgColorsOutlined } from '@ant-design/icons';
import './index.scss'
import { timestampToTime } from "../../util/time";

import { getTimelineList, addTimeline } from "../../server/timelineApi";
import { getStorageFn } from "../../util/storageFn";
import { timelineItem } from "../../util/interface";

const index = () => {
    const blog_Info:{role:string} = getStorageFn('blog_Info')
    const role:string = blog_Info ? blog_Info.role : ''

    const [ timeData, setTimeData ] = useState([])
    const [visible, setVisible] = useState(false)
    const [ loading, setLoading ] = useState(false)


    useEffect(() => {
        getData()
    }, [])

    // 获取数据
    const getData = () => {
        getTimelineList().then(res => {
            setTimeData(res.data.data)
        })
    }

    // 打开添加时光轴弹窗
    const handleClick = () => {
        if (role === 'admin') {
            setVisible(true)
        }
      }

      // 点击确认添加
      const onFinish = (values: object) => {
        setLoading(true)
        addTimeline(values).then(res => {
            setVisible(false);
            setLoading(false);
            getData()
        })
      }
  
    // 取消
    const handleCancel = () => {
      setVisible(false);
    };

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%', padding: '15px 0'}}>
            {role === 'admin' &&
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()} />
                }
            {/* 添加弹窗 */}
            <Modal
                    title="添加故事线"
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
                            rules={[{ required: true, message: '请输入标题！' }]}
                        >
                            <Input prefix={<BankOutlined className="site-form-item-icon" />} maxLength={50} placeholder="故事标题" />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            rules={[{ required: true, message: '请输入内容！' }]}
                        >
                            <Input.TextArea placeholder="故事内容"/>
                        </Form.Item>
                        <Form.Item
                            name="color"
                            rules={[{ required: true, message: '请输入颜色！' }]}
                        >
                            <Input prefix={<BgColorsOutlined className="site-form-item-icon" />} maxLength={50} placeholder="颜色" />
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right'}} loading={loading}>
                            确认
                        </Button>
                    </Form.Item>

                    </Form>
                </Modal>

            <Row>
                <Col span={20} offset={2}>
                {timeData.length === 0 ? <div className="loading-box"><Spin style={{color: '#001529'}} size="large" /></div> : 
                (
                    <Timeline mode="alternate" className="timeline-wrapper">
                        {timeData.map((item: timelineItem) => {
                            return (
                                <Timeline.Item key={item._id} color={item.color}>
                                    <div className="header">
                                        <div className="title">{item.title}</div> 
                                        <span style={{color: '#ccc', float: 'right'}}>{timestampToTime(new Date(item.date).getTime())}</span>
                                        <Divider />
                                        <p style={{textIndent: '2em', fontFamily: 'inherit', fontSize: '16px'}}>{item.content}</p>
                                    </div>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                )}
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
