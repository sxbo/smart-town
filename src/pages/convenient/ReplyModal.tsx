/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {Modal, Input, message} from 'antd';
import axios from 'axios';

export default class ReplyModal extends Component<any, any> {

    state ={
        value: '',
    }

    onValueChange = (e: any) => {
        this.setState({value: e.target.value});
    }

    close = () => {
        this.props.close();
    }

    onOk = () => {
        const value = this.state.value;
        const {convenient} = this.props;
        if (value.trim() == ''){
            message.info('回复内容不能为空');
            return;
        }
        convenient.returnContent = value;
        this.updateConvenient(convenient);
    }

    updateConvenient = (convenient: any) => {
        const {replySuccess} = this.props;
		axios({
			method: 'PUT',
			url: 'api/updateConvenientService',
			data: convenient,
		}).then((res) => {
			if (res.data.status === 200){
                replySuccess();
			}
		}).catch(() => {
			message.error('操作失败');
		});
	}


    render(){
        const {visible} = this.props;
        return (
            <Modal okText="确认" onOk={this.onOk} cancelText="取消" visible = {visible} title="回复" onCancel={this.close}>
                <Input.TextArea value={this.state.value} onChange={this.onValueChange} autoSize={{ minRows: 6}} placeholder="回复内容"></Input.TextArea>
            </Modal>
        );
    }
}
