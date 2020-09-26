/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';
import coverImg from '../../theme/img/login.jpg';
import NewDynamic from './NewDynamic';

interface DynamicState{
  newDynamicVisible: boolean;
}

export default class Dynamic extends Component<any, DynamicState> {
  // cover， 标题，副标题，富文本，操作
  constructor(props: any){
    super(props);
    this.state = {
      newDynamicVisible: false,
    };
  }

  openNewDynamic = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newDynamicVisible: true,
    });
  };

  closeNewDynamic = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newDynamicVisible: false,
    });
  };

  editDynamic = (record: any) => {
    console.log(record);
    this.openNewDynamic();
  }

  render(){

    const columns: any = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '25%',
        render: (text: any) => {
          return <>
            <a>
              <img style={{width: '40px', height: '40px', marginRight: '5px'}} src={coverImg} alt="cover"/>
              {text}
            </a>
          </>;
        },
      },
      {
        title: '副标题',
        key: 'secondTitle',
        width: '25%',
        dataIndex: 'secondTitle',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.editDynamic(record)} size="small">编辑</Button>
            <Button type="ghost" size="small">删除</Button>
            <Button type="ghost" size="small">上传背景</Button>
          </Space>
        ),
      },
    ];

    const data = [
      {title: '冬天来了，秋天还会远吗', secondTitle: 'aa454sd45fas45ad223', type: '动态'},
      {title: '习近平在联合国辩论会上的演讲', secondTitle: 'aa454sd45fas45ad223', type: '新闻资讯'},
      {title: '花覅就看见工行卡', secondTitle: 'aa454sd45fas45ad223', type: '动态'},
    ];

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewDynamic}>新增动态</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey={(record, index) => `${index}`}/>
        </div>
        <NewDynamic visible={this.state.newDynamicVisible} close={this.closeNewDynamic}/>
      </div>
    );
  }
}
