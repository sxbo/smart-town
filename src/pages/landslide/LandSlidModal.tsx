/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input} from 'antd';

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
        const {close} = this.props;
        close?.();
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
        const {title, visible} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="scenicspotName" label="山体点" rules={[{ required: true, message: '请填写山体点!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="负责人" rules={[{ required: true, message: '请填写负责人!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="personPhone" label="联系方式" rules={[{ required: true, message: '请填写联系方式!'}, {pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
