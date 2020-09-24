/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
// import { UploadOutlined } from '@ant-design/icons';


interface EditHorseRaceLampPro{
  visible: boolean;
  close: () => void;
}

export default class EditHorseRaceLamp extends Component<EditHorseRaceLampPro> {
  formRef = React.createRef<FormInstance>();
  handleOk = () => {
    this.formRef.current?.validateFields();
  }
  handleCancel = () => {
    this.props.close();
  }
  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return <Modal
      title="编辑"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消">
      <Form ref={this.formRef} name="nest-messages" {...layout}>
        <Form.Item name={['horseRaceLamp', 'title']} label="标题" rules={[{ required: true, message: '标题是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'link']} label="链接">
          <Input />
        </Form.Item>
      </Form>
    </Modal>;
  }
}
