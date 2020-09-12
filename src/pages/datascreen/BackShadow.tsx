import React, {Component} from 'react';
import '../../theme/style/datascreen/backShadow.scss';

interface BackShadowPro{
  className?: string | undefined
}
export default class BackShadow extends Component<BackShadowPro>{
  render() {
    const {className} = this.props;

    return (
      <div className={'screen-back-shadow ' + className}>
        {this.props.children}
      </div>
    );
  }
}
