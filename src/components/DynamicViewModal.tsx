/* eslint-disable no-invalid-this */
/* eslint-disable indent */
import React, {Component} from 'react';
import {Modal, Button} from 'antd';

export default class DynamicViewModal extends Component<any, any> {

	closeModal = () => {
		this.props.close();
	}

	render() {
    return <Modal
		title={this.props.title}
		width={650}
		onCancel={this.closeModal}
		visible={this.props.visible}
		footer={<div><Button size="middle" onClick={this.closeModal}>关闭</Button></div>}>
			<div>hello</div>
		</Modal>;
  }
}
