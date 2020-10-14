import React, {SFC} from 'react';
import { Row, Col, List, Carousel } from 'antd';
import '../../theme/style/dashboard/Layout.scss';
// import { DeploymentUnitOutlined, GoldOutlined, VideoCameraOutlined, TrophyOutlined } from '@ant-design/icons';
import GreenHouseChart from './GreenHouseChart';
import MonitorRadar from '../../components/MonitorRadar';
import '../../theme/style/common.scss';
import '../../theme/style/dashboard/FanStory.scss';
import '../../theme/style/dashboard/Advertise.scss';

const DashBoard: SFC = () => {


  const monitorRadarData = [
    {
      item: '大棚',
      user: '全部告警',
      score: 70,
    },
    {
      item: '养殖',
      user: '全部告警',
      score: 60,
    },
    {
      item: '疫情',
      user: '全部告警',
      score: 60,
    },
    {
      item: '景区',
      user: '全部告警',
      score: 40,
    },
    {
      item: '滑坡',
      user: '全部告警',
      score: 60,
    },
  ];

  const data = [
    '中共中央国务院印发深化新时代教育评价改革总体方案',
    '这十条“深”改经验，“圳”好！',
    '在“凤城”名企，总书记再提“自主创新”有何深意？',
    '十三届全国人大常委会第二十二次会议在京举行',
    '十三届全国人大常委会第二十二次会议在京举行',
    '十三届全国人大常委会第二十二次会议在京举行',
  ];

  const contentStyle: any = {
    height: '120px',
    color: '#fff',
    lineHeight: '120px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="small-town-dashboard">
      <Row className="data-board">
        <Col xs={{ span: 24}} md={{ span: 6}} xl={{ span: 6}}>
          <div className="card-box fan-story">
            <div className="title-box">
              <span className="title-icon"></span>
              <span>范家故事</span>
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
                  《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的,《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的.《乘风破浪的姐姐》里，她是“最多余”的女艺人观众这是硬塞进来的
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
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}}>
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
        <Col xs={{ span: 24}} md={{ span: 6}} xl={{ span: 6}}>
        </Col>
      </Row>
      <Row className="gree-house">
        <Col xs={{ span: 24}} md={{ span: 8}} xl={{ span: 8}}>
          <div className="card-box"><MonitorRadar title="告警分布" data={monitorRadarData}/></div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 16}} xl={{ span: 16}}>
          <GreenHouseChart/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 16}} xl={{ span: 16}}>
          <GreenHouseChart/>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
