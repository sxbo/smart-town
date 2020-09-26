/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';

import coverImg from '../../theme/img/login.jpg';


interface AdvertisementState{
  newMemberVisible: boolean;
}

export default class Advertisement extends Component<any, AdvertisementState> {
  // 标题，连接，cover，操作
  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
    };
  }

  openNewMember = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newMemberVisible: true,
    });
  };

  closeNewMember = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newMemberVisible: true,
    });
  };

  render(){
    const columns = [
      {
        title: '背景图',
        dataIndex: 'cover',
        key: 'cover',
        width: '30%',
        render: () => {
          return <img style={{width: '150', height: '100px'}} src={coverImg} alt="cover"/>;
        },
      },
      {
        title: '类型',
        key: 'type',
        width: '30%',
        dataIndex: 'type',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="ghost" size="small">删除</Button>
          </Space>
        ),
      },
    ];

    const data = [
      {coverLink: 'https://conm/as', type: '党建'},
      {coverLink: 'https://conm/as', type: '首页'},
      {coverLink: 'https://conm/as', type: '党建'},
      {coverLink: 'https://conm/as', type: '首页'},
    ];

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewMember}>新建广告</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey={(record, index) => `${index}`}/>
        </div>
      </div>
    );
  }
}
