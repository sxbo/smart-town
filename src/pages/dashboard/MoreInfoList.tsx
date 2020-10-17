/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {List, message} from 'antd';
import '../../theme/style/dashboard/Moreinfo.scss';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import DynamicViewModal from '../../components/DynamicViewModal';


class MoreInfoList extends Component<any, any> {

    constructor(props: any){
        super(props);
        this.state = {
          allTypes: [],
          dataList: [],
          currentType: 1,
          viewModalVisible: false,
          viewTitle: '',
          dynamic: {},
        };
    }
    componentDidMount() {
      const pageType = this.props.location?.state?.pageType || this.state.currentType;
      this.getAllTypes();
      if (pageType){
        this.getDynamicsByType(pageType);
        this.setState({currentType: pageType});
      }
    }

    getAllTypes = () => {
      axios({
        method: 'GET',
        url: 'api/getAllDynamicTypes',
      }).then((res) => {
        if (res.data.status === 200){
          this.setState({
            allTypes: res.data?.data || [],
          });
        } else {
          this.setState({
            allTypes: [],
          });
        }
      }).catch(() => {
        this.setState({
          allTypes: [],
        });
      });
    }

    getDynamicsByType = (type: any) => {
        axios({
          method: 'GET',
          url: `api/spb/getDynamicInformation?type=${type}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.setState({
              dataList: res.data?.data || [],
            });
          } else {
            this.setState({
              dataList: [],
            });
          }
        }).catch(() => {
          this.setState({
            dataList: [],
          });
        });
    }

    tabClicked = (pageType: any) => {
      this.setState({currentType: pageType});
      this.getDynamicsByType(pageType);
    }

    closeViewModal = () => {
      this.setState({
        viewModalVisible: false,
      });
    }

    viewDynamic = (dynamic: any) => {
      const type = this.state.allTypes.find((item: any) => item.id == this.state.currentType);
      const title = type.type;
      this.getDynamicById(dynamic.id, (dynamic: any) => {
        this.setState({
          dynamic: dynamic,
          viewModalVisible: true,
          viewTitle: title,
        });
      }, () => {
        message.error('发生错误');
      });
    }

    getDynamicById = (dynamicId: any, success: (dynamic: any)=> void, fail: () => void) => {
      axios({
        method: 'GET',
        url: `api/spb/getDynamicRichText?id=${dynamicId}`,
      }).then((res) => {
        if (res.data.status === 200){
          success(res.data.data);
        } else {
          fail();
        }
      }).catch(() => {
        fail();
      });
    }

    render() {

        const {dataList, allTypes, currentType, viewModalVisible, viewTitle, dynamic} = this.state;
        return <div className="more-info-list-box">
            <div className="tabs-box">
              {
                allTypes.map((item: any) => {
                  return <span key={`${item.id}`} className={currentType == item.id ? 'tab-bt tab-bt-checked' : 'tab-bt'} onClick={e => this.tabClicked(item.id)}>{item.type}</span>;
                })
              }
            </div>
            <div className="infos-list">
                <List size="small" bordered={false}
                dataSource={dataList}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                renderItem={(item: any) => <List.Item>
                    <div className="story-link">
                        <span className="story-link-title" onClick={e => this.viewDynamic(item)}>· {item.title}</span>
                    </div>
                    <div>{item.userName}</div>
                    <div>{item.createTime}</div>
                </List.Item>}/>
            </div>
            <DynamicViewModal dynamic={dynamic} visible={viewModalVisible} close={this.closeViewModal} title={viewTitle}/>
        </div>;
    }
}

export default withRouter(MoreInfoList);
