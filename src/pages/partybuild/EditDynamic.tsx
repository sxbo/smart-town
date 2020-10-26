/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select, message, Spin} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';
import axios from 'axios';
import {customInsertImage} from '../../const/const';


interface EditDynamicPro{
  visible: boolean;
  close: () => void;
  dynamic: any;
  editSuccess?: () => void;
  title: string;
  types: any[];
}

export default class EditDynamic extends Component<EditDynamicPro, any> {
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
      content: props.dynamic?.content,
      loading: false,
    };
  }

  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    const {dynamic} = this.props;
    this.formRef.current?.validateFields().then(data => {
      const dynamicOpt = data.dynamic;
      const content = this.state.content;
      dynamicOpt.content = content;
      dynamicOpt.id = dynamic.id;
      dynamicOpt.icon = dynamic.icon;
      const {types} = this.props;
      const type = types.find(item => item.id == dynamicOpt.type);
      dynamicOpt.type = type;
      const user1 = localStorage.getItem('user');
      let user = {username: 'admin'};
      if (user1) {
        user = JSON.parse(user1);
      }
      if (user.username){
        dynamicOpt.userName = user.username;
      }
      const {title} = this.props;
      if (title == '编辑动态'){
        this.updateDynamic(dynamicOpt);
      } else {
        this.updateFarmProduct(dynamicOpt);
      }
    });
  }

  updateDynamic = (dynamic: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateDynamicInformation',
      data: dynamic,
    }).then((res) => {
      if (res.data.status === 200){
        this.setState({content: ''});
        this.props.editSuccess?.();
        this.formRef.current?.resetFields();
      } else {
        message.error('操作失败');
      }
    }).catch(() => {
      message.error('新建失败');
    });
  }

  updateFarmProduct = (dynamic: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateFarmProduct',
      data: dynamic,
    }).then((res) => {
      if (res.data.status === 200){
        this.setState({content: ''});
        this.props.editSuccess?.();
        this.formRef.current?.resetFields();
      } else {
        message.error('操作失败');
      }
    }).catch(() => {
      message.error('新建失败');
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

  customInsertImage = (callback: any) => {
    customInsertImage(() => {
      this.setState({
        loading: true,
      });
    }, (imageUrl: any) => {
      this.setState({
        loading: false,
      });
      callback({
        src: imageUrl,
        alt: 'image',
      });
    });
  }


  render() {

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const {types, title, dynamic = {}} = this.props;
    const newDynamic = JSON.parse(JSON.stringify(dynamic));

    return <Modal
      title={title}
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      width="800px"
      destroyOnClose>
        <Spin tip="正在上传" spinning={this.state.loading}>
          <Form ref={this.formRef} name="nest-messages" {...layout}>
            <Form.Item name={['dynamic', 'title']} label="标题" initialValue={newDynamic?.title} rules={[{ required: true, message: '请填写标题!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['dynamic', 'subTitle']} label="副标题" initialValue={newDynamic?.subTitle}>
              <Input />
            </Form.Item>
            <Form.Item name={['dynamic', 'type']} label="类型" initialValue={newDynamic?.type?.id} rules={[{ required: true, message: '请填写类型' }]}>
              <Select>
                {
                  types.map((type, index) => <Select.Option key={`${index}`} value={type.id}>{type.type}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item label="内容">
              <RichEditor ref={this.editorRef}
              toolbar={this.toolbar}
              onChange={this.onChange}
              customInsertImage={this.customInsertImage}
              value={this.state.content || ''}
              />
            </Form.Item>
          </Form>
        </Spin>
    </Modal>;
  }
}
