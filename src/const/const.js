/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
import xue from '../theme/img/xue.svg';
import lei from '../theme/img/lei.svg';
import shachen from '../theme/img/shachen.svg';
import wu from '../theme/img/wu.svg';
import bingbao from '../theme/img/binbao.svg';
import yun from '../theme/img/yun.svg';
import yu from '../theme/img/yu.svg';
import yin from '../theme/img/yin.svg';
import qing from '../theme/img/qing.svg';

export const weather = {
  xue: xue,
  lei: lei,
  shachen: shachen,
  wu: wu,
  bingbao: bingbao,
  yun: yun,
  yu: yu,
  yin: yin,
  qing: qing,
};

export const getWeatherImg = (key) => {
  return weather[key];
};

export const cityId = '101110504';
// 1、个人诉求', '2、民意诉求', '3、业务诉求', '4、政策咨询', '5、业务办理
export const appeals = [
  {
    type: 1,
    label: '个人诉求',
  },
  {
    type: 2,
    label: '民意诉求',
  },
  {
    type: 3,
    label: '业务诉求',
  },
  {
    type: 4,
    label: '政策咨询',
  },
  {
    type: 5,
    label: '业务办理',
  },
];

export const jopType = [
  {
    jobType: 1,
    label: '党务书记',
  },
  {
    jobType: 2,
    label: '普通党员',
  },
];

export const HorseType = [
  {
    type: 1,
    label: '党建',
  },
  {
    type: 2,
    label: '首页',
  },
];

export const DynamicType = [
  {
    type: 1,
    label: '动态',
  },
  {
    type: 2,
    label: '新闻资讯',
  },
];

export const idCardType = [
  {
    idCardType: 1,
    label: '正式党员',
  },
  {
    idCardType: 2,
    label: '普通成员',
  },
];

export const colors = {
  primary: '#1890ff',
  success: '#00c292',
  danger: '#f64a4a',
};

/**
 * 范家镇中心坐标
 */
export const CENTER = {
  x: 110.1746,
  y: 34.9430,
};


/**
 * 范家镇各村坐标
 */
export const townCoordinates = [
  {
    count: 2,
    id: '1',
    latitude: 34.985847,
    longitude: 110.183258,
    name: '西寺子村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '2',
    latitude: 34.979940,
    longitude: 110.215359,
    name: '金裕村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '3',
    latitude: 34.977127,
    longitude: 110.200424,
    name: '乌牛村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '4',
    latitude: 34.979096,
    longitude: 110.167294,
    name: '井庄村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '5',
    latitude: 34.968546,
    longitude: 110.199394,
    name: '雷北村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '6',
    latitude: 34.958980,
    longitude: 110.163002,
    name: '范家村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '7',
    latitude: 34.959121,
    longitude: 110.189610,
    name: '雷南村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '8',
    latitude: 34.955041,
    longitude: 110.195103,
    name: '华原村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '9',
    latitude: 34.948006,
    longitude: 110.172787,
    name: '西岐村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '10',
    latitude: 34.937030,
    longitude: 110.152702,
    name: '北干村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '11',
    latitude: 34.936608,
    longitude: 110.188236,
    name: '加里村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '12',
    latitude: 34.927882,
    longitude: 110.186005,
    name: '营田村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '13',
    latitude: 34.915074,
    longitude: 110.151758,
    name: '上辛村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '13',
    latitude: 34.909795,
    longitude: 110.168667,
    name: '下辛村',
    unitPrice: 55218.4,
  },
  {
    count: 2,
    id: '13',
    latitude: 34.904586,
    longitude: 110.155363,
    name: '南干村',
    unitPrice: 55218.4,
  },
];

export const epidemicData = [
  {
    centroid: [110.183258, 34.985847],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '西寺子村',
    name_en: '西寺子村',
    suspectedCount: 0,
    latitude: 34.985847,
    longitude: 110.183258,
  },
  {
    centroid: [110.215359, 34.979940],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '金裕村',
    name_en: '金裕村',
    suspectedCount: 0,
    latitude: 34.979940,
    longitude: 110.215359,
  },
  {
    centroid: [110.200424, 34.977127],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '乌牛村',
    name_en: '乌牛村',
    suspectedCount: 0,
    latitude: 34.977127,
    longitude: 110.200424,
  },
  {
    centroid: [110.167294, 34.979096],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '井庄村',
    name_en: '井庄村',
    suspectedCount: 0,
    latitude: 34.979096,
    longitude: 110.167294,
  },
  {
    centroid: [110.199394, 34.968544],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '雷北村',
    name_en: '雷北村',
    suspectedCount: 0,
    latitude: 34.968546,
    longitude: 110.199394,
  },
  {
    centroid: [110.163002, 34.958980],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '范家村',
    name_en: '范家村',
    suspectedCount: 0,
    latitude: 34.958980,
    longitude: 110.163002,
  },
  {
    centroid: [110.189610, 34.959121],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '雷南村',
    name_en: '雷南村',
    suspectedCount: 0,
    latitude: 34.959121,
    longitude: 110.189610,
  },
  {
    centroid: [110.195103, 34.955041],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '华原村',
    name_en: '华原村',
    suspectedCount: 0,
    latitude: 34.955041,
    longitude: 110.195103,
  },
  {
    centroid: [110.172787, 34.948006],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '西岐村',
    name_en: '西岐村',
    suspectedCount: 0,
    latitude: 34.948006,
    longitude: 110.172787,
  },
  {
    centroid: [110.152702, 34.937030],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '北干村',
    name_en: '北干村',
    suspectedCount: 0,
    latitude: 34.937030,
    longitude: 110.152702,
  },
  {
    centroid: [110.188236, 34.936608],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '加里村',
    name_en: '加里村',
    suspectedCount: 0,
    latitude: 34.936608,
    longitude: 110.188236,
  },
  {
    centroid: [110.186005, 34.927882],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '营田村',
    name_en: '营田村',
    suspectedCount: 0,
    latitude: 34.927882,
    longitude: 110.186005,
  },
  {
    centroid: [110.151758, 34.915074],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '上辛村',
    name_en: '上辛村',
    suspectedCount: 0,
    latitude: 34.915074,
    longitude: 110.151758,
  },
  {
    centroid: [110.168667, 34.909795],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '下辛村',
    name_en: '下辛村',
    suspectedCount: 0,
    latitude: 34.909795,
    longitude: 110.168667,
  },
  {
    centroid: [110.155363, 34.904586],
    code: 'CHN',
    confirmedCount: 1251,
    countryEnglishName: 'China',
    countryName: '中国',
    curedCount: 62,
    currentConfirmedCount: 1059,
    deadCount: 130,
    name: '南干村',
    name_en: '南干村',
    suspectedCount: 0,
    latitude: 34.904586,
    longitude: 110.155363,
  },
];

