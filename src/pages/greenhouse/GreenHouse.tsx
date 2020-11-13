/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import GreenHouseList from './GreenHouseList';
import PageTitle from '../../components/PageTitle';

const GreenHouse: SFC = () => {


  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能大棚"/>
      <Row>
        <Col span={24}>
          <GreenHouseList pagination={{pageSize: 10}}/>
        </Col>
      </Row>
    </div>
  );
};

export default GreenHouse;


