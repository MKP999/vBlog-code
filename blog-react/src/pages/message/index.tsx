import React, { useState, useEffect } from 'react'
import { Divider, Row, Col, BackTop, Pagination, message, Modal } from "antd";
import { MessageOutlined, UpCircleOutlined } from '@ant-design/icons';
import MessageForm from "../../components/MessageForm";
import { timestampToTime } from "../../util/time";

import './index.scss'
import { getMessagesList, addMessage, addMessageComment, deleteMessage } from "../../server/messageApi";

const index = () => {

        const blog_Info = localStorage.getItem('blog_Info')
        const role = blog_Info ? JSON.parse(blog_Info).role : ''

        const [ messages, setMessage ] = useState([])
        const [ total, setTotal ] = useState(0)
        const [ page, setPage ] = useState(1)
        const [ messageId, setMessageId ] = useState('')

        const [visible, setVisible] = useState(false)
        const [confirmLoading, setConfirmLoading] = useState(false)

        useEffect(() => {
            getData()
        }, [page])

        // 请求数据 全部留言
        const getData = () => {
            const params = {
                page,
                limit: 10
            }
            getMessagesList(params).then(res => {
                res.data.data.forEach((item: Object) =>{
                    item.avatar = `http://q1.qlogo.cn/g?b=qq&nk=${item.email.slice(0, -7)}&s=100`
                    item.reply = false
                    item.comments.forEach((child: Object) => {
                        child.avatar = `http://q1.qlogo.cn/g?b=qq&nk=${child.email.slice(0, -7)}&s=100`
                    })
                })
                setMessage(res.data.data)
                setTotal(res.data.total)
            })
        }

      // 点击回复信息
      const handleReply = (id: string) => {
        setMessageId(id)
        // 拷贝 注意深浅拷贝问题
        const messageClone = [...messages]
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
        const messageClone = [...messages]
        messageClone.forEach(item => {
            item.reply = false
            if (item._id === id) {
                item.reply = false
            }
        })
        setMessage(messageClone)
      }
      
      // 提交留言表单
      const handleSubmit = (value: {name: string, email: string, content: string, type:string}) => {
        const { name, email, content, type } = value
        let params = {}
        let data = {}
        if (type === 'message') {
            //留言
            data = {
                name,
                email,
                content
            }
            addMessage(data).then(res => {
                if (res.data.success) {
                    message.success('留言成功')
                    setPage(1)
                    getData()
                }
            })
        } else {
            // 评论 
            params = { id: messageId }
            data = {
                name,
                email,
                content
            }
            addMessageComment(params, data).then(res => {
                getData()
            })
        }
      }

      // 改变页面
      const changePage = (e: number) => {
          setPage(e)
      }

      // 删除留言
      const handleDelete = (id:string) => {
          if (role === 'admin') {
              setMessageId(id)
              setVisible(true)
          }
      }
    
      const handleOk = () => {
        setConfirmLoading(true);
        deleteMessage({id: messageId}).then(res => {
            setVisible(false);
            setConfirmLoading(false);
            getData()
        })
      };
    
      const handleCancel = () => {
        setVisible(false);
      };

    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%', padding: '10px 0'}}>
            <Row>
                <Col span={16} offset={4} style={{borderRadius: '10px' }}>
                {/* 评论区 */}
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>评论</Divider>
                <div className="comment-wrapper">
                        {messages.map(item => {
                            return (
                                // 留言信息
                                <div key={item._id} className="message" onClick={() => handleDelete(item._id)} >
                                    <div className="publish">
                                        <div className="context">
                                            <img src={item.avatar} alt="" className="avatar-img" />
                                            <div className="text">
                                                <span><b style={{fontSize: '18px'}}>{item.name}</b></span>
                                                <p style={{color: '#ccc', paddingRight: '200px', fontSize: '16px'}}>{item.content}</p>
                                            </div>
                                        </div>
                                        <span style={{color: '#848484'}}>{timestampToTime(new Date(item.date).getTime())}</span>
                                        <MessageOutlined className="reply" onClick={() => handleReply(item._id)} />
                                    </div>
                                    {/* 回复表单 */}
                                    {
                                        item.reply ? (
                                        <div style={{padding: '10px 50px', position: 'relative'}}>
                                            <div style={{position: 'absolute', top: '0', right: '50px', cursor: 'pointer', color: '#3dabce'}} onClick={() => handleUnreply(item._id)}>取消发言</div>
                                            <Divider style={{margin: '15px'}} />
                                            <MessageForm type="comment" handleSubmit={handleSubmit} />
                                        </div>) : ''
                                    }
                                    
                                    {/* 评论信息 */}
                                    {item.comments.map(child => {
                                        return (
                                            <div key={child._id} className="comment">
                                                <div className="context">
                                                    <img src={child.avatar} alt="" className="avatar-img" />
                                                    <div className="text">
                                                        <span><b style={{fontSize: '18px'}}>{child.name}</b></span>
                                                        <p style={{color: '#ccc', paddingRight: '200px', fontSize: '16px'}}>{child.content}</p>
                                                    </div>
                                                </div>
                                                <span style={{color: '#848484'}}>{timestampToTime(new Date(child.date).getTime())}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    <div className="paging">
                        <Pagination current={page} total={total} showSizeChanger={false} onChange={(e) => changePage(e)} />
                    </div>
                </div>

                {/* 删除弹出确认框 */}
                <Modal
                    title="提示"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>是否删除该留言</p>
                </Modal>
                {/* 留言区 */}
                <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>留言</Divider>
                 {/* 留言表单 */}
                 <MessageForm  type="message" handleSubmit={handleSubmit} />
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
