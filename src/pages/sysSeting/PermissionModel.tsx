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

interface PermissionModelPro{
  visble: boolean;
  close: () => void;
  createSuccess: () => void;
  permission: any;
  mode: RoleOptMode;
  title: string;
}

class PermissionModel extends Component<PermissionModelPro, any> {
  formRef = React.createRef<FormInstance>();

  componentDidUpdate(prevProps:any, prevState:any){
    const {permission} = this.props;
    const permission1 = JSON.parse(JSON.stringify(permission));
    const form = this.formRef.current;
    if (permission1){
      form?.setFieldsValue({permission: permission1});
    } else {
      form?.setFieldsValue({permission: ''});
    }
  }

  handleOk = () => {
    const {mode, permission} = this.props;
    const form = this.formRef.current;
    form?.validateFields().then((data) => {
      const optpermission = data.permission;
      if (mode === RoleOptMode.create){
        axios({
          method: 'POST',
          url: 'api/permission',
          data: optpermission,
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
        optpermission.permissionId = permission.permissionId;
        axios({
          method: 'PUT',
          url: 'api/permission',
          data: optpermission,
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
        <Form.Item name={['permission', 'permission']} label="权限名称" rules={[{ required: true, message: '权限名称不能为空！' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['permission', 'permissionName']} label="权限描述字段" rules={[{ required: true, message: '权限描述字段不能为空！' }, {pattern: /^[a-zA-Z:]+$/, message: '字段为全英文字母或含冒号(:)'}]}>
          <Input />
        </Form.Item>
      </Modal>
    </Form>;
  }
}

export default PermissionModel;
