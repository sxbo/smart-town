import React, {Component} from 'react';
import '../../theme/style/datascreen/layout.scss';
import '../../theme/style/common.scss';

import Screen from './Screen';

export default class ScreenPage extends Component {
  constructor(props: any){
    super(props);
    this.state = {
      a: '',
    };
  }

  render(){
    return (
      <div className="data-screen">
        <Screen />
      </div>
    );
  }
}
