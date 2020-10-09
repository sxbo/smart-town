/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable handle-callback-err */
/* eslint-disable indent */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select, message} from 'antd';
import { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import { UserOptMode } from './UserList';

const Option = Select.Option;

interface UserModelPro{
  visble: boolean;
  close: () => void;
  createSuccess: () => void;
  user: any;
  mode: UserOptMode;
  title: string;
}

class UserModel extends Component<UserModelPro, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any){
    super(props);
    this.state = {
      roles: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'api/role',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          roles: data,
        });
      } else {
        this.setState({
          roles: [],
        });
      }
    }).catch(() => {
      this.setState({
        roles: [],
      });
    });
  }


  componentDidUpdate(prevProps:any, prevState:any){
    const {user} = this.props;
    const user1 = JSON.parse(JSON.stringify(user));
    const form = this.formRef.current;
    if (user1){
      user1.roles = user1.roles || [];
      user1.roles = user1.roles.map((role: any) => role.roleId);
      user1.password = '';
      user1.oldPass = '';
      form?.setFieldsValue({password: '', user: user1});
    } else {
      form?.setFieldsValue({password: '', user: ''});
    }
  }

  handleOk = () => {
    const {mode, user} = this.props;
    const form = this.formRef.current;
    form?.validateFields().then((data) => {
      const optuser = data.user;
      let roles = optuser.roles || [];
      roles = roles.map((role: number) => {
       return {
         roleId: role,
       };
      });
      optuser.roles = roles;
      if (mode === UserOptMode.create){
        axios({
          method: 'POST',
          url: 'api/user',
          data: optuser,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.createSuccess();
          } else {
            message.error(res.data.msg || '操作失败');
          }
        }).catch(() => {
          message.error('新建失败');
        });
      } else {
        optuser.userId = user.userId;
        axios({
          method: 'PUT',
          url: 'api/user',
          data: optuser,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.createSuccess();
          } else {
            if (res.data.msg){
              message.error(res.data.msg);
            } else {
              message.error('修改失败');
            }
          }
        }).catch(() => {
          message.error('修改失败');
        });
      }
    });
  }
  handleCancel = () => {
    this.props.close();
  }

  afterClose = () => {
    const form = this.formRef.current;
    form?.resetFields();
  }
  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { roles } = this.state;
    const {mode} = this.props;

    return <Form ref={this.formRef} name="nest-messages" {...layout}>
      <Modal
      title={this.props.title}
      visible={this.props.visble}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      afterClose={this.afterClose}
      destroyOnClose>
        <Form.Item name={['user', 'username']} label="姓名" rules={[{ required: true, message: '用户名称是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="电话" rules={[{pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'},
          {required: true, message: '电话是必填字段!'},
        ]}>
          <Input />
        </Form.Item>
        {
          mode === UserOptMode.update ?
          <Form.Item
            name={['user', 'oldPass']}
            label="原密码"
            rules={[
              {
                required: true,
                message: '原密码不能为空',
              },
            ]}
            hasFeedback>
            <Input type="password"/>
          </Form.Item> : ''
        }
        <Form.Item
          name='password'
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          hasFeedback>
          <Input type="password"/>
        </Form.Item>
        <Form.Item name={['user', 'password']} label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '确认密码！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入密码不一致!');
              },
            }),
          ]}>
          <Input type="password"/>
        </Form.Item>
        <Form.Item
          name={['user', 'roles']}
          label="角色"
          rules={[{ required: true, message: '请选择角色', type: 'array' }]}
        >
          <Select mode="multiple" placeholder="选择角色">
            {
              roles.map((role: any, index: number) => <Option key={`${index}`} value={role.roleId}>{role.roleName}</Option>)
            }
          </Select>
        </Form.Item>
      </Modal>
    </Form>;
  }
}

export default UserModel;
