/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface NewMemberPro{
  newMemberVisble: boolean;
  close: () => void;
}

class NewMember extends Component<NewMemberPro> {
  formRef = React.createRef<FormInstance>();
  handleOk = () => {
    const form = this.formRef.current;
    form?.validateFields();
  }
  handleCancel = () => {
    this.props.close();
  }
  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    // mp4,flv,f4v,webm,m4v,mov,3gp,3g2,rm,rmvb,wmv,avi,asf,mpg,mpeg,mpe,ts,div,dv,divx,vob,dat,mkv,swf,lavf,cpk,dirac,ram,qt,fli,flc,mod,
    return <Modal
      title="新建党员"
      visible={this.props.newMemberVisble}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消">
      <Form ref={this.formRef} name="nest-messages" {...layout}>
        <Form.Item name={['user', 'name']} label="姓名" rules={[{ required: true, message: '党员姓名是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="电话" rules={[{pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'},
          {required: true, message: '电话是必填字段!'},
        ]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'group']} label="所属部门">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'job']} label="职位">
          <Input />
        </Form.Item>
      </Form>
    </Modal>;
  }
}

export default NewMember;
