import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { PlusCircleOutlined  } from '@ant-design/icons';

import './index.scss'


const index = () => {
    const { Meta } = Card;
    const [ loading, setLoading ] = useState(true)
    const [ info, setInfo ] = useState({})

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    const list = [
        {
            id: 1,
            title: 'CSDN - 专业开发者社区',
            avatar: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            describe: 'CSDN 成就一亿技术员',
            url: 'https://www.csdn.net/'
        },
        {
            id: 2,
            title: 'CSDN - 专业开发者社区',
            avatar: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            describe: 'CSDN 成就一亿技术员',
            url: 'https://www.csdn.net/'
        },
        {
            id: 3,
            title: 'CSDN - 专业开发者社区',
            avatar: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            describe: 'CSDN 成就一亿技术员',
            url: 'https://www.csdn.net/'
        },
        {
            id: 4,
            title: 'CSDN - 专业开发者社区',
            avatar: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            describe: 'CSDN 成就一亿技术员',
            url: 'https://www.csdn.net/'
        },
        {
            id: 5,
            title: 'CSDN - 专业开发者社区',
            avatar: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
            describe: 'CSDN 成就一亿技术员',
            url: 'https://www.csdn.net/'
        }
    ]

    const confirm = (e) => {
        console.log(e);
        console.log(info);
        message.success('Click on Yes');
      }
      
      const cancel = (e) => {
        console.log(e);
        console.log(info);
        message.error('Click on No');
      }


      const handleClick = (item) => {
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
                            <Col key={item.id} span={8}>
                                <Card style={{ width: 400, marginTop: 16 }} >
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
                    {list.map(item => {
                        return (
                            <Col key={item.id} span={8}>
                                <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    >
                                    <Card style={{ width: 400, marginTop: 16 }} onClick={() => handleClick(item)} >
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
