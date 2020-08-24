import {Modal, Form, Input, InputNumber, Button, Space} from 'antd';
import React, {SFC} from 'react';

interface EditBreedProps{
  visible: boolean;
  onCancel: () => void
}

const EditBreed: SFC<EditBreedProps> = (props) => {

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onCancel = () => {
    props.onCancel();
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
      phone: '${label} is not a validate phone!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <>
      <Modal
        title="编辑养殖厂"
        closable
        footer={null}
        onCancel={onCancel}
        visible={props.visible}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="养殖厂名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="养殖厂管理者" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'phone']} label="联系方式" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'type']} label="养殖种类" rules={[{ type: 'string' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'age']} label="交易量（公斤）" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item name={['user', 'age']} label="交易额（元）" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
            <Space>
              <Button type="default" onClick={onCancel}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditBreed;
