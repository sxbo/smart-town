import React, {Component} from 'react';


export default class DataScreen extends Component {
  constructor(props: any){
    super(props);
    this.state = {
      a: '',
    };
  }

  render(){
    return (
      <div>
        数据大屏
      </div>
    );
  }
}
