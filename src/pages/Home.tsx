import HerderBar from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import React from 'react';
import { Layout } from 'antd';
import '../theme/style/Home.scss';

const {Content} = Layout;


const Home: React.FC = () => {
  return (
    <Layout className="home-page">
      <HerderBar/>
      <Layout>
        <LeftMenu></LeftMenu>
        <Layout>
          <Content>
            content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
