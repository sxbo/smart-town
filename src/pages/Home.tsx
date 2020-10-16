import {PartyShow} from './partyshow';
import {DashBoard} from './dashboard';
import {BreedHome} from './breed';
import {EpidemicSituation} from './epidemic';
import {GreenHouse} from './greenhouse';
import {HelpPoor} from './helppoor';
import {Landslide} from './landslide';
import {PartyBuild} from './partybuild';
import {ScenicMonitor} from './scenic';
import {VideoMonitor} from './videoMonitor';
import HeaderBar from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import '../theme/style/components/Home.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DataScreen from './datascreen';
import SystemSetting from './sysSeting';
import FarmProduct from './farmProduct/FarmProduct';
import Convenient from './convenient/Convenient';
import MoreInfoList from './dashboard/MoreInfoList';
const {Content} = Layout;


const Home: React.FC = () => {
  const { isLogin } = useSelector((state: RootState) => ({isLogin: state.login.isLogin}));
  const token = localStorage.getItem('token');

  if (!isLogin && !token){
    return <Redirect to={{ pathname: '/login'}}/>;
  }
  return (
    <Layout className="home-page">
      <HeaderBar/>
      <Layout className="asider-content">
        <LeftMenu></LeftMenu>
        <Layout>
          <Content>
            <Switch>
              <Route path="/" exact component={DashBoard}></Route>
              <Route path="/datascreen" component={DataScreen}></Route>
              <Route path="/setting" component={SystemSetting}></Route>
              <Route path="/breed" component={BreedHome}></Route>
              <Route path="/epidemic" component={EpidemicSituation}></Route>
              <Route path="/greenhouse" component={GreenHouse}></Route>
              <Route path="/helppoor" component={HelpPoor}></Route>
              <Route path="/landslide" component={Landslide}></Route>
              <Route path="/partybuild" component={PartyBuild}></Route>
              <Route path="/scenicmonitor" component={ScenicMonitor}></Route>
              <Route path="/videomonitor" component={VideoMonitor}></Route>
              <Route path="/farmProduct" component={FarmProduct}></Route>
              <Route path="/convenient" component={Convenient}></Route>
              <Route path="/moreinfo" component={MoreInfoList}></Route>
              <Route path="/partyshow" exact component={PartyShow}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
