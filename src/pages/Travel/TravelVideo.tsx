/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import '../../theme/style/travel/TravelVideo.scss';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';


export default class TravelVideo extends Component{
    state = {
        url: '',
        format: '',
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'api/getTravelVideos',
          }).then((res) => {
            if (res.data.status === 200){
                const data = res.data?.data || [];
                const url = data[0].playLink;
                const arr = url.split('.');
                let format = 'mp4';
                if (arr && arr.length){
                    format = arr[arr.length - 1];
                }
                this.setState({
                    url: url,
                    format: format,
                });
            }
          }).catch(() => {
            this.setState({
                url: 'https://www.fanjiasmarttown.com/video/fanjia.mp4',
                format: 'mp4',
            });
          });
    }

    render() {
        const {url, format} = this.state;
        return <div className="travel-video">
            <PageTitle title="旅游宣传"/>
            {
                url && <div style={{marginTop: '10px'}}>
                    <video controls autoPlay style={{width: '100%'}}>
						<source src={url} type={'video/' + format}/>
					</video>
                </div>
            }
        </div>;
    }
}
