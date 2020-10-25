/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, message} from 'antd';
import axios from 'axios';
import {lanSlideMode} from './LandSlideList';

export default class LandSlidModal extends Component<any, any> {
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
        const {lanSlide, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == lanSlideMode.create){
                const lanSlide_create = {
                    ...data,
                };
                this.createApi(lanSlide_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const lanSlide_edit = {
                    ...lanSlide,
                    ...data,
                };
                this.editApi(lanSlide_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (lanSlide: any, success: () => void) => {
        const url = 'api/addLandslide';
        axios({
            method: 'POST',
            url: url,
            data: lanSlide,
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

    editApi = (lanSlide: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updateLandslide',
            data: lanSlide,
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

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const {title, visible, lanSlide} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="address" label="山体点" initialValue={lanSlide?.address} rules={[{ required: true, message: '请填写山体点!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="personCharge" label="负责人" initialValue={lanSlide?.personCharge} rules={[{ required: true, message: '请填写负责人!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="联系方式" initialValue={lanSlide?.phone} rules={[{ required: true, message: '请填写联系方式!'}, {pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
