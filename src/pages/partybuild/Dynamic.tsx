/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';
import NewMember from './newMember';
import coverImg from '../../theme/img/login.jpg';

interface DynamicState{
  newMemberVisible: boolean;
}

export default class Dynamic extends Component<any, DynamicState> {
  // cover， 标题，副标题，富文本，操作
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

    const columns: any = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
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
        dataIndex: 'secondTitle',
      },
      {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => {console.log(text, record);}} size="small">编辑</Button>
            <Button type="ghost" size="small">删除</Button>
            <Button type="ghost" size="small">上传Icon</Button>
          </Space>
        ),
      },
    ];

    const data = [
      {title: '冬天来了，秋天还会远吗', secondTitle: 'aa454sd45fas45ad223', link: 'http:fanjiazhen.com/home/pcture'},
      {title: '习近平在联合国辩论会上的演讲', secondTitle: 'aa454sd45fas45ad223', link: 'http:fanjiazhen.com/home/pcture'},
      {title: '花覅就看见工行卡', secondTitle: 'aa454sd45fas45ad223', link: 'http:fanjiazhen.com/home/pcture'},
    ];

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewMember}>新增动态</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey={(record, index) => `${index}`}/>
        </div>
        <NewMember newMemberVisble={this.state.newMemberVisible} close={this.closeNewMember}/>
      </div>
    );
  }
}
