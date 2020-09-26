/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';

// import { UploadOutlined } from '@ant-design/icons';


interface NewDynamicPro{
  visible: boolean;
  close: () => void;
}

export default class NewDynamic extends Component<NewDynamicPro, any> {
  formRef: React.RefObject<FormInstance>;
  toolbar: (string[] | { align: string; }[] | { list: string; }[] | { script: string; }[] | { indent: string; }[] | { direction: string; }[])[];
  editorRef: React.RefObject<FormInstance>;
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
    this.editorRef = React.createRef<FormInstance>();
    this.toolbar = [
      ['bold', 'italic', 'underline', 'link'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean', 'formatPainter'],
    ];

    this.state = {
      img: '',
    };
  }


  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    this.formRef.current?.validateFields();
  }
  handleCancel = () => {
    this.props.close();
  }

  onChange = (content: any, delta: any, source: any, editor: any) => {
    console.log('content: ', content);
    console.log('delta: ', delta);
    console.log('source: ', source);
    console.log('editor: ', editor.getHTML());
  }


  render() {

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return <Modal
      title="编辑"
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      width="800px">
      <Form ref={this.formRef} name="nest-messages" {...layout}>
        <Form.Item name={['horseRaceLamp', 'title']} label="标题" rules={[{ required: true, message: '标题是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'secondTitle']} label="副标题">
          <Input />
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'type']} label="类型">
          <Select defaultValue="home">
              <Select.Option value="home">首页</Select.Option>
              <Select.Option value="partyBuild">党建</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="内容">
          <RichEditor ref={this.editorRef}
          toolbar={this.toolbar}
          onChange={this.onChange}
          value=""
          />
        </Form.Item>
      </Form>
    </Modal>;
  }
}
