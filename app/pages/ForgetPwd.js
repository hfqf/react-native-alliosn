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

import {SCREEN_WIDTH, SCREEN_HEIGHT, SYSTEM, COLOR, KEYS, dismissKeyboard, URLS} from '../util/config'
import DeviceUtil from  '../util/DeviceUtil'
import * as components from '../components'
import {navToRegister, navToTab} from '../Navigation'
import HTTP from '../util/http/HTTPManager';

import Toast from '../util/toast/CaToastUtil';

var  printer = require('../util/print/PrintUtil');
import DeviceInfo from 'react-native-device-info';

import { NetworkInfo } from 'react-native-network-info';

import SplashScreen from 'react-native-splash-screen'




const  MARGIN_LEFT  = 15;
const  HEIGHT_INPUT = 44;

let that;

export default class ForgetPwd extends Component {

    static navigationOptions = {
        header:null
    };

    constructor(props){
        super(props);
        that = this;
        this.state = {
            account:'',
            yzcode: '',
            pwd:'',
            pwd2:'',
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
        //
        // this.keyboardDidShowListener=Keyboard.addListener('keyboardDidShow',this._keyShow);
        // this.keyboardDidHideListener=Keyboard.addListener('keyboardDidHide',this._keyHide);

    }

    componentWillUnMount() {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
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
                    title={'忘记密码'}
                    onLeftItemCallback={()=>{
                        console.log('3232233');
                        let {navigation} = that.props;
                        navigation.goBack();
                    }}
                    onRightItemCallback={()=>{}}
                />
                <ScrollView  style={styles.container2}  keyboardShouldPersistTaps={'always'}>
                    <View style={styles.inputBg}>

                        <View style={styles.textBgInput}>

                            <Image style={styles.inputLeftImageStyle1} source={require('../resource/login1/nan.png')}/>
                            <TextInput
                                maxLength={11}
                                onBlur={()=>{

                                    HTTP.checkTel4VerifyLogin(URLS.check4telephone, {telephone:this.state.account})
                                        .then((data)=>{

                                        })
                                        .catch(e=>{
                                            Toast(e);
                                        });


                                }}
                                placeholderTextColor={'#9eadc5'}
                                underlineColorAndroid = 'transparent'
                                ref='account'
                                style={styles.textInput1}
                                onChangeText={(text) => {
                                    this.setState({account:text})
                                }}
                                value={this.state.account}
                                placeholder='请输入手机号码'
                                editable={!DeviceUtil.getAutoFill()}
                                onSubmitEditing={Keyboard.dismiss}
                                keyboardType={'numeric'}

                            />
                        </View>
                        <View style={styles.textBgInput}>

                            <Image style={styles.inputLeftImageStyle1} source={require('../resource/register/yanzhengma.png')}/>
                            <TextInput
                                maxLength={6}
                                placeholderTextColor={'#9eadc5'}
                                underlineColorAndroid = 'transparent'
                                ref='account'
                                style={styles.textInput1}
                                onChangeText={(text) => {
                                    this.setState({yzcode:text})
                                }}
                                value={this.state.yzcode}
                                placeholder='请输入验证码'
                                editable={!DeviceUtil.getAutoFill()}
                                onSubmitEditing={Keyboard.dismiss}
                                keyboardType={'numeric'}

                            />

                            <components.Button fontSize={15} titleColor={COLOR.theme} style= {this.state.canSendSms ? styles.codeBtnNormalStyle : styles.codeBtnStyle} disabled={this.state.canSendSms == false} title= {this.state.canSendSms ? '发送验证码' :'已发送('+this.state.second+')s'} callback={() => this._sendVerifyBtnClicked()}></components.Button>

                        </View>
                        <View style={styles.textBgInput}>

                            <Image style={styles.inputLeftImageStyle1} source={require('../resource/register/phone.png')}/>
                            <TextInput
                                secureTextEntry={true}
                                placeholderTextColor={'#9eadc5'}
                                underlineColorAndroid = 'transparent'
                                ref='account'
                                style={styles.textInput1}
                                onChangeText={(text) => {
                                    this.setState({pwd:text})
                                }}
                                value={this.state.pwd}
                                placeholder='请输入新密码'
                                editable={!DeviceUtil.getAutoFill()}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                        <View style={styles.textBgInput}>

                            <Image style={styles.inputLeftImageStyle1} source={require('../resource/register/suo.png')}/>
                            <TextInput
                                secureTextEntry={true}
                                placeholderTextColor={'#9eadc5'}
                                underlineColorAndroid = 'transparent'
                                ref='account'
                                style={styles.textInput1}
                                onChangeText={(text) => {
                                    this.setState({pwd2:text})
                                }}
                                value={this.state.pwd2}
                                placeholder='请再输入一次'
                                editable={!DeviceUtil.getAutoFill()}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                    </View>


                    <components.Button  fontSize={16} titleColor={'white'} style={{backgroundColor:COLOR.theme,marginTop:20,width:160,marginLeft:(SCREEN_WIDTH-160)/2,marginRight:(SCREEN_WIDTH-160)/2,borderRadius:3,height:40}}  title='完成' callback={ () => this.login()} ></components.Button>

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
            Toast('手机号码不能为空');
            return;
        }

        if(this.state.yzcode.length==0){
            Toast('验证码不能为空');
            return;
        }

        if(this.state.pwd.length==0){
            Toast('新密码不能为空');
            return;
        }

        if(this.state.pwd2.length==0){
            Toast('确认新密码不能为空');
            return;
        }

        this.setState({animating:true});

        const body ={
            telephone:this.state.account,
            verificationCode:this.state.yzcode,
            password1:this.state.pwd,
            password2:this.state.pwd2,
        };

        HTTP.startPostPromise(URLS.forgetPassword,body)
            .then((data,msg)=>{
                this.setState({animating:false});

                Toast(data.desc);
                setTimeout(()=>{
                    let {navigation} = that.props;
                    navigation.goBack();
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


        this.setState({animating:true});

        HTTP.startPostPromise(URLS.check4account, {account:this.state.account})
            .then((data1)=>{

                HTTP.startPostPromise(URLS.sms,{telephone:this.state.account,source:'2'})
                    .then((data2)=>{
                        this.setState({animating:false,canSendSms:false});
                        this.state.timer=setInterval(this._downCount.bind(this),1000);
                        Toast(data2.desc);
                    })
                    .catch(e=>{
                        this.setState({animating:false,canSendSms:true});
                        Toast(e);
                    });
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
        backgroundColor: 'white',
    },

    container2: {
        flex:1,
        marginTop:20,
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
        // justifyContent:'space-between'
        justifyContent:'center'
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
        height:HEIGHT_INPUT*4,
        borderRadius:1,
        // backgroundColor: '#dbe0e5',
        backgroundColor:'#DBE0E5',
    },

    textBgInput: {
        flexDirection:'row',
        height:HEIGHT_INPUT,
        width:SCREEN_WIDTH - MARGIN_LEFT*2,
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
        marginTop:0,
        paddingLeft:45,
        paddingRight:50,
        paddingTop:2,
        height:HEIGHT_INPUT,
        color:COLOR.theme,
        fontSize:15,
        marginLeft:0,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderColor:'#d1d8de'
    },
    textInput: {
        marginTop:0,
        paddingLeft:45,
        paddingRight:50,
        paddingTop:2,
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
        paddingRight:100,
        paddingTop:SYSTEM.iOS ? 2 : 15,
        color:COLOR.theme,
        fontSize:15,
        marginLeft:0,
        width:SCREEN_WIDTH-2*MARGIN_LEFT,
        backgroundColor:'transparent',
        borderBottomWidth:1,
        borderColor:'#d1d8de'
    }
    ,logoStyle:{
        marginTop:90,
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
        marginLeft:MARGIN_LEFT,
        height:HEIGHT_INPUT*4,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    inputLeftImageStyle:{
        width:HEIGHT_INPUT-30,
        marginTop:20,
        marginBottom:15,
        marginLeft:15+10,
        height:HEIGHT_INPUT-30,
        position: 'absolute',
        backgroundColor: 'transparent',

    },
    inputLeftImageStyle1:{
        width:20,
        marginTop:(HEIGHT_INPUT-20)/2,
        marginLeft:MARGIN_LEFT,
        height:20,
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
        marginLeft:-110,
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
        marginLeft:-110,
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
