import React, {SFC} from 'react';
import PageTitle from '../../components/PageTitle';
import EpidemicList from '../../components/EpidemicList';
import { Row, Col } from 'antd';
import '../../theme/style/epidemic/layout.scss';


const EpidemicSituation: SFC = () => {

  return (
    <div className="epidemic">
      <PageTitle title="疫情监控"/>
      <Row>
        <Col span={24}>
          <EpidemicList pagination={{pageSize: 5}}/>
        </Col>
      </Row>
    </div>
  );
};

export default EpidemicSituation;
