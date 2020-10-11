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
import {HorseType} from '../../const/const';
import axios from 'axios';

// import { UploadOutlined } from '@ant-design/icons';


interface EditHorseRaceLampPro{
  visible: boolean;
  close: () => void;
  createSuccess?: () => void;
}

export default class NewHorseRaceLamp extends Component<EditHorseRaceLampPro, any> {
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
      const horOpt = data.horseRaceLamp;
      const content = this.state.content;
      horOpt.content = content;
      axios({
        method: 'POST',
        url: 'api/spb/addHorseRaceLamp',
        data: horOpt,
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


    return <Form ref={this.formRef} name="nest-messages" {...layout}>
      <Modal
        title="新建"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        width="800px"
        destroyOnClose>
        <Form.Item name={['horseRaceLamp', 'title']} label="标题" rules={[{ required: true, message: '标题是必填字段!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'link']} label="链接">
          <Input/>
        </Form.Item>
        <Form.Item name={['horseRaceLamp', 'type']} label="类型" rules={[{ required: true, message: '类型是必选字段!' }]}>
          <Select>
            {
              HorseType.map((type, index) => <Select.Option key={`${index}`} value={type.type}>{type.label}</Select.Option>)
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
      </Modal>
    </Form>;
  }
}
