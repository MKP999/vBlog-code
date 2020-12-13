import React from 'react'
import './index.scss'
import { Row, Col, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';


const index = (props: {children: React.ReactNode}) => {
    return (
        <>
          <div className="work-wrapper">
            <Row>
                <Col span={16} offset={4} style={{background:'#001529', borderRadius: '10px' }}>
                  {props.children}
                </Col>
            </Row>

            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
            </div>
        </>
    )
}

export default index
