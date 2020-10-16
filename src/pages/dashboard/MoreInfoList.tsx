/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {List} from 'antd';
import '../../theme/style/dashboard/Moreinfo.scss';

export default class MoreInfoList extends Component<any, any> {
    componentDidMount() {
        const pageType = this.props.location?.state?.pageType;
        console.log(pageType);
    }

    render() {

        const data = [
            '中共中央国务院印发深化新时代教育评价改革总体方案',
            '这十条“深”改经验，“圳”好！',
            '在“凤城”名企，总书记再提“自主创新”有何深意？',
            '十三届全国人大常委会第二十二次会议在京举行',
            '十三届全国人大常委会第二十二次会议在京举行',
            '十三届全国人大常委会第二十二次会议在京举行',
            '中共中央国务院印发深化新时代教育评价改革总体方案',
            '这十条“深”改经验，“圳”好！',
            '在“凤城”名企，总书记再提“自主创新”有何深意？',
            '这十条“深”改经验，“圳”好！',
        ];
        return <div className="more-info-list-box">
            <div className="tabs-box">
                <span className="tab-bt">范家故事</span>
                <span className="tab-bt">新闻资讯</span>
                <span className="tab-bt">农副产品</span>
                <span className="tab-bt">相关政策</span>
                <span className="tab-bt">相关公告</span>
                <span className="tab-bt">党建动态</span>
                <span className="tab-bt">三会一课</span>
            </div>
            <div className="infos-list">
                <List size="small" bordered={false}
                dataSource={data}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                renderItem={item => <List.Item>
                    <div className="story-link">
                        <span className="story-link-title">· {item}</span>
                    </div>
                    <div>陈芳芳</div>
                    <div>2020-09-26</div>
                </List.Item>}/>
            </div>
        </div>;
    }
}
