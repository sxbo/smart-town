import React, {SFC} from 'react';
import {Button, Table, Space} from 'antd';
import PageTitle from '../../components/PageTitle';
import '../../theme/style/partybuild/layout.scss';
import '../../theme/style/common.scss';

const PartyBuild: SFC = () => {

  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门',
      key: 'idNum',
      dataIndex: 'idNum',
    },
    {
      title: '创建时间',
      dataIndex: 'belongVillage',
      key: 'belongVillage',
    },
    {
      title: '联系方式',
      key: 'contact',
      dataIndex: 'contact',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space>
          <Button type="default" onClick={() => {console.log(text, record);}} size="small">编辑</Button>
          <Button type="ghost" size="small">删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="party-build">
      <PageTitle title="智慧党建"></PageTitle>
      <div className="party-build-content">
        <div className="card-box content-item">
          <div className="orginization">
            <div>组织管理</div>
            <div>
              <Button size="middle">新建党员</Button>
            </div>
          </div>
          <div>
            <Table columns={columns} dataSource={[]}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyBuild;
