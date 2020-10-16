/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import { Row, Col, List, Carousel } from 'antd';
import '../../theme/style/partyshow/Layout1.scss';
import DynamicViewModal from '../../components/DynamicViewModal';
// import { DeploymentUnitOutlined, GoldOutlined, VideoCameraOutlined, TrophyOutlined } from '@ant-design/icons';
import '../../theme/style/common.scss';
import '../../theme/style/partyshow/FanStory1.scss';
import '../../theme/style/partyshow/Advertise1.scss';
import '../../theme/style/partyshow/Party1.scss';
import '../../theme/style/partyshow/FarmProduct1.scss';
import '../../theme/style/partyshow/NewInfo1.scss';
import '../../theme/style/partyshow/PoorRule1.scss';


export default class PartyShow extends Component<any, any> {

  constructor(props: any){
    super(props);
    this.state = {
      viewModalVisible: false,
      dynamic: '',
      boxHeight: '100%',
    };
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
  }

  viewDynamic = (dynamic: any) => {
    this.setState({
      viewModalVisible: true,
      dynamic: dynamic,
    });
  }

  closeViewModal = () => {
    this.setState({
      viewModalVisible: false,
    });
  }

  render() {

    const data = [
      '中共中央国务院印发深化新时代教育评价改革总体方案',
      '这十条“深”改经验，“圳”好！',
      '在“凤城”名企，总书记再提“自主创新”有何深意？',
      '十三届全国人大常委会第二十二次会议在京举行',
      '十三届全国人大常委会第二十二次会议在京举行',
      '十三届全国人大常委会第二十二次会议在京举行',
      '中共中央国务院印发深化新时代教育评价改革总体方案',
      '这十条“深”改经验，“圳”好！',
      '在“凤城”名企，总书记再提“自主创新”有何深意？',
      '这十条“深”改经验，“圳”好！',
    ];

    const contentStyle: any = {
      height: '1rem',
      color: '#fff',
      lineHeight: '120px',
      textAlign: 'center',
      background: '#364d79',
    };

    const {viewModalVisible, boxHeight} = this.state;
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
                    <Carousel>
                      <div>
                        <h3 style={contentStyle}>1</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>2</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>3</h3>
                      </div>
                    </Carousel>
                  </div>
                  <div className="rotation-title-box">
                    <div className="rotation-title">
                      《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的
                    </div>
                    <div className="rotation-time">
                      2019-12-29
                    </div>
                    <div className="rotation-content">
                    《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的,《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的.
                    </div>
                  </div>
                </div>
                <div className="story-list-box">
                  <List
                    size="small"
                    bordered={false}
                    dataSource={data}
                    renderItem={item => <List.Item><div className="story-link">· {item}</div></List.Item>}/>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24}} md={{ span: 24}} xl={{ span: 12}}>
            <div className="card-box advertise">
              <Carousel style={{height: '100%'}} dots={false}>
                <div className="advertise-content">
                  a
                </div>
                <div className="advertise-content">
                  b
                </div>
                <div className="advertise-content">
                  c
                </div>
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
                  dataSource={data}
                  renderItem={item => <List.Item>
                    <div className="story-link">· {item}</div>
                    <div className="date-box">2020-09-26</div>
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
                  <span className="spancolor">更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="imgply-news-box">
                <div className="imgply-box">
                  <Carousel style={{height: '100%'}} dots={false}>
                    <div className="advertise-content">
                      a
                    </div>
                    <div className="advertise-content">
                      b
                    </div>
                    <div className="advertise-content">
                      c
                    </div>
                  </Carousel>
                </div>
                <div className="little-new-news">
                 
                  <div>
                    <List
                      size="small"
                      bordered={false}
                      dataSource={data}
                      renderItem={item => <List.Item>
                        <div className="story-link">· {item}</div>
                        <div className="date-box">2020-09-26</div>
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
                 <span className="spancolor">更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="news-box">
                <List
                  size="small"
                  bordered={false}
                  dataSource={data}
                  renderItem={item => <List.Item>
                    <div className="story-link">· {item}</div>
                    <div className="date-box">2020-09-26</div>
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
                  <span className="spancolor">更多 &gt;&gt;</span>
                </div>
              </div>
              <div className="farm-p-img">
                <div className="farm-p-img-fr">
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                </div>
                <div className="farm-p-img-fr">
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                  <div className="farm-p-img-fr-img-title">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="farm"/>
                    <div className="product-name">
                      产品1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <DynamicViewModal visible={viewModalVisible} close={this.closeViewModal} title="查看动态"/>
      </div>
    );
  }
}
