import React, {SFC} from 'react';
import MonitorRadar from './MonitorRadar';
import '../theme/style/components/monitor.scss';

const Monitor: SFC = () => {

  return (
    <div className="card-box monitor">
      <div className="monitior-chart-box">
        <MonitorRadar title="告警"/>
      </div>
      <div className="monitor-data-box">
        <div className="monitor-total">12315</div>
        <div className="monitor-rate">35%</div>
      </div>
    </div>
  );
};

export default Monitor;
