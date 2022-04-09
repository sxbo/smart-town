/* eslint-disable no-invalid-this */
import {Modal} from 'antd';
import React, {Component} from 'react';

export default class PlayModal extends Component<any>{
  closePlayModal = () => {
    Modal.destroyAll();
    this.props.close();
  };

  render () {
    return <Modal okText="关闭" cancelText="取消"
    onCancel={this.closePlayModal}
    onOk={this.closePlayModal}
    title="播放"
    width={650}
    getContainer={false}
    forceRender
    visible={this.props.visible}
    maskClosable={false}
    >
      <div id="video-container" ></div>
    </Modal>;
  }
}
