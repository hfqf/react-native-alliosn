import { Dimensions,Platform,NativeModules} from  'react-native';
import DeviceInfo from 'react-native-device-info';

import Device from  './DeviceUtil'
import HTTPManager from './http/HTTPManager';

export const DEBUG = __DEV__ ;  //开发环境
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const  VERSION = '1.1.0';

let { width,height } = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const STATUS_BAR_HEIGHT = (DeviceInfo.getModel() == 'iPhone X' &&Platform.OS === 'ios') ?44:20;
export const NAV_BAR_HEIGHT = (DeviceInfo.getModel() == 'iPhone X' &&Platform.OS === 'ios') ?88: (Platform.OS === 'ios' ? 64   : 64);
export const TAB_BAR_HEIGHT = 50;

export const iPAD_DEVICE =  DeviceInfo.getModel().indexOf('iPad') >= 0

export let HTTP_SCHEME = 'http';
export let HTTPS_SCHEME = 'https';


export const SYSTEM = {
  iOS : Platform.OS === 'ios',
  Android : Platform.OS === 'android',
}


export  const  RN_HASFIX = 'isRN=1'+'&deviceId='+DeviceInfo.getUniqueID();

export  const  RN_HASFIX2 = 'isRN=1'+'&deviceId='+DeviceInfo.getUniqueID();

export  const  RN_HASFIXWith = '&'+RN_HASFIX


export  const  HTTP = HTTPManager;

export const COLOR = {
  theme: '#0052a4',
  favored: '#C71A22',
  textPrompt: '#929292',
  textNormal: '#5E5E5E',
  textEmpha: '#212121',
  textLightPrompt: '#EBEBEB',
  textLightNormal: '#FFFFFF',
  backgroundDarker: '#D6D6D6',
  backgroundNormal: '#EBEBEB',
  backgroundLighter: '#FFFFFF',
  backgroundDarkLighter: '#424242',
  backgroundDarkNormal: '#000000',
  backgroundNotice: '#FFFB00',
  linePrompt: '#EBEBEB',
  lineNormal: '#A9A9A9',
  lineEmpha: '#929292',
  clear:'transparent'
}

export const KEYS = {
    ISKOGINED:'ISKOGINED',
    NAME:'NAME',
    TOKEN:'TOKEN',
    HEADURL:'HEADURL',
    USERID:'USERID',
    SSID:'SSID',
    MAC:'MAC',
    IDFA:'IDFA',
    IMEI:'IMEI'
}

export  const  SEREVER = 'http://api.allisonchina.cn/';

export  const URLS = {

    about:SEREVER+'mt/allison/about.do?'+RN_HASFIX2,
    product:SEREVER+'mt/allison/product.do?'+RN_HASFIX2,
    videocenter:SEREVER+'mt/allison/main/video.do?'+RN_HASFIX2,
    calculator:SEREVER+'mt/allison/calculator.do?'+RN_HASFIX2,
    server:SEREVER+'mt/allison/server.do?'+RN_HASFIX2,
    collect:SEREVER+'mt/allison/collect.do?'+RN_HASFIX2,
    feedback:SEREVER+'mt/allison/feedback.do?'+RN_HASFIX2,
    addFeedback:SEREVER+'mt/allison/addFeedback.do?'+RN_HASFIX2,
    userInfo:SEREVER+'mt/allison/userInfo.do?'+RN_HASFIX2,
    tidings:SEREVER+'mt/allison/tidings.do?'+RN_HASFIX2,


    getLoginUserInfo:SEREVER+'mt/api/getLoginUserInfo.do',
    appShareUrl: SEREVER+'mt/allison/download.do',
    unReadMessage:SEREVER+'mt/api/unreadMessage.do',
    logout:SEREVER+'mt/api/logout.do',
    tidingsSwitch:SEREVER+'mt/api/tidingsSwitch.do',
    updateTidingsSwitch:SEREVER+'mt/api/updateTidingsSwitch.do',
    forgetPassword:SEREVER+'mt/api/forgetPassword.do',
    check4account:SEREVER+'mt/api/check4account.do',
    sms:SEREVER+'mt/api/sms.do',
    checkVerificationCode :SEREVER+'mt/api/checkVerificationCode.do',
    login:SEREVER+'mt/api/login.do',
    changeTelephone:SEREVER+'mt/api/changeTelephone.do',
    check4telephone:SEREVER+'mt/api/check4telephone.do',
    login4telephone:SEREVER+'mt/api/login4telephone.do',
    register:SEREVER+'mt/api/register.do',
    resetPassword:SEREVER+'mt/api/resetPassword.do'
}


export  const JNZP_URLS = {
    params:'mac='+Device.getMac()+'&imei='+Device.getImei()+'&idfa='+Device.getIdfa(),
    home:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/index.do?',
    takedata:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/data.do?',
    analysis:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/analysis.do?',
    advpush:'http://zhengpai.jsjunqiao.com:7080/mt/marketing/delivery.do?',
}

export let  DeviceUtil  =  Device;


const _dismissKeyboard = require('dismissKeyboard');
export const dismissKeyboard = _dismissKeyboard;
