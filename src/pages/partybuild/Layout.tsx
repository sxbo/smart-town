import React, {SFC} from 'react';
import {Tabs} from 'antd';
import PageTitle from '../../components/PageTitle';

import '../../theme/style/partybuild/layout.scss';
import '../../theme/style/common.scss';
import Orginization from './Orginization';
import Video from './Video';
import Advertisement from './Advertisement';
import Dynamic from './Dynamic';
import HorseRaceLamp from './HorseRaceLamp';

const { TabPane } = Tabs;


const PartyBuild: SFC = () => {


  return (
    <div className="party-build">
      <PageTitle title="智慧党建"></PageTitle>
      <div className="party-build-content">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                组织管理
              </span>
            }
            key="1">
            <Orginization />
          </TabPane>
          <TabPane
            tab={
              <span>
                视频学习
              </span>
            }
            key="2">
            <Video />
          </TabPane>
          <TabPane
            tab={
              <span>
                跑马灯
              </span>
            }
            key="3">
            <HorseRaceLamp/>
          </TabPane>
          <TabPane
            tab={
              <span>
                动态
              </span>
            }
            key="4">
            <Dynamic type="partyBuild"/>
          </TabPane>
          <TabPane
            tab={
              <span>
                广告
              </span>
            }
            key="5">
            <Advertisement/>
          </TabPane>
          <TabPane
            tab={
              <span>
                农产品宣传
              </span>
            }
            key="6">
              <Dynamic type="farmProduct"/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default PartyBuild;
