import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, UserAddOutlined, MailOutlined, WechatOutlined, PhoneOutlined } from '@ant-design/icons';
import FormWrapper from "../../components/FormWrapper";
import { Link } from "umi";
import './index.scss'

const index = () => {
      
    const onFinish = (values: any) => {
        console.log('Success:', values);
    }

    return (
        <div style={{height: 'calc(100vh - 114px)'}}>
            <FormWrapper>
                <div className="login-title">
                    <UserAddOutlined /> 注册
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名(3~12位)" />
                    </Form.Item>
                    <Form.Item
                        name="eamil"
                        rules={[{ required: true, message: '请输入邮箱！' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
                    </Form.Item>
                    <Form.Item
                        name="wechat"
                        rules={[{ required: true, message: '请输入微信！' }]}
                    >
                        <Input prefix={<WechatOutlined className="site-form-item-icon" />} placeholder="微信" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: '请输入有手机号码！' }]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号码" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入有密码！' }]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                        </Button>
                        <div className="to-register"> 有账号 <Link to="/login">直接登录！</Link></div>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </div>
    )
}

export default index
