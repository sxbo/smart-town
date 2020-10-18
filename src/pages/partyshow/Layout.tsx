/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import { Row, Col, List, Carousel, message } from 'antd';
import '../../theme/style/partyshow/Layout1.scss';
import DynamicViewModal from '../../components/DynamicViewModal';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../../theme/style/common.scss';
import '../../theme/style/partyshow/FanStory1.scss';
import '../../theme/style/partyshow/Advertise1.scss';
import '../../theme/style/partyshow/Party1.scss';
import '../../theme/style/partyshow/FarmProduct1.scss';
import '../../theme/style/partyshow/NewInfo1.scss';
import '../../theme/style/partyshow/PoorRule1.scss';
import axios from 'axios';
import partyLogo from '../../theme/img/partyLogo.jpg';


export default class PartyShow extends Component<any, any> {

  advertCarouselRef: React.RefObject<Carousel>;

  constructor(props: any){
    super(props);
    this.state = {
      viewModalVisible: false,
      dynamic: '',
      boxHeight: '100%',
      educations: [], // 主题教育
      notices: [], // 相关公告
      partyBuildDynamics: [], // 党建动态
      meetLessons: [], // 三会一课
      currentNotice: 0,
      partyAdvertises: [],
      partyPage: 1,
      videos: [],
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
    this.getAllVideos();
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
        let notices: any[] = [];
        let educations: any[] = [];
        let partyBuildDynamics: any[] = [];
        let meetLessons: any[] = [];
        data.map((dynamic) => {
          if (dynamic.type?.id == 4) {
            notices.push(dynamic);
          } else if (dynamic.type?.id == 7){
            educations.push(dynamic);
          } else if (dynamic.type?.id == 5){
            partyBuildDynamics.push(dynamic);
          } else if (dynamic.type?.id == 6){
            meetLessons.push(dynamic);
          }
        });
        if (notices.length > 10){
          notices = notices.splice(notices.length - 10);
        }
        if (educations.length > 10) {
          educations = educations.splice(educations.length - 10);
        }
        if (partyBuildDynamics.length > 7){
          partyBuildDynamics = partyBuildDynamics.splice(partyBuildDynamics.length - 7);
        }
        if (meetLessons.length > 7){
          meetLessons = meetLessons.splice(meetLessons.length - 7);
        }
        this.setState({
          notices: notices, // 范家故事
          educations: educations, // 相关政策
          partyBuildDynamics: partyBuildDynamics, // 党建动态
          meetLessons: meetLessons, // 新闻资讯
        });
      } else {
        this.setState({
          notices: [], // 范家故事
          educations: [], // 相关政策
          partyBuildDynamics: [], // 党建动态
          allNemeetLessonsws: [], // 新闻资讯
        });
      }
    }).catch(() => {
      this.setState({
        notices: [], // 范家故事
        educations: [], // 相关政策
        partyBuildDynamics: [], // 党建动态
        meetLessons: [], // 新闻资讯
      });
    });
  }

  getAllAdvertises = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllAdvertisement',
    }).then((res) => {
      if (res.data.status === 200){
        const data: any[] = res.data.data || [];
        let partyAdvertises: any[] = [];
        data.map((item => {
          if (item.type == 1){
            partyAdvertises.push(item);
          }
        }));
        partyAdvertises = partyAdvertises.slice(0, 4);
        this.setState({
          partyAdvertises: partyAdvertises,
        });
      } else {
        this.setState({
          partyAdvertises: [],
        });
      }
    }).catch(() => {
      this.setState({
        partyAdvertises: [],
      });
    });
  }

  getAllVideos = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getStudyInformation',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        let videos = [];
        if (data && data.length > 6){
          videos = data.slice(data.length - 6, data.length);
        } else {
          videos = data;
        }
        this.setState({
          videos: videos,
        });
      } else {
        this.setState({
          videos: [],
        });
      }
    }).catch(() => {
      this.setState({
        videos: [],
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

  closeViewModal = () => {
    this.setState({
      viewModalVisible: false,
    });
  }


  onFanStoryChange = (current: any) => {
    this.setState({
      currentNotice: current,
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
      educations, // 范家故事
      notices, // 相关政策
      partyBuildDynamics, // 党建动态
      meetLessons, // 新闻资讯
      currentNotice,
      partyAdvertises,
      dynamic,
      partyPage,
      videos,
    } = this.state;

    let last3Notice = [];
    if (notices.length > 3){
      last3Notice = notices.slice(notices.length - 3, notices.length);
    } else {
      last3Notice = notices;
    }

    let last4PartyDynamics = [];
    if (partyBuildDynamics.length > 4){
      last4PartyDynamics = partyBuildDynamics.slice(partyBuildDynamics.length - 4, partyBuildDynamics.length);
    } else {
      last4PartyDynamics = partyBuildDynamics;
    }
    return (
      <div className="small-town-dashboard" style={{height: boxHeight}}>
        <Row className="data-board fanstory-adver-pr">
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 6}}>
            <div className="card-box fan-story1">
              <div className="title-box">
                <span></span>
                <span></span>
              </div>
              <div className="fan-content">
                <div className="rotation-box">
                  <div className="rotation">
                    <Carousel autoplay afterChange={this.onFanStoryChange}>
                      {
                        last3Notice.map((item: any, index: number) => {
                          return <div key={`${index}`}>
                            <img src={item.icon} style={contentStyle} alt="图片"/>
                          </div>;
                        })
                      }
                    </Carousel>
                  </div>
                  <div className="rotation-title-box">
                    <div className="rotation-title">
                      {notices[notices.length - currentNotice - 1]?.title}
                    </div>
                    <div className="rotation-time">
                      {notices[notices.length - currentNotice - 1]?.createTime}
                    </div>
                    <div className="rotation-content">
                      {notices[notices.length - currentNotice - 1]?.subTitle}
                    </div>
                  </div>
                </div>
                <div className="story-list-box">
                  <List
                    size="small"
                    bordered={false}
                    dataSource={notices}
                    renderItem={(item: any) => <List.Item><div onClick={e => this.viewDynamic(item, '相关公告')} className="story-link">· {item.title}</div></List.Item>}/>
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
                  partyAdvertises.map((item: any, index: number) => {
                    return <div className="advertise-content" key={`${index}`}>
                      <img src={item.imageUrl} alt="图片"/>
                    </div>;
                  })
                }
              </Carousel>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 6}}>
            <div className="card-box poor-rule1">
              <div className="title-box">
                <span></span>
                <span></span>
              </div>
              <div className="rules-box">
                <List
                  size="small"
                  bordered={false}
                  dataSource={educations}
                  renderItem={(item: any) => <List.Item>
                    <div className="story-link" onClick={e => this.viewDynamic(item, '主题教育')}>· {item.title}</div>
                    <div className="date-box">{item.createTime}</div>
                  </List.Item>}/>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="row-party-news-far">
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 8}}>
            <div className="card-box party-content1">
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
                      last4PartyDynamics.map((item: any, index: number) => {
                        return <span className={partyPage == index ? 'imgply-box-pages-partyPage-checked' : 'imgply-box-pages-partyPage'} key={`${index}`}>{index + 1}</span>;
                      })
                    }
                  </div>
                  <Carousel afterChange={this.partyPageChange} style={{height: '100%'}} autoplay dots={false}>
                    {
                      last4PartyDynamics.map((item: any, index: number) => {
                        return <div className="advertise-content" key={`${index}`}>
                          <img src={item.icon || partyLogo} alt="图片"/>
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
            <div className="card-box news-information1">
              <div className="title-box">
                <div className="title-icon-text">
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span className="spancolor more" onClick={e => this.jumpToMoreinfo(6)}>更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="news-box">
                <List
                  size="small"
                  bordered={false}
                  dataSource={meetLessons}
                  renderItem={(item: any) => <List.Item>
                    <div className="story-link" onClick={e => this.viewDynamic(item, '三会一课')}>· {item.title}</div>
                    <div className="date-box">{item.createTime}</div>
                  </List.Item>}/>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 8}}>
            <div className="card-box farm-product1">
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
                      videos[0] ?
                      <img src={videos[0]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[0]?.title
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      videos[1] ?
                      <img src={videos[1]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[1]?.title
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      videos[2] ?
                      <img src={videos[2]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[2]?.title
                      }
                    </div>
                  </div>
                </div>
                <div className="farm-p-img-fr">
                  <div className="farm-p-img-fr-img-title">
                    {
                      videos[3] ?
                      <img src={videos[3]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[3]?.title
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      videos[4] ?
                      <img src={videos[4]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[4]?.title
                      }
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    {
                      videos[5] ?
                      <img src={videos[5]?.cover} alt="farm"/>
                      : <div className="farm-p-img-fr-img-title-ig"></div>
                    }
                    <div className="product-name">
                      {
                        videos[5]?.title
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <DynamicViewModal dynamic={dynamic} visible={viewModalVisible} close={this.closeViewModal} title={this.state.viewTitle}/>
      </div>
    );
  }
}
