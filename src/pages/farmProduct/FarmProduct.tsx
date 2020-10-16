/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable indent */
import React, {Component} from 'react';
import '../../theme/style/farmProduct/FarmProduct.scss';
import {Row, Col, Pagination} from 'antd';
import fruitImg from '../../theme/img/fruit.jpg';

export default class FarmProduct extends Component<any, any> {

	onPageChange = (e: any) => {
		console.log(e);
	}
	renderVideos = () => {
		const vedios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const videoArr = [];
		for (let i = 0; i < vedios.length; i += 6 ){
			videoArr.push(vedios.slice(i, i + 6));
		}
		return <>
		{
			videoArr.map((videoItems, videoItemindex) => {
				return <Row key={`${videoItemindex}`}>
					{
						videoItems.map((video: any, index: number) => {
							return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 4}} xl={{ span: 4}} style={{padding: '10px'}}>
								<div className="product-img-title">
									<img src={fruitImg} alt="图片"/>
									<div>水果{`${index}`}</div>
								</div>
							</Col>;
						})
					}
				</Row>;
			})
		}
		</>;
	}

	render(){
		return <div className="farm-product-module">
			<div className="farm-product-types">
				<span className="tab-type">苹果</span>
                <span className="tab-type">茶叶</span>
                <span className="tab-type">蔬菜1</span>
                <span className="tab-type">蔬菜2</span>
                <span className="tab-type">蔬菜3</span>
			</div>
			<div className="products-content">
              {
                this.renderVideos()
              }
              <div style={{textAlign: 'right'}}>
                <Pagination onChange={this.onPageChange} current={1} pageSize={12} total={20} showSizeChanger={false}/>
              </div>
            </div>
		</div>;
	}
}
