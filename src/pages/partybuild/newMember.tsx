import React, {Component} from 'react';
import { Modal } from 'antd';

interface NewMemberPro{
  newMemberVisble: boolean;
  close: () => void;
}

class NewMember extends Component<NewMemberPro> {

  handleOk = () => {
    // eslint-disable-next-line no-invalid-this
    this.props.close();
  }
  handleCancel = () => {
    // eslint-disable-next-line no-invalid-this
    this.props.close();
  }
  render() {
    return <Modal
      title="新建党员"
      visible={this.props.newMemberVisble}
      onOk={this.handleOk}
      onCancel={this.handleCancel}>
    </Modal>;
  }
}

export default NewMember;
