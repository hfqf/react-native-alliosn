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
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    AsyncStorage,
    DeviceEventEmitter,
    NativeModules,
    Keyboard
} from 'react-native';

import {SCREEN_WIDTH, SCREEN_HEIGHT, SYSTEM, COLOR, KEYS, NAV_BAR_HEIGHT, URLS} from '../util/config'
import DeviceUtil from  '../util/DeviceUtil'
import * as components from '../components'
import {navToRegister, navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

var  printer = require('../util/print/PrintUtil');
import DeviceInfo from 'react-native-device-info';

import { NetworkInfo } from 'react-native-network-info';

import SplashScreen from 'react-native-splash-screen'


var dismissKeyboard = require('dismissKeyboard');

const  MARGIN_LEFT  = 15;
const  HEIGHT_INPUT = 44;


export default class VerfrifyCodeLogin extends Component {

    static navigationOptions = {
        headerTitle:'登录',
        header:null
    };

    constructor(props){
        super(props);
        this.state = {
            account:'',
            yzcode: '',
            tycode:'',
            animating:false,
            canSendSms:true,
            second:60,
            timer:null
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

                    <TouchableWithoutFeedback  style={{ flex:1,
                        backgroundColor: 'transparent',}} onPress={()=>{

                        dismissKeyboard();

                    }}>
                    <View style={styles.container}>
                        <components.NavigationBar
                            isNeedBack={true}
                            leftItmeTitle={''}
                            rightItmeTitle={''}
                            isShowLeftItem={true}
                            isShowRightItem={''}
                            title={'手机验证码登录'}
                            onLeftItemCallback={()=>{
                                console.log('3232233');
                                let {navigation} = this.props;
                                navigation.goBack();
                            }}
                            onRightItemCallback={()=>{}}
                        />
                        <ScrollView  style={styles.container2}  keyboardShouldPersistTaps={'always'}>
                            {/*<Text style={styles.logoStyle} >*/}
                                {/*手机验证码登录*/}
                            {/*</Text>*/}

                            <Image resizeMode="contain" style={styles.logoStyle} source={require('../resource/login1/loading-logo.png')}/>

                            <View style={styles.inputBg}>


                                <View style={styles.textBgInput}>

                                    <Image style={styles.inputLeftImageStyle} source={require('../resource/login1/nan.png')}/>
                                    <TextInput
                                        onBlur={()=>{

                                            HTTP.checkTel4VerifyLogin(URLS.check4telephone, {telephone:this.state.account})
                                                .then((data)=>{

                                                })
                                                .catch(e=>{
                                                    Toast(e);
                                                });


                                        }}
                                        maxLength={11}
                                        placeholderTextColor={'#9eadc5'}
                                        underlineColorAndroid = 'transparent'
                                        ref='account'
                                        style={styles.textInput}
                                        onChangeText={(text) => {
                                            this.setState({account:text})
                                        }}
                                        value={this.state.account}
                                        placeholder='请输入手机号'
                                        editable={!DeviceUtil.getAutoFill()}
                                        onSubmitEditing={Keyboard.dismiss}
                                        keyboardType={'numeric'}
                                    />
                                </View>
                                <View style={styles.textBgInput}>

                                    <Image style={styles.inputLeftImageStyle1} source={require('../resource/login1/suo.png')}/>
                                    <TextInput
                                        maxLength={6}
                                        // secureTextEntry={true}
                                        placeholderTextColor={'#9eadc5'}
                                        underlineColorAndroid = 'transparent'
                                        ref='account'
                                        style={styles.textInput1}
                                        onChangeText={(text) => {
                                            this.setState({yzcode:text})
                                        }}
                                        value={this.state.yzcode}
                                        keyboardType={'numeric'}
                                        placeholder='请输入验证码'
                                        editable={!DeviceUtil.getAutoFill()}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />

                                    <components.Button fontSize={15} titleColor={COLOR.theme} style= {this.state.canSendSms ? styles.codeBtnNormalStyle : styles.codeBtnStyle} disabled={this.state.canSendSms == false} title= {this.state.canSendSms ? '发送验证码' :'已发送('+this.state.second+')s'} callback={() => this._sendVerifyBtnClicked()}></components.Button>

                                </View>

                            </View>


                            <components.Button fontSize={16} titleColor={'white'} style={{backgroundColor:COLOR.theme,marginTop:5,marginRight:MARGIN_LEFT,marginLeft:MARGIN_LEFT,borderRadius:3,height:HEIGHT_INPUT-5}}  title='登录' callback={ () => this.login()} ></components.Button>

                            <View style={styles.container3}>

                                <components.ImageButton
                                                          titleColor={COLOR.theme}
                                                          width={120}
                                                          height={40}
                                                          textAlign={'left'}
                                                          alignItems={'flex-start'}
                                                          style={{ opacity:0, backgroundColor:'transparent',marginTop:0,marginLeft:0,justifyContent:'center',width:120,height:40}}
                                                          title='密码登录'
                                                          callback={ () => {



                                                          }} ></components.ImageButton>

                                <components.ImageButton isNeedDecorationLine={true}  titleColor={COLOR.theme} fontSize={16}  width={120} height={40} textAlign={'right'} marginLeft={20}  alignItems={'flex-end'}  style={{ backgroundColor:'transparent',width:120,height:40,}}  title='密码登录' callback={ () => this._forgetPwdBtnClicked()} ></components.ImageButton>

                            </View>

                            <View style={styles.container4}>

                                <Image resizeMode="contain" style={styles.lineImageStyle1} source={require('../resource/login1/line.png')}/>

                                <Text style={{
                                    flex:1,
                                    height:40,
                                    marginLeft:0,
                                    marginRight:0,
                                    marginTop:0,
                                    textAlign:'center',
                                    backgroundColor:'transparent',
                                    fontSize:16,
                                    color: 'black'}}>还没有账号?</Text>

                                <Image resizeMode="contain" style={styles.lineImageStyle1} source={require('../resource/login1/line.png')}/>

                            </View>

                            <components.Button fontSize={16} titleColor={'white'} style={{backgroundColor:'#e71a0f',marginTop:0,marginRight:MARGIN_LEFT,marginLeft:MARGIN_LEFT,borderRadius:3,height:HEIGHT_INPUT-5}}  title='注册' callback={ () => this._registerBtnClicked()} ></components.Button>

                            <Text style={{
                                marginTop:80,
                                textAlign:'center',
                                backgroundColor:'white',
                                width:SCREEN_WIDTH,
                                marginBottom:20,
                                fontSize:16,
                                color: '#A3B5D4'}}>© 2018 ALLISON</Text>
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

        var _this = this;

        if(this.state.account.length==0){
            Toast('手机号不能为空');
            return;
        }

        if(this.state.yzcode.length==0){
            Toast('验证码不能为空');
            return;
        }


        this.setState({animating:true});

        const body ={
            deviceId:DeviceInfo.getUniqueID(),
            telephone:_this.state.account,
            verificationCode:_this.state.yzcode,
        };


        HTTP.checkTel4VerifyLogin(URLS.check4telephone, {telephone:this.state.account})
            .then((data)=>{

                HTTP.startPostPromise(URLS.login4telephone,body)
                    .then((data)=>{
                        this.setState({animating:false});

                        Toast(data.desc);
                        setTimeout(()=>{

                            let {navigation} = _this.props;
                            navigation.state.params.onReturnedFromVerifyCodeLogin();
                            navigation.goBack();

                        },2000);

                    })
                    .catch(e=>{
                        this.setState({animating:false});
                        Toast(e);
                    });

            })
            .catch(e=>{
                Toast(e);
            });


    }


    _sendVerifyBtnClicked(){

        if(this.state.account.length == 0){
            Toast('手机号不能为空');
            return;
        }

        this.setState({animating:true});

        if(!this.state.canSendSms){
            return;
        }



        HTTP.startPostPromise(URLS.sms,{telephone:this.state.account,source:'1'})
            .then((data)=>{
                this.setState({animating:false,canSendSms:false});
                this.state.timer=setInterval(this._downCount.bind(this),1000);
                Toast(data.desc);
            })
            .catch(e=>{
                this.setState({animating:false,canSendSms:true});
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

        // let {navigation} = this.props
        //
        // navigation.navigate('ForgetPwd',{
        //
        // })

        let {navigation} = this.props;
        navigation.goBack();

    }

    _registerBtnClicked(){

        let {navigation} = this.props

        navigation.navigate('Register',{
            keys:{Login_key:navigation.state.key}
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
        backgroundColor: 'white',
    },

    container2: {
        flex:1,
        marginBottom:0,
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
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        marginTop:30,
        marginLeft:MARGIN_LEFT,
        marginRight:0,
        height:HEIGHT_INPUT*2,
        borderRadius:1,
        // backgroundColor: '#dbe0e5',
        backgroundColor:'#DBE0E5',
    },

    textBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
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
        marginTop:10,
        marginTop:0,
        paddingLeft:45,
        paddingRight:50,
        paddingTop:SYSTEM.iOS ? 2 : 13,
        height:HEIGHT_INPUT,
        color:COLOR.theme,
        fontSize:15,
        marginLeft:0,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderColor:'#d1d8de'
    },
    textInput1: {
        marginTop:0,
        height:HEIGHT_INPUT,
        paddingLeft:45,
        paddingRight:50,
        paddingTop:SYSTEM.iOS ? 2 : 13,
        color:COLOR.theme,
        fontSize:15,
        marginLeft:0,
        width:SCREEN_WIDTH-2*MARGIN_LEFT-100,
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderColor:'#d1d8de'
    }
    ,
    logoStyle:{
        marginTop:80,
        marginLeft:(SCREEN_WIDTH - 200)/2,
        marginRight:(SCREEN_WIDTH - 200)/2,
        height:200/4,
        width:200,
        marginBottom:30
    // borderRadius:60
},
    bgImageBgStyle:{
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        margin:0,
        height:HEIGHT_INPUT*2,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    inputLeftImageStyle:{
        width:20,
        marginTop:(HEIGHT_INPUT-20)/2,
        marginLeft:MARGIN_LEFT,
        height:20,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    inputLeftImageStyle1:{
        width:HEIGHT_INPUT-30,
        marginTop:15,
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
        marginTop:(HEIGHT_INPUT-30)/2,
        width:110,
        marginBottom:5,
        marginLeft:-10,
        marginRight:10,
        height:30,
        flex:1,
        backgroundColor:'transparent',
        borderRadius:3,
        borderColor:COLOR.theme,
        borderWidth:0.5

    },

    codeBtnStyle:{
        marginTop:12,
        width:110,
        marginBottom:5,
        marginLeft:-10,
        marginRight:10,
        height:30,
        flex:1,
        backgroundColor:'transparent',
        borderRadius:3,
        borderColor:COLOR.theme,
        borderWidth:0.5

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
