/* eslint-disable no-invalid-this */
import {Modal} from 'antd';
import React, {Component} from 'react';
// import EZUIKit from 'ezuikit-js';

export default class PlayModal extends Component<any>{

  closePlayModal = () => {
    this.props.close();
  };

  render () {
    return <Modal onCancel={this.closePlayModal} onOk={this.closePlayModal} title="播放" width={650} getContainer={false} forceRender visible={this.props.visible}>
      <div id="video-container" ></div>
    </Modal>;
  }
}
