/* eslint-disable no-magic-numbers */
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
import { RoleOptMode } from './RoleList';

const Option = Select.Option;

interface RoleModelPro{
  visble: boolean;
  close: () => void;
  createSuccess: () => void;
  role: any;
  mode: RoleOptMode;
  title: string;
}

class RoleModel extends Component<RoleModelPro, any> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any){
    super(props);
    this.state = {
      permissions: [],
    };
  }

  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = () => {
    axios({
      method: 'GET',
      url: 'api/permission',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          permissions: data,
        });
      } else {
        this.setState({
          permissions: [],
        });
      }
    }).catch(() => {
      this.setState({
        permissions: [],
      });
    });
  }


  componentDidUpdate(prevProps:any, prevState:any){
    const {role} = this.props;
    const role1 = JSON.parse(JSON.stringify(role));
    const form = this.formRef.current;
    if (role1){
      role1.permissions = role1.permissions || [];
      role1.permissions = role1.permissions.map((permission: any) => permission.permissionId);
      form?.setFieldsValue({role: role1});
    } else {
      form?.setFieldsValue({role: ''});
    }
  }

  handleOk = () => {
    const {mode, role} = this.props;
    const form = this.formRef.current;
    form?.validateFields().then((data) => {
      const optrole = data.role;
      let permissions = optrole.permissions || [];
      permissions = permissions.map((perId: number) => {
       return {
        permissionId: perId,
       };
      });
      optrole.permissions = permissions;
      if (mode === RoleOptMode.create){
        axios({
          method: 'POST',
          url: 'api/role',
          data: optrole,
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
        optrole.roleId = role.roleId;
        axios({
          method: 'PUT',
          url: 'api/role',
          data: optrole,
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

    const { permissions } = this.state;

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
        <Form.Item name={['role', 'roleName']} label="角色名称" rules={[{ required: true, message: '角色名称不能为空！' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['role', 'permissions']}
          label="权限"
          rules={[{ required: true, message: '权限不能为空！', type: 'array' }]}>
          <Select mode="multiple" placeholder="选择权限">
            {
              permissions.map((permission: any, index: number) => <Option key={`${index}`} value={permission.permissionId}>{permission.permission}</Option>)
            }
          </Select>
        </Form.Item>
      </Modal>
    </Form>;
  }
}

export default RoleModel;
