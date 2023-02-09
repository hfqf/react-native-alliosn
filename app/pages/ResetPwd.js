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
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,COLOR,KEYS,NAV_BAR_HEIGHT,dismissKeyboard,URLS} from '../util/config'
import DeviceUtil from  '../util/DeviceUtil'
import * as components from '../components'
import {navToRegister, navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

var  printer = require('../util/print/PrintUtil');
import DeviceInfo from 'react-native-device-info';

import { NetworkInfo } from 'react-native-network-info';

import SplashScreen from 'react-native-splash-screen'




const  MARGIN_LEFT  = 0;
const  MARGIN_LEFT_BTN  = 100;
const  HEIGHT_INPUT = 60;

let that;

export default class ResetPwd extends Component {

  static navigationOptions = {
      headerTitle:'重置密码',
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
        second:60,
        timer:null,
        isNeedAccountClearBtn:false,
        isNeedPwdClearBtn:false,
        isNeedPwdClearBtn2:false,
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



    componentWillMount(){

        this.keyboardDidShowListener=Keyboard.addListener('keyboardDidShow',this._keyShow);
        this.keyboardDidHideListener=Keyboard.addListener('keyboardDidHide',this._keyHide);

    }

    componentWillUnMount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentDidMount(){

        SplashScreen.hide();

    }


    _keyShow() {
        // Toast("键盘显示");
    }
    _keyHide() {
        // Toast("键盘隐藏");
    }

  render() {
    return (

        <TouchableWithoutFeedback  style={{ flex:1, backgroundColor: 'transparent',}}
                                   onPress={()=>{

            dismissKeyboard();

        }}>
        <View style={styles.container}>
            <components.NavigationBar
                isNeedBack={true}
                leftItmeTitle={''}
                rightItmeTitle={''}
                isShowLeftItem={true}
                isShowRightItem={''}
                title={'重置密码'}
                onLeftItemCallback={()=>{
                    let {navigation} = that.props;
                    navigation.goBack();
                }}
                onRightItemCallback={()=>{}}
            />{/*<Image style={styles.bgStyle}*/}
                   {/*resizeMode="cover"*/}
                   {/*source={require('../resource/login/loginbg_big.png')}/>*/}
            <ScrollView  style={styles.container2}  keyboardShouldPersistTaps={'always'}>


                <View style={styles.inputBg}>


                    <View style={styles.textBgInput}>

                        <TextInput
                            // maxLength={11}
                            placeholderTextColor={'#d3d3d3'}
                            underlineColorAndroid = 'transparent'
                            ref='account1'
                            style={styles.textInput1}
                            onChangeText={(text) => {
                                this.setState({account:text,isNeedAccountClearBtn:text.length>0})
                            }}
                            value={this.state.account}
                            placeholder='请输入旧密码'
                            editable={!DeviceUtil.getAutoFill()}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <TouchableWithoutFeedback onPress={()=>{
                            this.setState({account:'',isNeedAccountClearBtn:false})
                        }}>
                            {this.state.isNeedAccountClearBtn? <Image resizeMode="cover" style={styles.clearStyle} source={require('../resource/allison/login_clear.png')}/>:<View/>}

                        </TouchableWithoutFeedback>

                    </View>
                    <View style={styles.sepStyle} />
                    <View style={styles.textBgInput}>

                        <TextInput
                            // maxLength={6}
                            secureTextEntry={true}
                            placeholderTextColor={'#d3d3d3'}
                            underlineColorAndroid = 'transparent'
                            ref='account2'
                            style={styles.textInput1}
                            onChangeText={(text) => {
                                this.setState({yzcode:text,isNeedPwdClearBtn:text.length>0})
                            }}
                            value={this.state.yzcode}
                            placeholder='请输入新密码'
                            editable={!DeviceUtil.getAutoFill()}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <TouchableWithoutFeedback onPress={()=>{

                            this.setState({yzcode:'',isNeedPwdClearBtn:false})

                        }}>
                            {this.state.isNeedPwdClearBtn?<Image resizeMode="cover" style={styles.clearStyle2} source={require('../resource/allison/login_clear.png')}/>
                                :<View/>}

                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.sepStyle} />
                    <View style={styles.textBgInput}>

                        <TextInput
                            // maxLength={6}
                            secureTextEntry={true}
                            placeholderTextColor={'#d3d3d3'}
                            underlineColorAndroid = 'transparent'
                            ref='account3'
                            style={styles.textInput1}
                            onChangeText={(text) => {
                                this.setState({tycode:text,isNeedPwdClearBtn2:text.length>0})
                            }}
                            value={this.state.tycode}
                            placeholder='请再输入一次'
                            editable={!DeviceUtil.getAutoFill()}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <TouchableWithoutFeedback onPress={()=>{

                            this.setState({tycode:'',isNeedPwdClearBtn2:false})

                        }}>
                            {this.state.isNeedPwdClearBtn2?<Image resizeMode="cover" style={styles.clearStyle2} source={require('../resource/allison/login_clear.png')}/>
                                :<View/>}

                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <components.Button fontSize={20} titleColor={'white'} style={{backgroundColor:COLOR.theme,marginTop:30,marginRight:MARGIN_LEFT_BTN,marginLeft:MARGIN_LEFT_BTN,borderRadius:3,height:40}}  title='完成' callback={ () => this.login()} ></components.Button>

            </ScrollView>
        </View>
        </TouchableWithoutFeedback>

    );
  }

    _downCount(){
        if(this.state.canSendSms){
            this.setState({second:60});
        }else {
            this.state.second = this.state.second-1;
            if(this.state.second ==0){
                clearInterval(this.state.timer);
                this.setState({second:60,canSendSms:true,timer:null});
            }else {
                this.setState({second:this.state.second,canSendSms:false});
            }

        }

    }

    login() {

        if(this.state.account.length==0){
            Toast('旧密码不能为空');
            return;
        }

        if(this.state.yzcode.length==0){
            Toast('新密码不能为空');
            return;
        }

        if(this.state.tycode.length==0){
            Toast('确认密码不能为空');
            return;
        }

        this.setState({animating:true});
        const body ={
            deviceId:DeviceInfo.getUniqueID(),
            password:this.state.account,
            password1:this.state.yzcode,
            password2:this.state.tycode,
        };

        HTTP.startPostPromise(URLS.resetPassword,body)
            .then((data)=>{

                this.setState({animating:false});
                Toast(data.desc);
                setTimeout(()=>{
                    let {navigation} = that.props;
                    navigation.goBack();
                    navigation.state.params.onResetPwd();
                },2000);


            })
            .catch(e=>{
                this.setState({animating:false});
                Toast(e);
            });

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
        this.state.timer=setTimeout(this._downCount.bind(this),1000);

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
            keys:{Login_key:navigation.state.key}
        })

    }

    _forgetPwdBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('ForgetPwd',{

        })

    }

    _registerBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('Register',{

        })
    }

}





const styles = StyleSheet.create({
    bgStyle: {
        width:SCREEN_WIDTH+40,
        height:SCREEN_HEIGHT,
        margin:0,
        marginLeft:-20,
        marginRight:-20,
        position: 'absolute',
        backgroundColor: '#ffffff',
    },

  container: {
      flex:1,
      backgroundColor: '#f6f6f6',
  },

    container2: {
        flex:1,
        marginBottom:-40,
        backgroundColor: 'transparent',
    },
    container3: {
        flex:1,
        flexDirection:'row',
        height:40,
        marginLeft:MARGIN_LEFT,
        marginRight:MARGIN_LEFT,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        marginTop:20,
        backgroundColor: 'transparent',
        // backgroundColor: '#dbe0e5',
        justifyContent:'space-between'
    },

    container4: {
        flex:1,
        flexDirection:'row',
        height:40,
        marginLeft:MARGIN_LEFT,
        marginRight:MARGIN_LEFT,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        marginTop:40,
        backgroundColor: 'transparent',
        justifyContent:'space-between'
    },


    inputBg: {
        flex:1,
        marginTop:30,
        marginLeft:MARGIN_LEFT,
        marginRight:MARGIN_LEFT,
        height:HEIGHT_INPUT*3,
        borderColor: '#efefef',
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor:'white',
    },

    textBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2-50,
        color:COLOR.theme,
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
        paddingLeft:20,
        color:'black',
        fontSize:17,
        width:SCREEN_WIDTH-2*MARGIN_LEFT-30,
        backgroundColor:'transparent'
    },
    textInput1: {
        paddingLeft:20,
        color:'black',
        fontSize:17,
        width:SCREEN_WIDTH-2*MARGIN_LEFT-30,
        backgroundColor:'transparent'
    }
    ,logoStyle:{
        marginTop:80,
        marginLeft:(SCREEN_WIDTH - 200)/2,
        marginRight:(SCREEN_WIDTH - 200)/2,
        height:200/4,
        width:200,
        marginBottom:30
        // borderRadius:60
    },
    clearStyle:{
        marginRight:10+MARGIN_LEFT,
        height:20,
        width:20,
        marginTop:(HEIGHT_INPUT-20)/2+5
    },
    clearStyle2:{
        marginRight:10+MARGIN_LEFT,
        height:20,
        width:20,
        marginTop:(HEIGHT_INPUT-20)/2-5
    },
    bgImageBgStyle:{
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        margin:0,
        height:HEIGHT_INPUT*2,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    inputLeftImageStyle:{
        width:HEIGHT_INPUT-30,
        marginTop:20,
        marginBottom:15,
        marginLeft:15,
        height:HEIGHT_INPUT-30,
        position: 'absolute',
        backgroundColor: 'transparent',

    },
    inputLeftImageStyle1:{
        width:HEIGHT_INPUT-30,
        marginTop:10,
        marginBottom:15,
        marginLeft:15,
        height:HEIGHT_INPUT-30,
        position: 'absolute',
        backgroundColor: 'transparent',

    },
    lineImageStyle1:{
        width:80,
        height:0.5,
        backgroundColor: '#dddcdc',
        marginTop:10

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

    sepStyle:{
        marginLeft:20,
        height:1,
        width:SCREEN_WIDTH-20,
        backgroundColor:'#e3e3e3',
    },


});
