/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import {Modal, Form, Input, message, Select} from 'antd';
import axios from 'axios';
import {HelpHistoryMode} from './HelpHistoryList';

export default class HelpHistoryModal extends Component<any, any> {
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
        const {helpHistory, mode} = this.props;
        const form = this.formRef.current;
        form?.validateFields().then(data => {
            if (mode == HelpHistoryMode.create){
                const helpHistory_create = {
                    ...data,
                };
                this.createApi(helpHistory_create, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            } else {
                const helpHistory_edit = {
                    ...helpHistory,
                    ...data,
                };
                this.editApi(helpHistory_edit, () => {
                    this.props.refreshList?.();
                    const {close} = this.props;
                    close?.();
                });
            }
        });
    }


    createApi = (helpHistory: any, success: () => void) => {
        const url = 'api/addGreenhaddPovertyAlleviationRecordouse';
        axios({
            method: 'POST',
            url: url,
            data: helpHistory,
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

    editApi = (helpHistory: any, success: () => void) => {
        axios({
            method: 'PUT',
            url: 'api/updatePovertyAlleviationRecord',
            data: helpHistory,
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
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const {title, visible, helpHistory = {}} = this.props;
        let helpHistor = JSON.parse(JSON.stringify(helpHistory));
        return <Modal
            title={title}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            destroyOnClose>
            <Form ref={this.formRef} name="nest-messages" {...layout}>
                <Form.Item name="helpObj" label="帮扶对象" initialValue={helpHistor?.helpObj} rules={[{ required: true, message: '请填写帮扶对象!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="village" label="所属村" initialValue={helpHistor?.village} rules={[{ required: true, message: '请填写所属村!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="personCharge" label="负责人" initialValue={helpHistor?.personCharge} rules={[{ required: true, message: '请填写负责人!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="helpProject" label="所属项目" initialValue={helpHistor?.helpProject}>
                    <Input />
                </Form.Item>
                <Form.Item name="poorYear" label="脱贫年度" initialValue={helpHistor?.poorYear} rules={[{ required: true, message: '请填写脱贫年度!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="poorState" label="当前状态" initialValue={helpHistor?.poorState} rules={[{ required: true, message: '请填写状态!'}]}>
                    <Select>
                        <Select.Option value={1}>已脱贫</Select.Option>
                        <Select.Option value={2}>未脱贫</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>;
    }
}
