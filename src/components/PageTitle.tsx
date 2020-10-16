import React, {SFC} from 'react';
import '../theme/style/common.scss';
import {Button} from 'antd';
import '../theme/style/components/PageTitle.scss';


interface PageTitleProps{
  title: string;
  lookMonitor?: () => void;
  description?: string;
}

const PageTitle: SFC<PageTitleProps> = (props) => {

  const {title, lookMonitor} = props;

  return (
    <div className="pagetitle">
      <div className="title">{title}</div>
      {
        lookMonitor ?
          <div className="look-monitor">
            <Button type="primary">查看监控</Button>
          </div> :
          ''
      }
      {props.children}
    </div>
  );
};

export default PageTitle;
