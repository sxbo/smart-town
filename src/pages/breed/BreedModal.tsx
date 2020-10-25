/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Modal, Form, Input, InputNumber, message} from 'antd';
import React, {Component} from 'react';
import axios from 'axios';
import { FormInstance } from 'antd/lib/form/Form';
import {BreedMode} from './BreedList';

export default class BreedModal extends Component<any, any> {

  formRef: React.RefObject<FormInstance>;
    constructor(props: any) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
        this.state = {
          content: '',
          loading: false,
        };
    }

    handleOk = () => {
        const {breed, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == BreedMode.create){
                const breed_create = {
                    ...data,
                };
                this.createApi(breed_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const breed_edit = {
                    ...breed,
                    ...data,
                };
                this.editApi(breed_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (breed: any, success: () => void) => {
        const url = 'api/addBreed';
        axios({
            method: 'POST',
            url: url,
            data: breed,
          }).then((res) => {
            if (res.data.status === 200){
                success();
            } else {
                message.error('创建失败');
            }
          }).catch(() => {
              message.error('创建失败');
          });
    }

    editApi = (breed: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updateBreed',
            data: breed,
          }).then((res) => {
            if (res.data.status === 200){
                success();
            } else {
                message.error('编辑失败');
            }
          }).catch(() => {
              message.error('编辑失败');
          });
    }

    handleCancel = () => {
        const {close} = this.props;
        close?.();
    }
  render () {
    const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
    };
    const {title, visible, breed} = this.props;
    return (
      <>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose>
          <Form ref={this.formRef} name="nest-messages" {...layout}>
            <Form.Item name="name" label="养殖厂名称" initialValue={breed?.name} rules={[{ required: true, message: '请填写名称!'}]}>
              <Input />
            </Form.Item>
            <Form.Item name="manage" label="养殖厂管理者" initialValue={breed?.manage} rules={[{ required: true, message: '请填写管理者!'}]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="联系方式" initialValue={breed?.phone} rules={[{ required: true, message: '请填写联系方式!'}]}>
              <Input />
            </Form.Item>
            <Form.Item name="breedingSpecies" label="养殖种类" initialValue={breed?.breedingSpecies} rules={[{ required: true, message: '请填写养殖种类!'}]}>
              <Input />
            </Form.Item>
            <Form.Item name="tradingVolume" label="交易量（公斤）" initialValue={breed?.tradingVolume} rules={[{ required: true, message: '请填写交易量!'}, { type: 'number', min: 0 }]}>
              <InputNumber style={{width: '100%'}}/>
            </Form.Item>
            <Form.Item name="turnover" label="交易额（元）" initialValue={breed?.turnover} rules={[{ required: true, message: '请填写交易额!'}, { type: 'number', min: 0}]}>
              <InputNumber style={{width: '100%'}}/>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
