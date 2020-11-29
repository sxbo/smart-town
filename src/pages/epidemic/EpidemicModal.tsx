/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, Select, message} from 'antd';
import {epidemicTypes} from '../../const/const';
import {EpidmicMode} from './EpidemicList';
import axios from 'axios';

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
        const {epidmic, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == EpidmicMode.create){
                const epidmic_create = {
                    ...data,
                };
                this.createApi(epidmic_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const epidmic_edit = {
                    ...epidmic,
                    ...data,
                };
                this.editApi(epidmic_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (epidmic: any, success: () => void) => {
        const url = 'api/addEpidemicSurveillance';
        axios({
            method: 'POST',
            url: url,
            data: epidmic,
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

    editApi = (epidmic: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/editEpidemicSurveillance',
            data: epidmic,
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
        const {title, visible, epidmic} = this.props;
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="name" label="姓名" initialValue={epidmic?.name} rules={[{ required: true, message: '请填写姓名!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="sexType" label="性别" initialValue={epidmic?.sexType} rules={[{ required: true, message: '请填写性别!'}]}>
                    <Select>
                        <Select.Option value="1">男</Select.Option>
                        <Select.Option value="2">女</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="idCard" label="身份证" initialValue={epidmic?.idCard} rules={[{ required: true, message: '请填写身份证!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="village" label="详情" initialValue={epidmic?.village} rules={[{ required: true, message: '请填写详细信息!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="state" label="状态" initialValue={epidmic?.state} rules={[{ required: true, message: '请填写状态!'}]}>
                    <Select>
                        {
                            epidemicTypes.map(item => <Select.Option key={item.type} value={item.type}>{item.label}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>;
    }
}
