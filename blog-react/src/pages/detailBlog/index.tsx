import React, { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, Col, Row, Divider, Button, Popconfirm, message, Modal, Form, Input, Spin } from 'antd';
import PageWrapper from "../../components/PageWrapper"
import { PlusCircleOutlined, MailOutlined, BankOutlined, HeatMapOutlined, BranchesOutlined, FileTextOutlined } from '@ant-design/icons';

import './index.scss'

import { getArticle } from "../../server/blogApi";


const index = () => {
    
    const blog_Info = localStorage.getItem('blog_Info')
    const role = blog_Info ? JSON.parse(blog_Info).role : ''

    const [ list, setList ] = useState([])

    useEffect(() => {
        getData()
    }, [])

    // 获取数据
    const getData = () => {
        
    }

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%'}}>
            {/* <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                添加链接
            </Button> */}
            <PageWrapper>
                {list.length === 0 ? <div className="loading-box"><Spin size="large" /></div> : 
                (
                <Row gutter={16} style={{padding: '10px'}}>
                    111
                </Row>)}
            </PageWrapper>
        </div>
    )
}

export default index
