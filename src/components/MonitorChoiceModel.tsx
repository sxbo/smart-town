import React, {SFC, MouseEvent} from 'react';
import { Modal, Transfer } from 'antd';
import { TransferItem } from 'antd/es/transfer';
import {MonitorObject} from './type';

import '../theme/style/components/monitor.scss';

interface MonitorChoiceProps{
  visible: boolean;
  monitors: MonitorObject[]
  close: () => void;
}

const MonitorChoiceModel: SFC<MonitorChoiceProps> = (props) => {

  const sourceData: TransferItem[] = props.monitors.map(((monitor, index) => ({
    key: monitor.id,
    title: '' + (index + 1) + '号监控',
  })));

  const selectedKeys: string[] = props.monitors.map((monitor => monitor.id));

  const targetKeys: string[] = [];

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    props.close();
  };

  const handleCancel = (e: MouseEvent) => {
    console.log(e);
    props.close();
  };

  const handleChange = (nextTargetKeys: string[], direction: any, moveKeys: string[]) => {
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  return (
    <>
      <Modal
        title="监控选择"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable>
        <Transfer
          dataSource={sourceData}
          titles={['未选列表', '已选列表']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          render={item => <span>{item.title}</span>}
          selectAllLabels={[]}
        />
      </Modal>
    </>
  );
};

export default MonitorChoiceModel;
