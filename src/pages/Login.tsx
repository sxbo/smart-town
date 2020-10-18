import React, {SFC, useState} from 'react';
import '../theme/style/Login.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginActions } from '../features/login';

const Login: SFC = () => {

  const [remind, setRemimnd] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const username: string = values.username;
    const password: string = values.password;

    axios({
      method: 'POST',
      url: 'api/sys/login',
      data: {username: username.trim(), password: password.trim()},
    }).then((res) => {
      if (res.data.status === 200){
        const token = res.data.token;

        if (token && token !== 'undefined'){
          dispatch({type: LoginActions.LOGIN, data: true, user: res.data.data});
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data));
          setRemimnd('');
          history.push('/');
        } else {
          setRemimnd('无效的token！');
        }
      } else {
        setRemimnd(res.data.msg);
      }
    }).catch((err) => {
      setRemimnd('网络错误！');
      throw new Error(err);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <div className="login-model">
        <div className="login-box">
          {
            remind ? <div className="message-box">{remind}</div> : ''
          }
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign={'right'}
            colon={false}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input autoComplete="off" prefix={<UserOutlined className="user-icon"/>}/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password autoComplete="off" prefix={<KeyOutlined className="user-icon"/>}/>
            </Form.Item>

            <Form.Item className="remeber-me" name="remember" valuePropName="checked">
              <Checkbox style={{color: '#fff'}}>记住密码</Checkbox>
            </Form.Item>

            <Form.Item className="login-button-form-item">
              <Button className="login-btn" size="middle" type="primary" htmlType="submit" >登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
