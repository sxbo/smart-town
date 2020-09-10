import React, {Component} from 'react';

import '../../theme/style/datascreen/screenTitle.scss';

interface DataTitleProp{
  title: string
}

export default class DataWapper extends Component<DataTitleProp>{
  render() {
    const {title} = this.props;

    return (
      <div className="screen-title-wapper">
        <div className="screen-data-title">
          {title}
        </div>
      </div>
    );
  }
}
