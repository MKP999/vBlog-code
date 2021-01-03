import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import FormWrapper from "../../components/FormWrapper";
import { Link, history } from "umi";
import './index.scss'

import { login, getInfo } from "../../server/homeApi";
import { getStorageFn, setStorageFn } from "../../util/storageFn";


const index = () => {
    const [ loading, setLoading ] = useState(false)
      
    // 提交表单
    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true)
        login(values).then((res: {data: {success: Boolean, msg: string, token: string}}) => {
            console.log(res.data)
            if (res.data.success) {
                message.success('登录成功')
                // localStorage.setItem('blog_login', res.data.token)
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
                    <LoginOutlined /> 登录
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
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
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Link to='/' className="login-form-forgot" >忘记密码？</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        登录
                        </Button>
                        <div className="to-register"> 没有账号？ <Link to="/register">马上注册！</Link></div>
                    </Form.Item>
                </Form>
            </FormWrapper>
        </div>
    )
}

export default index
