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
				<div className="title-box">娃娃水电费按时</div>
				<div className="publish-time-click-box">
					<span style={{marginRight: '20px'}}>发布时间： 2020.09.26</span>
					<span>点击数量： 23</span>
				</div>
				<div dangerouslySetInnerHTML={{__html: "<h2>hello world!</h2>"}}>
				</div>
			</div>
		</Modal>;
  }
}
