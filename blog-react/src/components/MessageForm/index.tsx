import React from 'react'
import { Input, Form, Button } from "antd";
import './index.scss'


const index = () => {
    const { TextArea } = Input

    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }


    return (
        <div className="message-wrapper">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label=""
                        name="name"
                        style={{display: 'inline-block', width: '50%', paddingRight: '10px' }}
                        rules={[{ required: true, message: '亲, 您忘记取名啦~' }]}
                    >
                        <Input size="large" placeholder="为自己取个名字吧！" />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="email"
                        style={{display: 'inline-block', width: '50%'}}
                        rules={[
                            {
                                type: 'email',
                                message: '亲, 这真的是您的邮箱吗？格式不对哦！',
                            },
                            {
                                required: true,
                                message: '亲, 您忘记填邮箱地址啦~',
                            },
                            ]}
                    >
                        <Input size="large" placeholder="请填写您正确的邮箱哦~（最好是qq邮箱）" />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="username"
                        rules={[{ required: true, message: '亲, 您忘记填写内容啦~' }]}
                    >
                        <TextArea rows={4} placeholder="有什么想对站长说的呢~" />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{background: '#fff', color: '#000', float: 'right'}} htmlType="submit">
                            发言
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}

export default index
