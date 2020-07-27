import React, {SFC} from 'react';
import '../theme/style/Login.scss';
import logo from '../theme/img/logo.svg';
import {Carousel} from 'antd';


const Login: SFC = () => (<>
  <div className="login-top">
    <div className="login-header">
      <div className="logo">
        <img src={logo} alt="logo"/>
        <span>智慧小镇</span>
      </div>
    </div>
    <div className="login-top-container">
      <Carousel autoplay>
        <div className="carousel1"></div>
        <div className="carousel2"></div>
        <div className="carousel3"></div>
      </Carousel>
    </div>
  </div>
  <div className="login-bottom">
    <div className="ad-item ad-bg1">
      <div>智能</div>
    </div>
    <div className="ad-item ad-bg2">
      <div>高效</div>
    </div>
    <div className="ad-item ad-bg3">
      <div>便捷</div>
    </div>
    <div className="ad-item ad-bg4">
      <div>灵活</div>
    </div>
  </div>
</>);

export default Login;
