/* eslint-disable no-shadow */
import React, {SFC, useState} from 'react';
import PageTitle from '../../components/PageTitle';
import EpidemicList from './EpidemicList';
import {colors} from '../../const/const';

import { Row, Col } from 'antd';
import '../../theme/style/epidemic/layout.scss';


const EpidemicSituation: SFC = () => {

  const [cureCount, setCureCount] = useState(0);
  const [diagnose, setDiagnose] = useState(0);
  const [separate, setSeparate] = useState(0);
  const [asymptomatic, setAsymptomatic] = useState(0);
  const [nomal, setNomal] = useState(0);

  const countEpidemic = (diagnose: any, cure: any, separate: any, asymptomatic: any, nomal: any) => {
    setCureCount(cure);
    setDiagnose(diagnose);
    setSeparate(separate);
    setAsymptomatic(asymptomatic);
    setNomal(nomal);
  };

  return (
    <div className="epidemic">
      <PageTitle title="疫情防控">
        <span style={{display: 'inline-block', width: '10px', background: colors.danger, height: '10px'}}></span><span style={{marginRight: '20px'}}>确诊： {diagnose}</span>
				<span style={{display: 'inline-block', width: '10px', background: colors.success, height: '10px'}}></span><span style={{marginRight: '20px'}}>治愈：{cureCount}</span>
        <span style={{display: 'inline-block', width: '10px', background: colors.warn, height: '10px'}}></span><span style={{marginRight: '20px'}}>隔离：{separate}</span>
        <span style={{display: 'inline-block', width: '10px', background: colors.primary, height: '10px'}}></span><span style={{marginRight: '20px'}}>无症状：{asymptomatic}</span>
        <span style={{display: 'inline-block', width: '10px', background: colors.success, height: '10px'}}></span><span style={{marginRight: '20px'}}>已解除：{nomal}</span>
      </PageTitle>
      <Row>
        <Col span={24}>
          <EpidemicList pagination={{pageSize: 10}} count={countEpidemic}/>
        </Col>
      </Row>
    </div>
  );
};

export default EpidemicSituation;
