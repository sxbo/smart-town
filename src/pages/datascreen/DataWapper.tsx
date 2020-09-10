import React, {Component} from 'react';

import '../../theme/style/datascreen/dataWapper.scss';


export default class DataWapper extends Component{
  render() {
    return (
      <div className="screen-data-wapper">
        {this.props.children}
      </div>
    );
  }
}
