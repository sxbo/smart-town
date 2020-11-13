/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import BreedList from './BreedList';
import PageTitle from '../../components/PageTitle';

const BreedHome: SFC = () => {

  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能养殖"/>
      <Row>
        <Col span={24}>
          <BreedList pagination={{pageSize: 10}}/>
        </Col>
      </Row>
    </div>
  );
};

export default BreedHome;


