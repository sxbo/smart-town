import React, {Component} from 'react';
import {ColumnsType} from 'antd/es/table/interface';
import { Table, Button, Input, Space } from 'antd';
const {Search} = Input;

export default class RoleList extends Component {

  getColumns = (permissionColumns: []): ColumnsType<any> => {
    let columns: ColumnsType<any> = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '修改时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
      },
      {
        title: '所属角色',
        key: 'roles',
        dataIndex: 'roles',
      },
    ];
    const lastColumn = [
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

    if (permissionColumns && permissionColumns.length){
      columns = columns.concat(permissionColumns).concat(lastColumn);
    } else {
      columns = columns.concat(lastColumn);
    }
    return columns;
  }

  render(){
    const columns = this.getColumns([]);

    return <>
      <div className="single-search-box">
        <Search style={{width: '3rem'}} placeholder="请输入关键字" onSearch={value => console.log(value)} enterButton />
      </div>
      <Table
        columns={columns}
        dataSource={[]}
        rowKey="id"
      />
    </>;
  }


}
