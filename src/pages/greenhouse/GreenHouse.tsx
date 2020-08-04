import React, {SFC} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import GreenHouseList from '../../components/GreenHouseList';

const GreenHouse: SFC = () => {

  // const cardData: DataCardProp[] = [
  //   {icon: <DeploymentUnitOutlined style={{fontSize: '50px', color: '#00c292'}}/>, num: 123556, text: '智能大棚（个）'},
  //   {icon: <GoldOutlined style={{fontSize: '50px', color: '#ab8ce4'}}/>, num: 4568, text: '养殖场（个）'},
  //   {icon: <TrophyOutlined style={{fontSize: '50px', color: '#03a9f3'}}/>, num: 885112, text: '精准扶贫（人）'},
  //   {icon: <VideoCameraOutlined style={{fontSize: '50px', color: '#fb9678'}}/>, num: 65334, text: '监控点（个）'},
  // ];

  return (
    <div className="small-town-greenhouse">
      <Row>
        <Col span={24}>
          <GreenHouseList pagination={{pageSize: 5}}/>
        </Col>
      </Row>
    </div>
  );
};

export default GreenHouse;


