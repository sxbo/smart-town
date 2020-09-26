/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';

// import { UploadOutlined } from '@ant-design/icons';


interface EditHorseRaceLampPro{
  visible: boolean;
  close: () => void;
}

export default class NewHorseRaceLamp extends Component<EditHorseRaceLampPro> {
  formRef: React.RefObject<FormInstance>;
  toolbar: (string[] | { align: string; }[] | { list: string; }[] | { script: string; }[] | { indent: string; }[] | { direction: string; }[])[];
  editorRef: React.RefObject<FormInstance>;
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
    this.editorRef = React.createRef<FormInstance>();
    this.toolbar = [
      ['link', 'bold', 'italic', 'underline'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean', 'formatPainter'],
    ];
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
    console.log('editor: ', editor);
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
      cancelText="取消"
      width="800px">
      <Form ref={this.formRef} name="nest-messages" {...layout}>
        <Form.Item name={['horseRaceLamp', 'title']} label="标题" rules={[{ required: true, message: '标题是必填字段!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'link']} label="链接">
          <Input />
        </Form.Item>
      </Form>
      <RichEditor ref={this.editorRef}
        onChange={this.onChange}
        value={`<p><a target="_blank" href="https://nsfi.github.io/ppfish-components/#/home">Fish Design</a> 是基于 React 实现的高质量的 UI 组件库。</p><p><br></p><p>它的设计原则是简洁、直接、优雅和适应性。</p><p><br></p><p>欢迎使用或<a target="_blank" href="https://github.com/NSFI/ppfish-components/">贡献代码</a><img class="portrait_icon" data-id="emoticon_emoji_132" data-type="defaultEmoji" alt="[玫瑰]" src="//qiyukf.com/sdk/res/portrait/emoji/new_emoji_25.png" width="24" height="24"></p>`}
        />
    </Modal>;
  }
}
