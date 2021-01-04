import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, UserAddOutlined, MailOutlined, WechatOutlined, PhoneOutlined } from '@ant-design/icons';
import FormWrapper from "../../components/FormWrapper";
import { Link, history } from "umi";
import './index.scss'
import { setStorageFn } from "../../util/storageFn";

import { register, getInfo } from "../../server/homeApi";

const index = () => {
    const [ loading, setLoading ] = useState(false)

      // 注册
    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true)
        register(values).then((res: {data: {success: Boolean, msg: string, token: string}}) => {
            console.log(res.data)
            if (res.data.success) {
                message.success('注册成功')
                const params = {
                    name: 'blog_login',
                    value: res.data.token,
                    expires: 1000 * 60 * 60 *24
                }
                setStorageFn(params)
                getUserInfo()
            } else {
                message.error(res.data.msg);
            }
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    // 获取当前用户信息
    const getUserInfo = async () => {
        try {
            const res = await getInfo()
            const params = {
                name: 'blog_Info',
                value: res.data.data,
                expires: 1000 * 60 * 60 *24
            }
            setStorageFn(params)
            history.push('/home')
        } catch (error) {
            console.log(error)
        }
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
                        name="email"
                        rules={[
                            {
                              type: 'email',
                              message: '请输入正确的邮箱',
                            },
                            {
                              required: true,
                              message: '请输入邮箱地址',
                            },
                          ]}
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
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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
