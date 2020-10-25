/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, message} from 'antd';
import axios from 'axios';
import {ScenicMode} from './ScenicList';

export default class ScenicModal extends Component<any, any> {
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
        const {scenic, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == ScenicMode.create){
                const scenic_create = {
                    ...data,
                };
                this.createApi(scenic_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const scenic_edit = {
                    ...scenic,
                    ...data,
                };
                this.editApi(scenic_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (scenic: any, success: () => void) => {
        const url = 'api/addScenicSpot';
        axios({
            method: 'POST',
            url: url,
            data: scenic,
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

    editApi = (scenic: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updateScenicSpot',
            data: scenic,
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
        const {title, visible, scenic} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="scenicspotName" label="景区名称" initialValue={scenic?.scenicspotName} rules={[{ required: true, message: '请填写景区名称!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="景区地址" initialValue={scenic?.address} rules={[{ required: true, message: '请填写景区地址!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="personCharge" label="负责人" initialValue={scenic?.personCharge} rules={[{ required: true, message: '请填写负责人!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="personPhone" label="联系方式" initialValue={scenic?.personPhone} rules={[{ required: true, message: '请填写联系方式!'}, {pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误!'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
