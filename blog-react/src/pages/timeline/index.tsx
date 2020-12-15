import React from 'react'
import { Timeline, Row, Col, BackTop, Divider  } from 'antd';
import { ClockCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import './index.scss'

const index = () => {
    const timeData = [
        {
            id: 1,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        },
        {
            id: 2,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        },
        {
            id: 3,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        },
        {
            id: 4,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        },
        {
            id: 5,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        },
        {
            id: 6,
            color: 'red',
            title: '创建博客',
            date: '2020-12-01',
            content: 'Create a services site 2015-09-01法律纠纷和萨激发砂进口方安守本分就是咖啡阿双方均卡萨被罚款啊'
        }
    ]
    return (
        <div style={{height: '100%', padding: '15px 0'}}>
            <Row>
                <Col span={20} offset={2}>
                    <Timeline mode="alternate" className="timeline-wrapper">
                        {timeData.map(item => {
                            return (
                                <Timeline.Item key={item.id} color={item.color}>
                                    <div className="header">
                                        <div className="title">{item.title}</div> 
                                        <span style={{color: '#ccc', float: 'right'}}>{item.date}</span>
                                        <Divider />
                                        <p style={{textIndent: '2em', fontFamily: 'inherit'}}>{item.content}</p>
                                    </div>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
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
