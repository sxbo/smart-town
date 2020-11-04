/* eslint-disable no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, message} from 'antd';
import { LandCirculationMode } from './LandCirculation';
import axios from 'axios';

export default class LandCirulationModal extends Component<any, any> {
    formRef: React.RefObject<FormInstance>;
    constructor(props: any) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
    }

    handleOk = () => {
        const {land, mode} = this.props;
        this.formRef.current?.validateFields().then((data: any) => {
            console.log(mode);
            if (mode == LandCirculationMode.create){
                this.create(data);
            }

            if (mode == LandCirculationMode.edit) {
                data.id = land.id;
                data.createTime = land.createTime;
                this.edit(data);
            }
        });
    }

    create = (land: any) => {
        axios({
            method: 'POST',
            url: 'api/addLandCirculation',
            data: land,
          }).then((res) => {
            if (res.data.status === 200){
                this.props.refresh?.();
                this.handleCancel();
            } else {
                message.error('添加失败');
            }
          }).catch(() => {
            message.error('登记失败');
          });
    }

    edit = (land: any) => {
        axios({
            method: 'PUT',
            url: 'api/updateLandCirculation',
            data: land,
          }).then((res) => {
            if (res.data.status === 200){
              this.props.refresh?.();
              this.handleCancel();
            }
          }).catch(() => {
            message.error('编辑失败');
          });
    }

    handleCancel = () => {
        this.props.close?.();
    }

    render() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const {title, visible, land} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            cancelButtonProps={{size: 'small'}}
            okButtonProps={{size: 'small'}}
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="outflowSide" label="流出方" initialValue={land?.outflowSide} rules={[{ required: true, message: '请填写流出方!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="inflowSide" label="流入方" initialValue={land?.inflowSide} rules={[{ required: true, message: '请填写流入方!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="location" label="位置" initialValue={land?.location} rules={[{ required: true, message: '请填写位置!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="landAreaName" label="流转面积/用途" initialValue={land?.landAreaName} rules={[{ required: true, message: '流转面积/用途'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="circulationPeriod" label="流转周期" initialValue={land?.circulationPeriod} rules={[{ required: true, message: '请填写流转周期'}]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>;
    }
}
