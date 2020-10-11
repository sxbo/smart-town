/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import {jopType, idCardType} from '../../const/const';
import axios from 'axios';
import moment from 'moment';
import {OrginizationOptMode} from './Orginization';

interface NewMemberPro{
  newMemberVisble: boolean;
  close: () => void;
  createSuccess: () => void;
  member: any;
  mode: OrginizationOptMode;
  title: string;
}

class NewMember extends Component<NewMemberPro> {
  formRef = React.createRef<FormInstance>();


  componentDidUpdate(prevProps:any, prevState:any){
    const {member} = this.props;
    const member1 = JSON.parse(JSON.stringify(member));
    member1.createTime = moment(member1.createTime, 'YYYY-MM-DD HH:mm:ss');
    const form = this.formRef.current;
    if (member1 && member1.id){
      form?.setFieldsValue({user: member1});
    } else {
      form?.setFieldsValue({user: ''});
    }
  }


  handleOk = () => {
    const {member, mode} = this.props;
    const form = this.formRef.current;
    form?.validateFields().then(data => {
      const member1 = data.user;
      member1.createTime = member1['createTime'].format('YYYY-MM-DD HH:mm:ss');
      if (mode === OrginizationOptMode.create){
        axios({
          method: 'POST',
          url: 'api/spb/addMemberOrganizations',
          data: member1,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.createSuccess();
          } else {
            message.error('操作失败');
          }
        }).catch(() => {
          message.error('新建失败');
        });
      } else {
        member1.id = member.id;
        member1.userId = member.userId;
        member1.headImg = member.headImg;
        axios({
          method: 'PUT',
          url: 'api/spb/updateMemberOrganizations',
          data: member1,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.createSuccess();
          } else {
            message.error('操作失败');
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
  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const {title} = this.props;

    return <Form ref={this.formRef} name="nest-messages" {...layout}>
      <Modal
        title={title}
        visible={this.props.newMemberVisble}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose>
        <Form.Item name={['user', 'name']} label="姓名" rules={[{ required: true, message: '党员姓名是必填字段!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['user', 'createTime']} label="入党日期" rules={[{required: true, message: '请选择入党日期' }]}>
          <DatePicker style={{width: '100%'}} format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name={['user', 'jobType']} label="党内职务" rules={[{ required: true, message: '党内职务是必选字段!' }]}>
          <Select>
            {
              jopType.map((type, index) => <Select.Option key={`${index}`} value={type.jobType}>{type.label}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'idCardType']} label="身份类型" rules={[{ required: true, message: '身份类型是必选字段!' }]}>
          <Select>
            {
              idCardType.map((type, index) => <Select.Option key={`${index}`} value={type.idCardType}>{type.label}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'group']} label="隶属组织" rules={[{ required: true, message: '隶属组织是必填字段!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="手机号码" rules={[{pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'},
          {required: true, message: '电话是必填字段!'},
        ]}>
          <Input/>
        </Form.Item>
      </Modal>
    </Form>;
  }
}

export default NewMember;
