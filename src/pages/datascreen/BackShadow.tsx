import React, {Component} from 'react';

import '../../theme/style/datascreen/backShadow.scss';

export default class BackShadow extends Component{
  render() {
    return (
      <div className="screen-back-shadow">
        {this.props.children}
      </div>
    );
  }
}
