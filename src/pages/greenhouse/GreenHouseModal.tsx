/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, message} from 'antd';
import {GreenHouseMode} from './GreenHouseList';
import axios from 'axios';

export default class GreenHouseModal extends Component<any, any> {
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
        const {greenHouse, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == GreenHouseMode.create){
                const greenHouse_create = {
                    ...data,
                };
                this.createApi(greenHouse_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const greenHouse_edit = {
                    ...greenHouse,
                    ...data,
                };
                this.editApi(greenHouse_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (greenHouse: any, success: () => void) => {
        const url = 'api/addGreenhouse';
        axios({
            method: 'POST',
            url: url,
            data: greenHouse,
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

    editApi = (greenHouse: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updateGreenhouse',
            data: greenHouse,
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
        const {title, visible, greenHouse} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="name" label="大棚名称" initialValue={greenHouse?.name} rules={[{ required: true, message: '请填写大棚名称!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="地址" initialValue={greenHouse?.address} rules={[{ required: true, message: '请填写地址!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="种类" initialValue={greenHouse?.type} rules={[{ required: true, message: '请填写种类!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="manage" label="管理者" initialValue={greenHouse?.manage} rules={[{ required: true, message: '请填写管理者'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
