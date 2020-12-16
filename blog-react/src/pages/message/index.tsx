import React, { useState, useEffect } from 'react'
import { Divider, Row, Col, BackTop, Pagination } from "antd";
import { MessageOutlined, UpCircleOutlined } from '@ant-design/icons';
import MessageForm from "../../components/MessageForm";
import './index.scss'

const index = () => {
        const [ message, setMessage ] = useState(
            [
                {
                    "_id": "5fd8311d1056018",
                    "name": "111",
                    "email": "111@qq.com",
                    "avatar": "http://q1.qlogo.cn/g?b=qq&nk=739237564&s=100",
                    "content": "设计费韩发叫法是~~快捷发布寄回去外交部福!!!建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                    "date": "2020-12-15T03:44:29.051Z",
                    "reply": false,
                    "comment": [
                        {
                            "_id": "5fd8311d6914f8421a018",
                            "name": "111",
                            "email": "111@qq.com",
                            "avatar": "http://q1.qlogo.cn/g?b=qq&nk=111&s=100",
                            "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                            "date": "2020-12-15T03:44:29.051Z",
                            "__v": 0
                        },
                        {
                            "_id": "5fd8311d108421a018",
                            "name": "111",
                            "email": "111@qq.com",
                            "avatar": "http://q1.qlogo.cn/g?b=qq&nk=111&s=100",
                            "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                            "date": "2020-12-15T03:44:29.051Z",
                            "__v": 0
                        }
                    ],
                    "__v": 0
                },
                {
                    "_id": "5fd8311d10568421a018",
                    "name": "111",
                    "email": "111@qq.com",
                    "avatar": "http://q1.qlogo.cn/g?b=qq&nk=3524432510&s=100",
                    "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                    "date": "2020-12-15T03:44:29.051Z",
                    "reply": false,
                    "comment": [
                        {
                            "_id": "5fd8311d108421a018",
                            "name": "111",
                            "email": "111@qq.com",
                            "avatar": "http://q1.qlogo.cn/g?b=qq&nk=111&s=100",
                            "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                            "date": "2020-12-15T03:44:29.051Z",
                            "__v": 0
                        }
                    ],
                    "__v": 0
                },
                {
                    "_id": "5fd8311056914f8421a018",
                    "name": "111",
                    "email": "111@qq.com",
                    "avatar": "http://q1.qlogo.cn/g?b=qq&nk=111&s=100",
                    "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                    "date": "2020-12-15T03:44:29.051Z",
                    "reply": false,
                    "comment": [],
                    "__v": 0
                },
                {
                    "_id": "5fd8311d10564f8421a018",
                    "name": "111",
                    "email": "111@qq.com",
                    "avatar": "http://q1.qlogo.cn/g?b=qq&nk=321&s=100",
                    "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                    "date": "2020-12-15T03:44:29.051Z",
                    "reply": false,
                    "comment": [],
                    "__v": 0
                },
                {
                    "_id": "5fd8311d1056914f421a018",
                    "name": "111",
                    "email": "111@qq.com",
                    "avatar": "http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100",
                    "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                    "date": "2020-12-15T03:44:29.051Z",
                    "reply": false,
                    "comment": [
                        {
                            "_id": "5fd8311d1056914f841a018",
                            "name": "111",
                            "email": "111@qq.com",
                            "avatar": "http://q1.qlogo.cn/g?b=qq&nk=3524432510&s=100",
                            "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                            "date": "2020-12-15T03:44:29.051Z",
                            "__v": 0
                        },
                        {
                            "_id": "5fd8311d1056914f8421a01",
                            "name": "111",
                            "email": "111@qq.com",
                            "avatar": "http://q1.qlogo.cn/g?b=qq&nk=993646298&s=100",
                            "content": "设计费韩发叫法是快捷发布寄回去外交部福建空气爱别人凤凰居全国千方百计卡刷包罚款卷社区发表接口全部放假看不起谁",
                            "date": "2020-12-15T03:44:29.051Z",
                            "__v": 0
                        }
                    ],
                    "__v": 0
                }
              ]
        )

      // 点击回复信息
      const handleReply = (id: string) => {
        console.log(id)
        // 拷贝 注意深浅拷贝问题
        const messageClone = [...message]
        messageClone.forEach(item => {
            item.reply = false
            if (item._id === id) {
                item.reply = true
            }
        })
        setMessage(messageClone)
      }

      // 取消发言
      const handleUnreply = (id: string) => {
        const messageClone = [...message]
        messageClone.forEach(item => {
            item.reply = false
            if (item._id === id) {
                item.reply = false
            }
        })
        setMessage(messageClone)
      }

    return (
        <div style={{height: '100%', padding: '10px 0'}}>
            <Row>
                <Col span={16} offset={4} style={{borderRadius: '10px' }}>
                {/* 评论区 */}
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>评论</Divider>
                <div className="comment-wrapper">
                        {message.map(item => {
                            return (
                                // 留言信息
                                <div key={item._id} className="message">
                                    <div className="publish">
                                        <div className="context">
                                            <img src={item.avatar} alt="" className="avatar-img" />
                                            <div className="text">
                                                <span><b style={{fontSize: '18px'}}>{item.name}</b></span>
                                                <p style={{color: '#ccc', paddingRight: '200px', fontSize: '16px'}}>{item.content}</p>
                                            </div>
                                        </div>
                                        <span style={{color: '#848484'}}>{item.date}</span>
                                        <MessageOutlined className="reply" onClick={() => handleReply(item._id)} />
                                    </div>
                                    {/* 回复表单 */}
                                    {
                                        item.reply ? (
                                        <div style={{padding: '10px 50px', position: 'relative'}}>
                                            <div style={{position: 'absolute', top: '0', right: '50px', cursor: 'pointer', color: '#3dabce'}} onClick={() => handleUnreply(item._id)}>取消发言</div>
                                            <Divider style={{margin: '15px'}} />
                                            <MessageForm />
                                        </div>) : ''
                                    }
                                    
                                    {/* 评论信息 */}
                                    {item.comment.map(child => {
                                        return (
                                            <div key={child._id} className="comment">
                                                <div className="context">
                                                    <img src={child.avatar} alt="" className="avatar-img" />
                                                    <div className="text">
                                                        <span><b style={{fontSize: '18px'}}>{child.name}</b></span>
                                                        <p style={{color: '#ccc', paddingRight: '200px', fontSize: '16px'}}>{child.content}</p>
                                                    </div>
                                                </div>
                                                <span style={{color: '#848484'}}>{child.date}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    <div className="paging">
                        <Pagination defaultCurrent={1} total={100} showSizeChanger={false} />
                    </div>
                </div>
                {/* 留言区 */}
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>留言</Divider>
                 {/* 留言表单 */}
                 <MessageForm />
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
