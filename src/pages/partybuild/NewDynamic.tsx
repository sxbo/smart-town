/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select, message} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';
import {DynamicType} from '../../const/const';
import axios from 'axios';

// import { UploadOutlined } from '@ant-design/icons';


interface NewDynamicPro{
  visible: boolean;
  close: () => void;
  createSuccess?: () => void;
}

export default class NewDynamic extends Component<NewDynamicPro, any> {
  formRef: React.RefObject<FormInstance>;
  toolbar: (string[] | { align: string; }[] | { list: string; }[] | { script: string; }[] | { indent: string; }[] | { direction: string; }[])[];
  editorRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
    this.editorRef = React.createRef<any>();
    this.toolbar = [
      ['bold', 'italic', 'underline', 'link'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean', 'formatPainter'],
    ];

    this.state = {
      content: '',
    };
  }


  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    this.formRef.current?.validateFields().then(data => {
      const dynamicOpt = data.dynamic;
      const content = this.state.content;
      dynamicOpt.content = content;
      axios({
        method: 'POST',
        url: 'api/spb/addDynamicInformation',
        data: dynamicOpt,
      }).then((res) => {
        if (res.data.status === 200){
          this.setState({content: ''});
          this.props.createSuccess?.();
          this.formRef.current?.resetFields();
        } else {
          message.error('操作失败');
        }
      }).catch(() => {
        message.error('新建失败');
      });
    });
  }
  handleCancel = () => {
    this.setState({content: ''});
    this.formRef.current?.resetFields();
    this.props.close();
  }

  onChange = (content: any, delta: any, source: any, editor: any) => {
    this.setState({content: content});
  }


  render() {

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return <Modal
      title="新建动态"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      width="800px">
      <Form ref={this.formRef} name="nest-messages" {...layout}>
        <Form.Item name={['dynamic', 'title']} label="标题" rules={[{ required: true, message: '标题是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['dynamic', 'subTitle']} label="副标题">
          <Input />
        </Form.Item>
        <Form.Item name={['dynamic', 'type']} label="类型" rules={[{ required: true, message: '动态类型是必选字段' }]}>
          <Select>
            {
              DynamicType.map((type, index) => <Select.Option key={`${index}`} value={type.type}>{type.label}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item label="内容">
          <RichEditor ref={this.editorRef}
          toolbar={this.toolbar}
          onChange={this.onChange}
          value={this.state.content}
          />
        </Form.Item>
      </Form>
    </Modal>;
  }
}
