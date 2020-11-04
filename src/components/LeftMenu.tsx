/* eslint-disable max-len */
import React, {SFC} from 'react';
import {useSelector} from 'react-redux';
import { Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {RootState} from '../store';
import {
  HomeOutlined,
  StarOutlined,
  FallOutlined,
  DotChartOutlined,
  AreaChartOutlined,
  AimOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
  LinkOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

import '../theme/style/components/LeftMenu.scss';
const { Sider } = Layout;

const LeftMenu:SFC = () => {
  const FarmSvg = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20671" width="16" height="16">
      <path d="M62.01344 156.76416c37.14048 0 93.97248 4.5056 153.72288 25.97888 42.1376 15.14496 77.18912 36.49536 104.17152 63.47776 26.9824 26.97216 48.34304 62.03392 63.488 104.17152 18.06336 50.29888 27.17696 108.55424 25.856 164.41344a466.944 466.944 0 0 1-10.71104 0.13312c-37.15072 0-93.97248-4.5056-153.7024-25.96864-42.16832-15.1552-77.21984-36.51584-104.192-63.49824-26.97216-26.96192-48.3328-62.01344-63.488-104.17152-18.0736-50.2784-27.17696-108.53376-25.856-164.4032 3.56352-0.09216 7.14752-0.13312 10.71104-0.13312m910.6432 0.69632c-0.89088 32.45056-6.8096 94.39232-35.2768 161.52576-16.26112 38.33856-37.57056 70.85056-63.35488 96.62464-25.76384 25.76384-58.25536 47.07328-96.60416 63.3344-66.36544 28.13952-126.74048 34.42688-161.52576 35.30752 0.89088-32.44032 6.81984-94.3616 35.29728-161.54624 16.24064-38.31808 37.55008-70.81984 63.32416-96.60416 25.79456-25.78432 58.29632-47.09376 96.63488-63.34464 66.37568-28.14976 126.75072-34.42688 161.50528-35.29728m-910.6432-51.89632c-6.59456 0-13.03552 0.12288-19.34336 0.36864-4.9152 0.21504-4.9152 0.21504-6.41024 0.32768l-33.21856 2.34496-2.3552 33.21856c-0.1024 1.49504-0.1024 1.49504-0.32768 6.41024-2.12992 55.93088 4.73088 123.904 28.6208 190.38208 17.17248 47.79008 41.91232 89.51808 75.4688 123.07456 33.55648 33.55648 75.28448 58.28608 123.07456 75.4688 58.9824 21.1968 119.1424 28.98944 171.01824 28.98944 6.59456 0 13.04576-0.13312 19.36384-0.36864 4.9152-0.21504 4.9152-0.21504 6.41024-0.31744l33.21856-2.34496 2.34496-33.21856c0.1024-1.49504 0.1024-1.49504 0.32768-6.41024 2.12992-55.92064-4.74112-123.89376-28.6208-190.38208-17.17248-47.77984-41.91232-89.50784-75.4688-123.07456-33.55648-33.54624-75.28448-58.28608-123.07456-75.45856-58.9824-21.20704-119.15264-29.00992-171.02848-29.00992z m919.81824 0.58368c-51.69152 0-121.12896 9.99424-190.6688 39.4752-43.19232 18.30912-81.33632 42.78272-112.8448 74.27072-31.488 31.49824-55.9616 69.65248-74.26048 112.83456-30.19776 71.22944-39.95648 142.34624-39.4752 194.39616l0.02048 0.74752 0.6656 36.99712 36.98688 0.6656 0.75776 0.01024 3.64544 0.02048c51.70176 0 121.16992-9.99424 190.75072-39.48544 43.18208-18.30912 81.32608-42.77248 112.82432-74.27072 31.49824-31.49824 55.9616-69.64224 74.28096-112.83456 30.19776-71.2192 39.936-142.336 39.46496-194.38592l-0.01024-0.75776-0.6656-36.98688-36.99712-0.6656-0.74752-0.01024c-1.23904-0.02048-2.47808-0.02048-3.72736-0.02048zM509.44 652.8c-17.89952 0-32.39936 19.68128-32.39936 43.93984v175.79008c0 24.2688 14.51008 43.95008 32.39936 43.95008 17.87904 0 32.39936-19.68128 32.39936-43.95008V696.73984c0-24.25856-14.52032-43.93984-32.39936-43.93984z" p-id="20672" fill="#ffffff">
      </path>
    </svg>
  );
  const FarmIcon = (props: any) => <Icon component={FarmSvg} {...props} />;
  const GMSvg = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11616" width="14" height="14">
      <path d="M512 483.7c-7.9 0-15.8-1.3-22.4-4L97 322.7c-16.8-6.7-22.7-20.5-22.7-31.1s6-24.4 22.7-31.1l392.6-157c13.2-5.3 31.7-5.3 44.9 0l392.6 157c16.8 6.7 22.7 20.5 22.7 31.1s-6 24.4-22.7 31.1l-392.6 157c-6.7 2.6-14.6 4-22.5 4z m-1.9-56.8c1 0.2 2.8 0.2 3.7 0L852 291.6 513.9 156.3c-1-0.2-2.8-0.2-3.7 0L171.9 291.6l338.2 135.3z m4-0.1z m-4.2 0z m4.2-270.5z m-4.2 0z" fill="#ffffff" p-id="11617"></path><path d="M512 660.9c-7.9 0-15.8-1.3-22.4-4L97 499.9c-14.5-5.8-21.6-22.3-15.8-36.8 5.8-14.5 22.3-21.6 36.8-15.8l392.1 156.8c1 0.2 2.8 0.2 3.7 0l392.1-156.8c14.5-5.8 31 1.3 36.8 15.8 5.8 14.5-1.3 31-15.8 36.8l-392.6 157c-6.5 2.6-14.4 4-22.3 4z" fill="#ffffff" p-id="11618"></path><path d="M512 854.9c-7.9 0-15.8-1.3-22.4-4L97 693.9c-14.5-5.8-21.6-22.3-15.8-36.8 5.8-14.5 22.3-21.6 36.8-15.8l392.1 156.8c1 0.2 2.8 0.2 3.7 0l392.1-156.8c14.5-5.8 31 1.3 36.8 15.8 5.8 14.5-1.3 31-15.8 36.8l-392.6 157c-6.5 2.7-14.4 4-22.3 4z" fill="#ffffff" p-id="11619">
      </path>
    </svg>

  );
  const GMIcon = (props: any) => <Icon component={GMSvg} {...props} />;

  const DataSvg = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18735" width="14" height="14">
      <path d="M458.4 131.8C214 131.8 15.8 330 15.8 574.4s198.1 442.5 442.5 442.5 442.5-198.1 442.5-442.5H458.4V131.8z" fill="#ffffff" p-id="18736"></path><path d="M566 16.9v442.5h442.5c0-244.3-198.1-442.5-442.5-442.5z" fill="#ffffff" p-id="18737">
      </path>
    </svg>
  );
  const DataIcon = (props: any) => <Icon component={DataSvg} {...props} />;

  const ControlSvg = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22109" width="15" height="15">
      <path d="M500.224 305.664L267.264 467.968c-6.656 4.608-9.728 13.312-7.168 20.992l89.088 263.168c2.56 7.68 10.24 12.8 18.432 12.8h288.256c8.192 0 15.872-5.12 18.432-12.8l89.088-263.168c2.56-7.68-0.512-15.872-7.168-20.992l-233.472-162.304c-6.144-5.12-15.36-5.12-22.528 0zM355.328 506.88L512 397.824 668.672 506.88l-59.904 176.64H415.232L355.328 506.88z" p-id="22110" fill="#ffffff"></path>
      <path d="M962.048 385.024l-428.544-311.296c-13.312-8.704-31.232-8.704-44.032 1.024L61.952 385.024c-13.312 9.728-18.944 27.136-13.824 43.008l163.328 502.272c5.12 15.872 19.968 26.624 36.864 26.624h528.384c16.896 0 31.232-10.752 36.864-26.624l163.328-502.272c4.608-15.872-1.024-33.28-14.848-43.008z m-67.584 45.568l-145.92 449.024H275.968L129.536 430.592 512 153.6l382.464 276.992z" p-id="22111" fill="#ffffff">
      </path>
    </svg>
  );

  const ControlIcon = (props: any) => <Icon component={ControlSvg} {...props} />;

  const dashboardState = useSelector((state: RootState) => ({menuCollapsed: state.dashboard.menuCollapsed}));

  return (
    <Sider collapsed={dashboardState.menuCollapsed} width={200} className="site-layout-background">
      <Menu className="leftbg"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">主页<span style={{visibility: 'hidden'}}>数据</span></Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
          <Link to="/datascreen">数据大屏</Link>
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<FarmIcon/>} title="农业" >
          <Menu.Item key="4" icon={<DeploymentUnitOutlined />}>
            <Link to="/greenhouse">智能大棚</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<GoldOutlined />}>
            <Link to="/breed">智能养殖</Link>
          </Menu.Item>
          <Menu.Item key="20" icon={<SwapOutlined />}>
            <Link to="/landCirculation">土地流转</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            <Link to="/farmProduct">农副产品</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<LinkOutlined />}>
            <a href="http://www.erp.900nong.com" target="_blank" rel="noopener noreferrer">农资监管</a>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<ControlIcon/>} title="综合治理">
          <Menu.Item key="9" icon={<DotChartOutlined />}>
            <Link to="/epidemic">疫情防控</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<AreaChartOutlined />}>
            <Link to="/scenicmonitor">景点监控</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FallOutlined />}>
            <Link to="/landslide">山体滑坡</Link>
          </Menu.Item>
          <Menu.Item key="13" icon={<DesktopOutlined />}>
            <Link to="/videomonitor">视频监控</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<GMIcon/>} title="智慧政务">
          <Menu.Item key="8" icon={<AimOutlined />}>
            <Link to="/helppoor">精准扶贫</Link>
          </Menu.Item>
          <Menu.Item key="14" icon={<CustomerServiceOutlined/>}>
            <Link to="/convenient">便民服务</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="12" icon={<StarOutlined />}>
          <Link to="/partyshow">智慧党建</Link>
        </Menu.Item>
      <Menu.SubMenu key="sub4" icon={<DataIcon/>} title="数据管理">
         <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/setting">系统设置</Link>
         </Menu.Item>
         <Menu.Item key="15" icon={<FileTextOutlined />}>
            <Link to="/partybuild">新闻动态</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};


export default LeftMenu;
