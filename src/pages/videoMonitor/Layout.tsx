import React, {Component} from 'react';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
import '../../theme/style/videomonitor/layout.scss';

class VideoLayout extends Component {

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'api/videos',
    }).then((res) => {
      if (res.data.status === 200){
        console.log(res.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render(){
    return (
      <div className="vedio-monitor">
        <PageTitle title="视屏监控"></PageTitle>
      </div>
    );
  }
}

export default VideoLayout;
