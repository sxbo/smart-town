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
import {PoorMode} from './PoorList';

export default class PoorModal extends Component<any, any> {
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
        const {poor, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == PoorMode.create){
                const poor_create = {
                    ...data,
                };
                this.createApi(poor_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const poor_edit = {
                    ...poor,
                    ...data,
                };
                this.editApi(poor_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (poor: any, success: () => void) => {
        const url = 'api/addPoor';
        axios({
            method: 'POST',
            url: url,
            data: poor,
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

    editApi = (poor: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updatePoor',
            data: poor,
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
        const {title, visible, poor} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="name" label="姓名" initialValue={poor?.name} rules={[{ required: true, message: '请填写姓名!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="idCard" label="身份证" initialValue={poor?.idCard} rules={[{ required: true, message: '请填写身份证!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="village" label="所属村" initialValue={poor?.village} rules={[{ required: true, message: '请填写所属村!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="联系方式" initialValue={poor?.phone} rules={[{ required: true, message: '请填写联系方式!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="outputValue" label="人均收入" initialValue={poor?.outputValue} rules={[{ required: true, message: '请填写人均收入!'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
