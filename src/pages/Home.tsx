import {DashBoard} from './dashboard';

import HeaderBar from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import '../theme/style/Home.scss';
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
              <Route path="/home/ds" component={DashBoard}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
