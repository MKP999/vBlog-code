import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Button, message, Modal, Radio, Form } from 'antd';
import './index.scss'
import { LeftOutlined, SendOutlined } from '@ant-design/icons';
import { useHistory, history, Prompt } from "umi";
import hljs from 'highlight.js'
import E from 'wangeditor'

import { addArticle, getArticlesData, getArticle, updateArticle } from "../../server/blogApi";
let editor: any = null
const index = () => {
    const [content, setContent] = useState('')
    const [ titleText, setTitleText ] = useState('')
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [ type, setType ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ tabs, setTabs ] = useState([])
    const [ showPrompt, setShowPrompt ] = useState(true)

    const [ Info, setInfo ] = useState({})

    const [ form ] = Form.useForm()
    const { location } = useHistory()

    useEffect(() => {
        // 注：class写法需要在componentDidMount 创建编辑器
        editor = new E("#editor")
    
        editor.config.onchange = (newHtml: any) => {
          setContent(newHtml)
        }
        // 设置编辑区域高度为 1000px
        editor.config.height = 700
        // 挂载highlight插件
        editor.highlight = hljs
        // 过滤掉复制文本的样式
        editor.config.pasteFilterStyle = false
        // 忽略粘贴的图片
        editor.config.pasteIgnoreImg = true
        /**一定要创建 */
        editor.create()
        
        return () => {
          // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
          editor.destroy()
        }
      }, [])

    // 获取分类个数
    useEffect(() => {
        getArticlesData().then(res => {
            const tabArr:string[] = Object.keys(res.data.data.classify)
            setTabs(tabArr)
        })
    }, [])

    // 获取根据id 所得到的文章详情
    useEffect(() => {
        if (location.query.id) {
            getArticle({id: location.query.id}).then(res => {
                setInfo(res.data.data)
                setTitleText(res.data.data.title)
                setType(res.data.data.type)
                editor.txt.html(res.data.data.content)
                form.setFieldsValue({
                    type: res.data.data.type
                })
            })
        }
  }, [])

        // 返回
        const handleBack = () => {
            history.goBack()
        }

        // 标题输入
        const changeTitle = (e:{target: {value: string}}) => {
            setTitleText(e.target.value)
        }
        // 选择一个类型
        const changeRadio = (e:{ target: {value: string}}) => {
            console.log(e.target.value)
            setType(e.target.value)
            form.setFieldsValue({
                type: e.target.value
            })
        }

        // 编辑类型
        const changeType = (e:{target: {value:string}}) => {
            setType(e.target.value)
            form.setFieldsValue({
                type: e.target.value
            })
        }

        // 发表文章
        const handlePublic = () => {
            if (titleText === '') {
                message.error('标题不能为空!');
                return
            }
            if (content.length < 15) {
                message.error('内容不能少于15个字符!');
                return
            }
            setVisible(true)
        }

        // 发布
        const handleOk = async () => {
            setConfirmLoading(true)
            setLoading(true)
            const data = {
                title: titleText,
                content,
                text: editor.txt.text(),
                type
            }
            let res
            try {
                if (location.query.id) {
                    res = await updateArticle({id: location.query.id}, data)
                } else {
                    res = await addArticle(data)
                }
                console.log(res.data)
                setVisible(false);
                setConfirmLoading(false);
                setLoading(false)
                if (res.data.success) {
                    message.success('发布成功')
                } else {
                    message.error('文章发布失败，请重试!')
                    return
                }
                setShowPrompt(false)
                history.replace('/blog/list')
            } catch (error) {
                setLoading(false)  
            }
          };
        
          const handleCancel = () => {
            setVisible(false);
          };


    return (
        <div style={{minHeight: 'calc(100vh - 114px)', height: '100%', padding: '10px 0'}}>
            { showPrompt && <Prompt message="系统可能不会保存您所做的更改。确定要离开吗？" /> }
            <Row>
                <Col span={22} offset={1}>
                    <div className="blogedite-header">
                        <span className="back-btn" onClick={() => handleBack()}><LeftOutlined style={{fontSize: '22px'}} /> 返回</span>
                        <div className="title-input">
                            <Input placeholder="文章标题" size="large" maxLength={100} bordered={false} value={titleText} onChange={(e) => changeTitle(e)} />
                        </div>
                        <div className="edite-public-btn">
                            <Button  shape="round" icon={<SendOutlined />} size="large" onClick={() => handlePublic()}>
                                发布文章
                            </Button>
                        </div>
                    </div>
                    <div id="editor" ></div>
                </Col>
            </Row>
            {/* 发布弹窗 */}
            <Modal
                    mask={false}
                    maskClosable={false}
                    title="发布文章"
                    visible={visible}
                    onOk={handleOk}
                    okText="发布文章"
                    cancelText="取消"
                    onCancel={handleCancel}
                    confirmLoading={confirmLoading}
                    forceRender={true}
                >   

                    <Form form={form}>
                        <Form.Item
                            label="文章类型"
                            name="type"
                            rules={[{ required: true, message: '请输入新的分类!' }]}
                        >
                            <Input onChange={(e) => changeType(e)} />
                        </Form.Item>
                        <Form.Item>
                            <Radio.Group defaultValue={type} buttonStyle="solid" onChange={(e) => changeRadio(e)}>
                                {tabs.map(item => {
                                    return (
                                        <Radio.Button key={item} value={item}>{item}</Radio.Button>
                                    )
                                })}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{float: 'right'}} loading={loading} 
                            onClick={() => handleOk()}>
                                发布文章
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
        </div>
    )
}

export default index
