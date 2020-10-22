/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
/* eslint-disable quotes */
/* eslint-disable no-invalid-this */
/* eslint-disable indent */
import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import '../theme/style/components/DynamicViewModal.scss';

export default class DynamicViewModal extends Component<any, any> {

	closeModal = () => {
		this.props.close();
	}


	render() {
    return <Modal
		title={this.props.title}
		width="50vw"
		onCancel={this.closeModal}
		visible={this.props.visible}
		footer={<div><Button size="middle" onClick={this.closeModal}>关闭</Button></div>}>
			<div className="dynamic-view-model">
				<div className="title-box">{this.props.dynamic.title}</div>
				<div className="publish-time-click-box">
					<span style={{marginRight: '20px'}}>发布时间： {this.props.dynamic.createTime}</span>
					<span>发布者： {this.props.dynamic.userName}</span>
				</div>
				<div className="dynamic-view-content" dangerouslySetInnerHTML={{__html: this.props.dynamic.content}}>
				</div>
			</div>
		</Modal>;
  }
}
