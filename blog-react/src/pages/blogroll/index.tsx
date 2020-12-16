import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider } from 'antd';
import PageWrapper from "../../components/PageWrapper"


const index = () => {
    const { Meta } = Card;
    const [ loading, setLoading ] = useState(true)

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


    return (
        <div style={{height: 'calc(100vh - 114px)'}}>
            <PageWrapper>
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>友情链接</Divider>
                <Row gutter={16} style={{padding: '10px'}}>
                    {list.map(item => {
                        return (
                            <Col key={item.id} span={8}>
                                <Card style={{ width: 300, marginTop: 16 }} >
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
        </div>
    )
}

export default index
