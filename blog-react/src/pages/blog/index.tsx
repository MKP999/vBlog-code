import React from 'react'
import { Row, Col, BackTop, List, Avatar, Space, Input, Button } from 'antd';
import { UpCircleOutlined, FolderOpenOutlined, MessageOutlined, LikeOutlined, StarOutlined, PlusCircleOutlined  } from '@ant-design/icons';
import avatar from "../../public/images/zp.png";
import { history } from 'umi'

import './index.scss'

const index = () => {
    const { Search } = Input;
    const listData = [];
    for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
    }

    const IconText = (item: { icon: any, text: any }) => (
    <Space>
        {React.createElement(item.icon)}
        {item.text}
    </Space>
    )
    
    // 搜索
    const onSearch = (value: String) => console.log(value)

    // 点击进去写作中心
    const handleClick = () => {
        history.push('/blog/edite')
    }

    const typeList = [
        {
            id: 1,
            type: 'js',
            count: '10'
        },
        {
            id: 2,
            type: 'vue',
            count: '15'
        },
        {
            id: 3,
            type: 'react',
            count: '20'
        },
        {
            id: 4,
            type: 'npm',
            count: '25'
        },
        {
            id: 5,
            type: 'php',
            count: '40'
        },
        {
            id: 6,
            type: 'python',
            count: '99'
        }
    ]

    return (
        <div style={{height: '100%' }}>
            <div style={{padding: '15px 0', position: 'relative'}}>
            <Button className="create-center" shape="round" icon={<PlusCircleOutlined />} size="large" onClick={() => handleClick()}>
                创作中心
            </Button>
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
                                            <li><span className="number">111</span> <br/>原创</li>
                                            <li><span className="number">666</span> <br/>评论</li>
                                            <li><span className="number">9999</span> <br/>访问</li>
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
                                                    <li key={item.id}>
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
                                    <div>
                                        <b>ant design</b> footer part
                                    </div>
                                    }
                                    renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        actions={[
                                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                        ]}
                                        extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                        }
                                    >
                                        <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                    )}
                                />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
