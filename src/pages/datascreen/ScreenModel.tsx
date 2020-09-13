import React from 'react';
import { Modal } from 'antd';
import Screen from './Screen';

interface ScreenModelProp{
    visible: boolean;
}

const ScreenModel = (props: ScreenModelProp) => {

  return (
    <>
      <Modal
        centered
        visible={props.visible}
        width="100%"
      >
        <Screen/>
      </Modal>
    </>
  );
};

export default ScreenModel;
