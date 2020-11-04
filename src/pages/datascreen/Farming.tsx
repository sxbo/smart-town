/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import {BreedIcon, FarmIcon, MonitorIcon} from './Icon';
import axios from 'axios';
import '../../theme/style/datascreen/Farming.scss';
export default class Farming extends Component<any, any>{

    state = {
        greenHousesCount: 0,
        breedsCount: 0,
        products: [],
    };

    componentDidMount(){
        this.getGreenhouses();
        this.getBreeds();
        this.getAllTypes();
    }

    getGreenhouses = () => {
        axios({
          method: 'GET',
          url: 'api/greenhouse',
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data.data || [];
            this.setState({greenHousesCount: data?.length});
          }
        }).catch((err) => {
            throw new Error(err);
        });
    };

    getBreeds = () => {
        axios({
          method: 'GET',
          url: 'api/breed',
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data.data || [];
            this.setState({breedsCount: data?.length});
          }
        }).catch((err) => {
            throw new Error(err);
        });
    };

    getAllTypes = () => {
		axios({
			method: 'GET',
			url: 'api/getAllFarmTypes',
		}).then((res) => {
			if (res.data.status === 200){
                let allTypes: any[] = res.data?.data || [];
                allTypes = allTypes.slice(0, 6);
                this.getAllFarms((allfarms: []) => {
                    const products: { type: any; count: number; }[] = [];
                    allTypes.map((item: any) => {
                        const typeId = item.id;
                        const type = item.type;
                        const typeFarms = allfarms.filter((farm: any) => farm.type.id == typeId);
                        products.push({
                            type: type,
                            count: typeFarms.length,
                        });
                    });
                    this.setState({products: products});
                });
			}
		}).catch(() => {
			this.setState({
			    products: [{count: 30, type: '水果'}, {count: 20, type: '蔬菜'}],
			});
		});
    }

    getAllFarms = (success: (farms: []) => void) => {
		axios({
			method: 'GET',
			url: 'api/spb/getAllFarmProduct',
		}).then((res) => {
			if (res.data.status === 200){
                const allfarms: [] = res.data?.data || [];
                success(allfarms);
			}
		}).catch((err) => {
            this.setState({
			    products: [{count: 30, type: '水果'}, {count: 20, type: '蔬菜'}],
			});
			throw new Error(err);
		});
	}

    render() {
        const {greenHousesCount, breedsCount, products} = this.state;
        const {greenHouseMonitors = 0, breedMonitors = 0} = this.props;
        return <BackShadow className="farming">
            <ScreenTitle title="农业"></ScreenTitle>
            <div className="gren-breed">
                <div className="gren-breed-green-d">
                    <div className="gren-breed-green-dd">
                        <span className="gren-breed-green-dd-i">
                            <FarmIcon/>
                        </span>
                        <span>大棚:</span>
                        <span className="farming-number">{greenHousesCount} 户</span>
                    </div>
                    <div className="gren-breed-green-dd">
                        <span className="gren-breed-green-dd-i">
                            <MonitorIcon/>
                        </span>
                        <span>监控点位:</span>
                        <span className="farming-number">{greenHouseMonitors} 个</span>
                    </div>
                </div>
                <div className="gren-breed-green-d">
                    <div className="gren-breed-green-dd">
                        <span className="gren-breed-green-dd-i">
                            <BreedIcon/>
                        </span>
                        <span>养殖场:</span>
                        <span className="farming-number">{breedsCount} 户</span>
                    </div>
                    <div className="gren-breed-green-dd">
                        <span className="gren-breed-green-dd-i">
                            <MonitorIcon/>
                        </span>
                        <span>监控点位:</span>
                        <span className="farming-number">{breedMonitors} 个</span>
                    </div>
                </div>
            </div>
            <div className="farming-product">农副产品:</div>
            <div className="farm-product-type">
                {
                    products.map((product: any, index: number) => {
                        return <div key={`${index}`}>
                            <div>{product.type}</div>
                            <div className="farming-pro-number">{product.count} 种</div>
                        </div>;
                    })
                }
            </div>
        </BackShadow>;
    }
}
