/* eslint-disable no-shadow */
/* eslint-disable no-undefined */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
/* eslint-disable comma-spacing */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import { Row, Col, List, Carousel, message } from 'antd';
import {withRouter} from 'react-router-dom';
import '../../theme/style/dashboard/Layout.scss';
import DynamicViewModal from '../../components/DynamicViewModal';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../theme/style/common.scss';
import '../../theme/style/dashboard/FanStory.scss';
import '../../theme/style/dashboard/Advertise.scss';
import '../../theme/style/dashboard/Party.scss';
import '../../theme/style/dashboard/FarmProduct.scss';
import '../../theme/style/dashboard/NewInfo.scss';
import '../../theme/style/dashboard/PoorRule.scss';
import axios from 'axios';


class DashBoard extends Component<any, any> {
  advertCarouselRef: React.RefObject<Carousel>;

  constructor(props: any){
    super(props);
    this.state = {
      viewModalVisible: false,
      dynamic: '',
      boxHeight: '100%',
      fanStory: [], // 范家故事
      rules: [], // 相关政策
      partyBuildDynamics: [], // 党建动态
      allNews: [], // 新闻资讯
      currentFanStory: 0,
      homeAdvertises: [],
      partyAdvertises: [],
      partyPage: 1,
      products: [],
      viewTitle: '',
    };
    this.advertCarouselRef = React.createRef();
  }

  componentDidMount(){
    window.onresize = (e: any) => {
      const boxWidth = document.body.clientWidth;
      if (boxWidth < 1200){
        this.setState({boxHeight: 'auto'});
      } else {
        this.setState({boxHeight: '100%'});
      }
    };

    this.getAllDynamics();
    this.getAllAdvertises();
    this.getAllFarmProducts();
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  getAllDynamics = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllDynamicInformation',
    }).then((res) => {
      if (res.data.status === 200){
        const data: any[] = res.data.data || [];
        let fanStory: any[] = [];
        let rules: any[] = [];
        let partyBuildDynamics: any[] = [];
        let allNews: any[] = [];
        data.map((dynamic) => {
          if (dynamic.type?.id == 2) {
            fanStory.push(dynamic);
          } else if (dynamic.type?.id == 3){
            rules.push(dynamic);
          } else if (dynamic.type?.id == 5){
            partyBuildDynamics.push(dynamic);
          } else if (dynamic.type?.id == 1){
            allNews.push(dynamic);
          }
        });
        if (fanStory.length > 10){
          fanStory = fanStory.splice(fanStory.length - 10);
        }
        if (rules.length > 10) {
          rules = rules.splice(rules.length - 10);
        }
        if (partyBuildDynamics.length > 7){
          partyBuildDynamics = partyBuildDynamics.splice(partyBuildDynamics.length - 7);
        }
        if (allNews.length > 7){
          allNews = allNews.splice(allNews.length - 7);
        }
        this.setState({
          fanStory: fanStory, // 范家故事
          rules: rules, // 相关政策
          partyBuildDynamics: partyBuildDynamics, // 党建动态
          allNews: allNews, // 新闻资讯
        });
      } else {
        this.setState({
          fanStory: [], // 范家故事
          rules: [], // 相关政策
          partyBuildDynamics: [], // 党建动态
          allNews: [], // 新闻资讯
        });
      }
    }).catch(() => {
      this.setState({
        fanStory: [], // 范家故事
        rules: [], // 相关政策
        partyBuildDynamics: [], // 党建动态
        allNews: [], // 新闻资讯
      });
    });
  }

  viewDynamic = (dynamic: any, title: any) => {

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

  getAllAdvertises = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllAdvertisement',
    }).then((res) => {
      if (res.data.status === 200){
        const data: any[] = res.data.data || [];
        let homeAdvertises: any[] = [];
        let partyAdvertises: any[] = [];
        data.map((item => {
          if (item.type == 1){
            partyAdvertises.push(item);
          } else {
            homeAdvertises.push(item);
          }
        }));
        partyAdvertises = partyAdvertises.slice(0, 4);
        this.setState({
          homeAdvertises: homeAdvertises,
          partyAdvertises: partyAdvertises,
        });
      } else {
        this.setState({
          homeAdvertises: [],
          partyAdvertises: [],
        });
      }
    }).catch(() => {
      this.setState({
        homeAdvertises: [],
        partyAdvertises: [],
      });
    });
  }


  getAllFarmProducts = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllFarmProduct',
    }).then((res) => {
      if (res.data.status === 200){
        const data: any[] = res.data.data || [];
        let products: any[] = data.slice(0, 6);
        this.setState({
          products: products,
        });
      } else {
        this.setState({
          products: [],
        });
      }
    }).catch(() => {
      this.setState({
        products: [],
      });
    });
  }

  jumpToMoreinfo = (pageType: any) => {
    if (pageType == '农副产品'){
      this.props.history.push({
        pathname: '/farmProduct',
      });
    } else {
      this.props.history.push({
        pathname: '/moreinfo',
        state: {
          pageType: pageType,
        },
      });
    }
  }

  closeViewModal = () => {
    this.setState({
      viewModalVisible: false,
    });
  }

  onFanStoryChange = (current: any) => {
    this.setState({
      currentFanStory: current,
    });
  }

  partyPageChange = (current: any) => {
    this.setState({
      partyPage: current,
    });
  }

  nextAdverClicked = () => {
    this.advertCarouselRef?.current?.next();
  }

  prevAdverClicked = () => {
    this.advertCarouselRef.current?.prev();
  }

  render() {

    const contentStyle: any = {
      height: '1rem',
      color: '#fff',
      lineHeight: '120px',
      textAlign: 'center',
      background: '#364d79',
    };

    const {
      viewModalVisible,
      boxHeight,
      fanStory, // 范家故事
      rules, // 相关政策
      partyBuildDynamics, // 党建动态
      allNews, // 新闻资讯
      currentFanStory,
      homeAdvertises,
      partyAdvertises,
      partyPage,
      products,
    } = this.state;

    let last3Fan = [];
    if (fanStory.length > 3){
      last3Fan.push(fanStory[fanStory.length - 1]);
      last3Fan.push(fanStory[fanStory.length - 2]);
      last3Fan.push(fanStory[fanStory.length - 3]);
    } else {
      last3Fan = fanStory;
    }
    return (
      <div className="small-town-dashboard" style={{height: boxHeight}}>
        <Row className="data-board fanstory-adver-pr">
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 6}}>
            <div className="card-box fan-story">
              <div className="title-box">
                <span></span>
                <span></span>
              </div>
              <div className="fan-content">
                <div className="rotation-box">
                  <div className="rotation">
                    <Carousel autoplay afterChange={this.onFanStoryChange}>
                      {
                        last3Fan.map((item: any, index: number) => {
                          return <div key={`${index}`}>
                            <img src={item.icon} style={contentStyle} alt="图片"/>
                          </div>;
                        })
                      }
                    </Carousel>
                  </div>
                  <div className="rotation-title-box">
                    <div className="rotation-title">
                      {fanStory[fanStory.length - currentFanStory - 1]?.title}
                    </div>
                    <div className="rotation-time">
                      {fanStory[fanStory.length - currentFanStory - 1]?.createTime}
                    </div>
                    <div className="rotation-content">
                      {fanStory[fanStory.length - currentFanStory - 1]?.subTitle}
                    </div>
                  </div>
                </div>
                <div className="story-list-box">
                  <List
                    size="small"
                    bordered={false}
                    dataSource={fanStory}
                    renderItem={(item: any) => <List.Item><div onClick={e => this.viewDynamic(item, '范家故事')} className="story-link">· {item.title}</div></List.Item>}/>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 12}}>
            <div className="card-box advertise">
              <div className="advertise-to-next">
                <RightOutlined style={{cursor: 'pointer'}} onClick={this.nextAdverClicked}/>
              </div>
              <div className="advertise-to-prev">
                <LeftOutlined style={{cursor: 'pointer'}} onClick={this.prevAdverClicked}/>
              </div>
              <Carousel style={{height: '100%'}} ref={this.advertCarouselRef} dots={false} autoplay>
                {
                  homeAdvertises.map((item: any, index: number) => {
                    return <div className="advertise-content" key={`${index}`}>
                      <img src={item.imageUrl} alt="图片"/>
                    </div>;
                  })
                }
              </Carousel>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 6}}>
            <div className="card-box poor-rule">
              <div className="title-box">
                <span></span>
                <span></span>
              </div>
              <div className="rules-box">
                <List
                  size="small"
                  bordered={false}
                  dataSource={rules}
                  renderItem={(item: any) => <List.Item>
                    <div className="story-link" onClick={e => this.viewDynamic(item, '政策解读')}>· {item.title}</div>
                    <div className="date-box">{item.createTime}</div>
                  </List.Item>}/>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="row-party-news-far">
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 8}}>
            <div className="card-box party-content">
              <div className="title-box">
                <div className="title-icon-text">
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span onClick={e => this.jumpToMoreinfo(5)} className="spancolor more">更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="imgply-news-box">
                <div className="imgply-box">
                  <div className="imgply-box-pages">
                    {
                      partyAdvertises.map((item: any, index: number) => {
                        return <span className={partyPage == index ? 'imgply-box-pages-partyPage-checked' : 'imgply-box-pages-partyPage'} key={`${index}`}>{index + 1}</span>
                      })
                    }
                  </div>
                  <Carousel afterChange={this.partyPageChange} style={{height: '100%'}} autoplay dots={false}>
                    {
                      partyAdvertises.map((item: any, index: number) => {
                        return <div className="advertise-content" key={`${index}`}>
                          <img src={item.imageUrl} alt="图片"/>
                        </div>;
                      })
                    }
                  </Carousel>
                </div>
                <div className="little-new-news">
                  <div>
                    <List
                      size="small"
                      bordered={false}
                      dataSource={partyBuildDynamics}
                      renderItem={(item: any) => <List.Item>
                        <div className="story-link" onClick={e => this.viewDynamic(item, '党建动态')}>· {item.title}</div>
                        <div className="date-box">{item.createTime}</div>
                      </List.Item>}/>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 8}}>
            <div className="card-box news-information">
              <div className="title-box">
                <div className="title-icon-text">
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span className="spancolor more" onClick={e => this.jumpToMoreinfo(1)}>更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="news-box">
                <List
                  size="small"
                  bordered={false}
                  dataSource={allNews}
                  renderItem={(item: any) => <List.Item>
                    <div className="story-link" onClick={e => this.viewDynamic(item, '新闻资讯')}>· {item.title}</div>
                    <div className="date-box">{item.createTime}</div>
                  </List.Item>}/>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 8}}>
            <div className="card-box farm-product">
              <div className="title-box">
                <div className="title-icon-text">
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span className="spancolor more" onClick={e => this.jumpToMoreinfo('农副产品')}>更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="farm-p-img">
                <div className="farm-p-img-fr">
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[0] ?
                      <img src={products[0]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[0]?.type?.type
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[1] ?
                      <img src={products[1]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[1]?.type?.type
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[2] ?
                      <img src={products[2]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[2]?.type?.type
                      }
                    </div>
                  </div>
                </div>
                <div className="farm-p-img-fr">
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[3] ?
                      <img src={products[3]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[3]?.type?.type
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[4] ?
                      <img src={products[4]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[4]?.type?.type
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      products[5] ?
                      <img src={products[5]?.icon} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        products[5]?.type?.type
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <DynamicViewModal dynamic={this.state.dynamic} visible={viewModalVisible} close={this.closeViewModal} title={this.state.viewTitle}/>
      </div>
    );
  }
}

export default withRouter(DashBoard);
