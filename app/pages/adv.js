import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
    Alert,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    DeviceEventEmitter,
    NativeModules,
    Keyboard
} from 'react-native';

import {SCREEN_WIDTH, SCREEN_HEIGHT, SYSTEM, COLOR, KEYS, RN_HASFIX, URLS} from '../util/config'
import DeviceUtil from  '../util/DeviceUtil'
import * as components from '../components'
import {navToRegister, navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

var  printer = require('../util/print/PrintUtil');
import DeviceInfo from 'react-native-device-info';

import { NetworkInfo } from 'react-native-network-info';

import SplashScreen from 'react-native-splash-screen'

import JPush from 'jpush-react-native'

import { NavigationActions } from 'react-navigation'


const  MARGIN_LEFT  = 30;
const  HEIGHT_INPUT = 44;

import JPushModule from 'jpush-react-native'

const receiveCustomMsgEvent = 'receivePushMsg'
const receiveNotificationEvent = 'receiveNotification'
const openNotificationEvent = 'openNotification'
const getRegistrationIdEvent = 'getRegistrationId'

export default class adv extends Component {

  static navigationOptions = {
      headerTitle:'登录',
      header:null
    };

  constructor(props){
    super(props);
      that = this;
    this.state = {
        account:'',
        yzcode: '',
        tycode:'',
        animating:false,
        canSendSms:true,
        second:3,
        timer:null,
        bg: '#ffffff',
        appkey: 'AppKey',
        imei: 'IMEI',
        package: 'PackageName',
        deviceId: 'DeviceId',
        version: 'Version',
        pushMsg: 'PushMessage',
        registrationId: 'registrationId',
        tag: '',
        alias: '',
        isPush:false,
        map:null,
    }


  }


    // componentWillMount() {
    //     let result = NativeModules.SpeLoggerModule.Constant;
    //     console.log('原生端返回的常量值为：' + result);
    // }
    //
    // /**
    //  * 接收原生调用
    //  */
    // componentDidMount() {
    //
    //     DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
    //         title = "React Native界面,收到数据：" + global.patchImgNames;
    //         ToastAndroid.show("发送成功", ToastAndroid.SHORT);
    //     })
    // }
    //
    // /**
    //  * 调用原生代码
    //  */
    // skipNativeCall() {
    //     let phone = '18637070949';
    //     NativeModules.SpeLoggerModule.log(phone);
    // }
    //
    // /**
    //  * Callback 通信方式
    //  */
    // callbackComm(msg) {
    //     NativeModules.SpeLoggerModule.rnCallNativeFromCallback(msg,(result) => {
    //         ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
    //     })
    // }
    //
    // /**
    //  * Promise 通信方式
    //  */
    // promiseComm(msg) {
    //     // NativeModules.SpeLoggerModule.rnCallNativeFromPromise(msg,f).then(
    //     //     (result) =>{
    //     //         ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
    //     //     }
    //     // ).catch((error) =>{console.log(error)});
    //
    //     NativeModules.SpeLoggerModule.rnCallNativeFromPromise(msg,(result) => {
    //         ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
    //     })
    // }


    getPushSetInfo(){
        JPush.getRegistrationID(function (rid) {

            const body = {
                deviceId: DeviceInfo.getUniqueID(),
                source:SYSTEM.iOS ? '1' : '2',
                registrationId:rid.length==0?DeviceInfo.getUniqueID():rid
            };

            HTTP.startPostPromise(URLS.tidingsSwitch, body)
                .then((data) => {

                }).catch(e=>{

            });

        })
    }

    componentDidMount () {

        let  that = this;
        SplashScreen.hide();
        this.setState({timer:setInterval(this._downCount.bind(this),1000)})
        this.getPushSetInfo();
        DeviceEventEmitter.addListener('backFromMainTab', e=>{
            console.log(' DeviceEventEmitter.addListener'+e);
            let {navigation} = that.props;
             navigation.navigate('Login');
        });


        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
                this.setState({
                    appkey: map.myAppKey,
                    imei: map.myImei,
                    package: map.myPackageName,
                    deviceId: map.myDeviceId,
                    version: map.myVersion
                })
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        }

        JPushModule.addReceiveCustomMsgListener(map => {
            this.setState({
                pushMsg: map.message
            })
        })

        JPushModule.addReceiveNotificationListener(map => {
            if(SYSTEM.iOS){
                this.jump2WebDetail(map);
            }
        })

        JPushModule.addReceiveOpenNotificationListener(map => {
            this.jump2WebDetail(map);
        })

        JPushModule.addGetRegistrationIdListener(registrationId => {
            console.log('Device register succeed, registrationId ' + registrationId)
        })

    }

    jump2WebDetail(map){
        if(SYSTEM.iOS){
            if(map.appState == 'active'){
                return;
            }

            if(this.state.second!=-1){
                this.setState({
                    map:map,
                    isPush:true
                });
            }else {
                let {navigation} = this.props;
                navigation.navigate('TabMessage',
                    {   url:map.pageUrl+'&deviceId='+DeviceInfo.getUniqueID()+'&isRN=1',
                        title:map.msg,
                        isPush:true,
                        onReturnedFromWebDetail:()=> {

                        }
                    });
            }
        }else {

            // let result = NativeModules.SpeLoggerModule.isBackground;
            // if(result == '0'){
            //     return;
            // }

            let _map = JSON.parse(map.extras);
            let {navigation} = this.props;
            navigation.navigate('TabMessage',
                {   url:_map.pageUrl+'&deviceId='+DeviceInfo.getUniqueID()+'&isRN=1',
                    title:_map.msg,
                    isPush:true,
                    onReturnedFromWebDetail:()=> {

                    }
                });
        }

    }



    componentWillMount(){
        this.keyboardDidShowListener=Keyboard.addListener('keyboardDidShow',this._keyShow);
        this.keyboardDidHideListener=Keyboard.addListener('keyboardDidHide',this._keyHide);
    }

    componentWillUnMount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener();
        JPushModule.removeConnectionChangeListener();
        JPushModule.removeReceiveExtrasListener();
        JPushModule.removeGetRegistrationIdListener();
    }


    _keyShow() {
        // Toast("键盘显示");
    }
    _keyHide() {
        // Toast("键盘隐藏");
    }

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bgStyle}
                   resizeMode="stretch"
                   source={require('../resource/adv/adv_bg.png')}
                   />

            <components.Button   titleColor={'#9bb0d0'} style={{ marginLeft:SCREEN_WIDTH-80, backgroundColor:'#f4f6f7',marginTop:30,marginRight:MARGIN_LEFT,height:32,width:50,borderRadius:25}}  title={this.state.second+'s'} callback={ () => {}} ></components.Button>


            <components.ImageButton titleColor={'#6689bd'} width={160} height={40} image={require('../resource/adv/adv_btn_bg.png')} style={{ backgroundColor:'transparent',marginTop:SCREEN_HEIGHT-140,marginLeft:(SCREEN_WIDTH-160)/2,marginRight:(SCREEN_WIDTH-160)/2,justifyContent:'center',width:160,height:40}}  title='开始体验' callback={ () => this._jumpToLogin()} ></components.ImageButton>

        </View>
    );
  }

    _downCount(){

        let  that = this;
            this.state.second = this.state.second-1;
            if(this.state.second ==-1){
                clearInterval(this.state.timer);
                if(that.state.isPush){
                    let {navigation} = this.props;
                    navigation.navigate('TabMessage',{
                        url:this.state.map.pageUrl+'&deviceId='+DeviceInfo.getUniqueID()+'&isRN=1',
                        title:this.state.map.msg,
                        isPush:true,
                        onReturnedFromWebDetail:()=>{
                            let {navigation} = this.props;
                            navigation.navigate('MyTab');
                        }});
                }else {
                    that._jumpToLogin();
                }

            }else {
                this.setState({second:this.state.second});
            }
    }


    _jumpToLogin(){

        clearInterval(this.state.timer);
        if(this.state.isPush){
            let {navigation} = this.props;
            navigation.navigate('TabMessage',{
                url:this.state.map.pageUrl+'&deviceId='+DeviceInfo.getUniqueID()+'&isRN=1',
                title:this.state.map.msg,
                isPush:true,
                onReturnedFromWebDetail:()=>{
                    let {navigation} = this.props;
                    navigation.navigate('MyTab');
                }});
        }else {
            let {navigation} = this.props;
            navigation.navigate('MyTab');
        }
    }


    _sendVerifyBtnClicked(){

        if(this.state.account.length == 0){
            Toast('手机号不能为空');
            return;
        }

        if(!this.state.canSendSms){
            return;
        }

        this.state.canSendSms = false;
        this.state.timer=setInterval(this._downCount.bind(this),1000);

        this.setState({animating:true});


        HTTP.startPostPromise('http://zhengpai.jsjunqiao.com:7080/mt/api/sendSMS.do',
            {mobile:this.state.account,mac:DeviceUtil.getMac(),imei:DeviceUtil.getImei(),idfa:DeviceUtil.getIdfa()})
            .then((data)=>{

                Toast(data.desc);


            })
            .catch(e=>{
                this.setState({animating:false});
                Toast(e);
            });




    }

  ///各种跳转


    _onPress () {
        console.log('点击了按钮');
        let {navigation} = this.props

        navigation.navigate('Register',{
            title:'注册',
            name:'woqu'
        })
    }

    _verrifyLoginBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('VerifyCodeLogin',{
            title:'验证码登录',
        })

    }

    _forgetPwdBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('ForgetPwd',{

        })

    }


}





const styles = StyleSheet.create({
    bgStyle: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        position: 'absolute',
        backgroundColor: '#ffffff',
    },

  container: {
      flex:1,
      backgroundColor: 'white',
  },

    container3: {
        flexDirection:'row',
        justifyContent:'flex-end',
        height:32,
        marginTop:15,
        width:SCREEN_WIDTH,
        backgroundColor: 'transparent',
    },

    container2: {
        flex:1,
        marginBottom:-40,
        backgroundColor: 'transparent',
    },

    textBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        marginLeft:MARGIN_LEFT,
        marginTop:15,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'transparent',
        // borderColor:COLOR.theme,
        // borderWidth: 0.5,
        // borderRadius:3,
    },
    clearTextBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        marginLeft:MARGIN_LEFT,
        marginTop:30,
        //color:'gray',
        //fontSize:13,
        backgroundColor:'transparent',
        // borderColor:COLOR.theme,
        // borderWidth: 0.5,
        // borderRadius:3,
    },
    textInput: {
        paddingLeft:10,
        paddingRight:5,
        color:'white',
        fontSize:18,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        backgroundColor:'transparent'
    }
    ,logoStyle:{
        marginTop:20,
        marginLeft:0,
        marginRight:0,
        width:SCREEN_WIDTH,
        marginBottom:30
        // borderRadius:60
    },
    inputLeftImageStyle:{
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
        height:HEIGHT_INPUT,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius:HEIGHT_INPUT/2,

    },
    inputLeftImageStyle2:{
        width:SCREEN_WIDTH - 200,
        height:HEIGHT_INPUT,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius:HEIGHT_INPUT/2,

    },
    registerBtnBgStyle:{
        backgroundColor:'transparent',
        marginBottom:10,
        height:30,
        width:120,
        alignSelf:'center',

        paddingTop:10,
    },
    registerBtnStyle:{

        backgroundColor:'transparent',
        alignSelf:'center',
        // marginTop:30,
        // marginRight:5,
        // marginLeft:SCREEN_WIDTH-70,
        // height:30,
        // width:60,

    },
    codeInputStyle:{
        paddingLeft:10,
        paddingRight:5,
        color:'white',
        fontSize:18,
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH-200,
        backgroundColor:'transparent'
    },

    codeBtnNormalStyle:{
        marginTop:5,
        marginBottom:5,
        marginLeft:20,
        height:30,
        flex:1,
        backgroundColor:COLOR.theme,
        borderRadius:10,

    },

    codeBtnStyle:{
        marginTop:5,
        marginBottom:5,
        marginLeft:20,
        height:30,
        flex:1,
        backgroundColor:'#676767',
        borderRadius:10,

    },

    codeBtnBgStyle:{
        backgroundColor:'transparent',
        marginBottom:0,
        height:40,
        width:120,
        alignSelf:'center',
        textAlignVertical:'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },



});
