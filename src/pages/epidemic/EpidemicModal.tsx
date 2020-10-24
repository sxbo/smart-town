/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, Select} from 'antd';
import {epidemicTypes} from '../../const/const';
export default class EpidemicModal extends Component<any, any> {
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
                <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请填写姓名!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="sexType" label="性别" rules={[{ required: true, message: '请填写性别!'}]}>
                    <Select>
                        <Select.Option value="1">男</Select.Option>
                        <Select.Option value="2">女</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="idCard" label="身份证" rules={[{ required: true, message: '请填写身份证!'}, {pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="village" label="所属村" rules={[{ required: true, message: '请填写所属村庄!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="state" label="状态" rules={[{ required: true, message: '请填写状态!'}]}>
                    <Select>
                        {
                            epidemicTypes.map(item => <Select.Option value={item.type}>{item.label}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>;
    }
}
