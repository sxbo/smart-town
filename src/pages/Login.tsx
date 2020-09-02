import React, {SFC} from 'react';
import '../theme/style/Login.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, KeyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import logo from '../theme/img/logo.svg';
// import {Carousel} from 'antd';
import axios from 'axios';


const Login: SFC = () => {


  const onFinish = (values: any) => {
    const username: string = values.username;
    const password: string = values.password;

    axios({
      method: 'POST',
      url: 'api/sys/login',
      data: {username: username.trim(), password: password.trim()},
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <div className="login-model">
        <div className="login-box">
          <div className="logo-box">
            <img src={logo} alt="logo"/>
            <span>智慧小镇</span>
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign={'right'}
            colon={false}>
            <Form.Item
              label={
                <UserOutlined className="user-icon"/>
              }
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={
                <KeyOutlined className="user-icon"/>
              }
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="remeber-me" name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item className="login-button-form-item">
              <Button className="login-btn" size="large" type="primary" htmlType="submit" shape="circle" icon={<ArrowRightOutlined />}>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
