/* eslint-disable no-invalid-this */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import {colors, epidemicTypes} from '../../const/const';
import {List} from 'antd';
import '../../theme/style/datascreen/Epidemic.scss';
import axios from 'axios';
import moment from 'moment';

export default class Epidemic extends Component{

    state = {
        diagnose: 0,
        cure: 0,
        separate: 0,
        asymptomatic: 0,
        nomal: 0,
        separates: [],
    }

    componentDidMount(){
        this.getEpidemics();
    }

    getEpidemics = (url: string = 'api/epidemicSurveillance') => {
        axios({
          method: 'GET',
          url: url,
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data.data || [];
            let diagnose: any = 0;
            let cure: any = 0;
            let separate: any = 0;
            let separates: any[] = [];
            let asymptomatic: any = 0;
            let nomal: any = 0;
            data.map((item: any) => {
              if (item.state == 1){
                diagnose++;
              } else if (item.state == 2) {
                cure++;
              } else if (item.state == 3) {
                separate++;
                const today = moment(new Date(), 'YYYY-MM-DD').valueOf();
                const createTimeStr = item.createTime || moment().format('YYYY-MM-DD');
                const createTime = moment(createTimeStr, 'YYYY-MM-DD').valueOf();
                const dura = (today - createTime) / (24 * 60 * 60 * 1000);
                item.restDay = 14 - Math.ceil(dura) + 1;
                separates.push(item);
              } else if (item.state == 4){
                asymptomatic++;
              } else {
                nomal++;
              }
            });
            separates.splice(0, 0, {name: '姓名', contact: '联系方式', createTime: '上报时间', restDay: '剩余隔离天数', state: '状态'});
            this.setState({diagnose, cure, separate, asymptomatic, nomal, separates});
          }
        }).catch(() => {
            this.setState({diagnose: 0, cure: 0, separate: 0, asymptomatic: 0, nomal: 0, separates: []});
        });
    };

    renderState = (state: any) => {
      const type = epidemicTypes.find(item => item.type == state);
      return type?.label || state;
    }

    render() {
        const {diagnose = 0, cure = 0, separate = 0, asymptomatic = 0, nomal, separates = []} = this.state;
        return <BackShadow className="screen-epidemic">
            <ScreenTitle title="疫情防控"></ScreenTitle>
            <div className="s-pei-b-count-box">
              <div className="s-pei-u">
                  <span className="s-pei-icon" style={{background: colors.danger}}></span>
                  <span>确诊：{diagnose} 人</span>
              </div>
              <div className="s-pei-u">
                  <span className="s-pei-icon" style={{background: colors.success}}></span>
                  <span>治愈：{cure} 人</span>
              </div>
              <div className="s-pei-u">
                  <span className="s-pei-icon" style={{background: colors.warn}}></span>
                  <span>隔离：{separate} 人</span>
              </div>
              <div className="s-pei-u">
                  <span className="s-pei-icon" style={{background: colors.primary}}></span>
                  <span>无症状：{asymptomatic} 人</span>
              </div>
              <div className="s-pei-u">
                  <span className="s-pei-icon" style={{background: colors.success}}></span>
                  <span>已解除：{nomal} 人</span>
              </div>
            </div>
            <div className="s-pei-b-list">
              <List
                size="small"
                bordered={false}
                dataSource={separates}
                renderItem={(item: any) =>
                  <List.Item>
                      <div style={{width: '15%', textAlign: 'center', overflow: 'hidden'}}>{item.name}</div>
                      <div style={{width: '20%', textAlign: 'center', overflow: 'hidden'}}>{item.contact}</div>
                      <div style={{width: '20%', textAlign: 'center', overflow: 'hidden'}}>{item.createTime}</div>
                      <div style={{width: '25%', textAlign: 'center', overflow: 'hidden'}}>{item.restDay}</div>
                      <div style={{width: '15%', textAlign: 'center', overflow: 'hidden'}}>{this.renderState(item.state)}</div>
                  </List.Item>
              }/>
            </div>
        </BackShadow>;
    }
}
