import React, {SFC} from 'react';
import '../theme/style/Login.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, KeyOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import logo from '../theme/img/logo.svg';
// import {Carousel} from 'antd';


const Login: SFC = () => {


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="login-model">
        <div className="login-box">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign={'right'}
            colon={false}>
            <Form.Item
              label={
                <UserOutlined />
              }
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={
                <KeyOutlined />
              }
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="remeber-me" name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
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
