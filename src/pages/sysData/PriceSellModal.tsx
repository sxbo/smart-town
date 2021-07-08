/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import {OptMpde} from './PriceSellList';

interface NewMemberPro{
  visble: boolean;
  close: () => void;
  success: () => void;
  priceSell: any;
  mode: OptMpde;
  title: string;
  types: any[];
  villages: any[];
}

class PriceSellModal extends Component<NewMemberPro> {
  formRef = React.createRef<FormInstance>();

  handleOk = () => {
    const {priceSell, mode} = this.props;
    const form = this.formRef.current;
    form?.validateFields().then(data => {
      let priceSell1 = data.priceSell;
      priceSell1 = this.packagePrice(priceSell1);
      if (mode === OptMpde.create){
        axios({
          method: 'POST',
          url: 'api/addPriceSell',
          data: priceSell1,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.success();
          } else {
            message.error('操作失败');
          }
        }).catch(() => {
          message.error('新建失败');
        });
      } else {
        priceSell1.id = priceSell.id;
        axios({
          method: 'PUT',
          url: 'api/updatePriceSell',
          data: priceSell1,
        }).then((res) => {
          if (res.data.status === 200){
            form?.resetFields();
            this.props.success();
          } else {
            message.error('操作失败');
          }
        }).catch(() => {
          message.error('修改失败');
        });
      }
    });
  }

  packagePrice = (price: any) => {
    const { types, villages} = this.props;
    const findType = types.find(type => type.id === price.type);
    const findVillage = villages.find(village => village.id === price.village);
    if (findType) {
        price.type = findType;
    }
    if (findVillage) {
        price.village = findVillage;
    }
    return price;
  }

  handleCancel = () => {
    this.props.close();
  }

  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const {title, types, villages, priceSell} = this.props;

    return <Form ref={this.formRef} name="nest-messages" {...layout}>
      <Modal
        title={title}
        visible={this.props.visble}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose>
        <Form.Item name={['priceSell', 'type']} label="产品类型" initialValue={priceSell?.type?.id} rules={[{ required: true, message: '产品类型是必选字段!' }]}>
          <Select>
            {
              types.map((type, index) => <Select.Option key={`${type.id}`} value={type.id}>{type.type}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={['priceSell', 'village']} label="所属村" initialValue={priceSell?.village?.id} rules={[{ required: true, message: '所属村是必选字段!' }]}>
          <Select>
            {
              villages.map((type, index) => <Select.Option key={`${type.id}`} value={type.id}>{type.village}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name={['priceSell', 'daySell']} label="日销售量/吨" initialValue={priceSell?.daySell} rules={[{pattern: /\d$/, message: '销售量格式有误，只能是数字!'}, { required: true, message: '日销售量是必填字段!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['priceSell', 'price']} label="价格/元" initialValue={priceSell?.price} rules={[{pattern: /\d$/, message: '价格格式有误，只能是数字!'}, {required: true, message: '价格是必填字段!'},
        ]}>
          <Input/>
        </Form.Item>
      </Modal>
    </Form>;
  }
}

export default PriceSellModal;
