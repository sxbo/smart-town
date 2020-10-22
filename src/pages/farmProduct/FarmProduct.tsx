/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable indent */
import React, {Component} from 'react';
import '../../theme/style/farmProduct/FarmProduct.scss';
import DynamicViewModal from '../../components/DynamicViewModal';
import {Row, Col, Pagination} from 'antd';
import fruitImg from '../../theme/img/fruit.jpg';
import axios from 'axios';

export default class FarmProduct extends Component<any, any> {

	constructor(props: any){
        super(props);
        this.state = {
          allTypes: [],
          dataList: [],
		  currentType: 1,
		  currentPage: 1,
		  total: 0,
		  tableData: [],
		  viewModalVisible: false,
		  viewTitle: '',
		  dynamic: {},
        };
	}

	componentDidMount() {
		this.getAllTypes();
		this.getFarmsByType(this.state.currentType);
	}

	getAllTypes = () => {
		axios({
			method: 'GET',
			url: 'api/getAllFarmTypes',
		}).then((res) => {
			if (res.data.status === 200){
			this.setState({
				allTypes: res.data?.data || [],
			});
			} else {
				this.setState({
					allTypes: [{id: 1, type: '水果'}, {id: 2, type: '蔬菜'}],
				});
			}
		}).catch(() => {
			this.setState({
			allTypes: [{id: 1, type: '水果'}, {id: 2, type: '蔬菜'}],
			});
		});
	}

	getFarmsByType = (type: any) => {
        axios({
          	method: 'GET',
        	url: `api/spb/getFarmProductByType?type=${type}`,
        }).then((res) => {
          	if (res.data.status === 200){
				const dataList = res.data?.data || [];
            	this.setState({
					currentPage: 1,
					dataList: dataList,
					total: dataList?.length || 0,
					tableData: dataList.slice(0, 12),
            	});
          } else {
            this.setState({
			  dataList: [],
			  currentPage: 1,
			  total: 0,
			  tableData: [],
            });
          }
        }).catch(() => {
          this.setState({
			currentPage: 1,
			dataList: [],
			total: 0,
			tableData: [],
          });
        });
    }

    tabClicked = (pageType: any) => {
      this.setState({currentType: pageType});
      this.getFarmsByType(pageType);
    }
	onPageChange = (page: any, pageSize: any) => {
		const start = (page - 1) * 12;
		const end = start + 12;
		const data = this.state.dataList.slice(start, end);
		this.setState({
			tableData: data,
			currentPage: page,
		});
	}

	viewDynamic = (dynamic: any, title: any) => {
		this.setState({
		  dynamic: dynamic || {},
		  viewModalVisible: true,
		  viewTitle: title,
		});
	  }

	closeViewModal = () => {
		this.setState({
		  viewModalVisible: false,
		});
	}

	renderVideos = (dataList: any) => {
		const farmArr = [];
		for (let i = 0; i < dataList.length; i += 6 ){
			farmArr.push(dataList.slice(i, i + 6));
		}
		return <>
		{
			farmArr.map((farmItems, farmItemindex) => {
				return <Row key={`${farmItemindex}`}>
					{
						farmItems.map((item: any, index: number) => {
							return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 4}} xl={{ span: 4}} style={{padding: '10px'}}>
								<div className="product-img-title">
									<img src={item.icon || fruitImg} alt="图片"/>
									<div className="product-img-title-title" onClick={e => this.viewDynamic(item, '农副产品')}>{item.title}</div>
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
		const {allTypes, currentType, currentPage, total, tableData, viewModalVisible, viewTitle} = this.state;
		return <div className="farm-product-module">
			<div className="farm-product-types">
			{
				allTypes.map((item: any) => {
					return <span key={`${item.id}`} className={currentType == item.id ? 'tab-type tab-type-checked' : 'tab-type'} onClick={e => this.tabClicked(item.id)}>{item.type}</span>;
				})
			}
			</div>
			<div className="products-content">
              {
                this.renderVideos(tableData)
              }
              <div style={{textAlign: 'right'}}>
                <Pagination onChange={this.onPageChange} current={currentPage} pageSize={12} total={total} showSizeChanger={false}/>
              </div>
            </div>
			<DynamicViewModal dynamic={this.state.dynamic} visible={viewModalVisible} close={this.closeViewModal} title={viewTitle}/>
		</div>;
	}
}
