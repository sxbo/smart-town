import {DashBoard} from './dashboard';
import {BreedHome} from './breed';
import {EpidemicSituation} from './epidemic';
import {GreenHouse} from './greenhouse';
import {HelpPoor} from './helppoor';
import {Landslide} from './landslide';
import {PartyBuild} from './partybuild';
import {ScenicMonitor} from './scenic';
import HeaderBar from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import '../theme/style/components/Home.scss';
const {Content} = Layout;


const Home: React.FC = () => {
  return (
    <Layout className="home-page">
      <HeaderBar/>
      <Layout className="asider-content">
        <LeftMenu></LeftMenu>
        <Layout>
          <Content>
            <Switch>
              <Route path="/home/dashboard" exact component={DashBoard}></Route>
              <Route path="/home/breed" component={BreedHome}></Route>
              <Route path="/home/epidemic" component={EpidemicSituation}></Route>
              <Route path="/home/greenhouse" component={GreenHouse}></Route>
              <Route path="/home/helppoor" component={HelpPoor}></Route>
              <Route path="/home/landslide" component={Landslide}></Route>
              <Route path="/home/partybuild" component={PartyBuild}></Route>
              <Route path="/home/scenicmonitor" component={ScenicMonitor}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
