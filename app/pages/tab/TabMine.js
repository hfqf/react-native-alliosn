import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
    NativeModules,
    Alert,
    BackHandler
} from 'react-native';

import {SCREEN_WIDTH, SCREEN_HEIGHT, COLOR, KEYS, SYSTEM, RN_HASFIX, DeviceUtil, URLS} from '../../util/config';
import * as components from '../../components'

import DeviceInfo from 'react-native-device-info';
//图片资源
const icon_message = require('../../resource/mine/email.png');
const icon_fav = require('../../resource/mine/fav.png');
const icon_feedback = require('../../resource/mine/feedback.png');
const icon_safe = require('../../resource/mine/safe.png');
const icon_cache = require('../../resource/mine/cache.png');
const icon_share = require('../../resource/mine/share.png');
const icon_notification = require('../../resource/mine/icon_message.png');
import HTTP from '../../util/http/HTTPManager';
import Toast from '../../util/toast/CaToastUtil';

import UShare from '../../share/share'
import SharePlatform from '../../share/SharePlatform'
import CheckBox from 'react-native-checkbox';


export default class TabMine extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            headurl:'',
            id:'',
            islogined:false,
            cacheSize:'',
            unReadCount:0,
            modalVisible:false
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });

    componentWillMount(){



        this.getUnReadCount();
        this.refreshUserInfo();
        this.refreshCacheSize();


        DeviceEventEmitter.addListener('Mine', e=>{
            this.setState({modalVisible: false});
            this.getUnReadCount();
            this.refreshUserInfo();
            this.refreshCacheSize();
        });

        if (Platform.OS === 'android') {
            BackHandler.addEventListener("back", this.onBackClicked);
        }else {

        }

    }


    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("back", this.onBackClicked);
        }else {
        }
    }

    onBackClicked = () => {
        if (this.state.isTabPage) {
            return true;
        }else {
            return false;
        }
    }


    refreshCacheSize(){
        NativeModules.SpeLoggerModule.getCacheTotalSize((result) =>{
            console.log('getCacheTotalSize'+result);
            this.setState({cacheSize: result});
        })
    }

    refreshUserInfo(){
        const body = {
            deviceId: DeviceInfo.getUniqueID(),
        };

        HTTP.startPostPromise(URLS.getLoginUserInfo, body)
            .then((data) => {


                DeviceUtil.setMobile(data.data.telephone);

                        this.setState(
                            {name: data.data.account,
                            headurl: data.data.headimgurl,
                            islogined: data.result == '1'
                        });
            }).catch(e=>{
                this.setState({islogined: false});
        });
    }

    render() {
        let loginBtn = this.state.islogined ?
            <TouchableOpacity onPress={() => this.logout()}>
                <View style={styles.logout}>
                    <Text style={{color:'#eb1d0f',fontSize:18}}>退出登录</Text>
                </View>
            </TouchableOpacity>:null;
        return (
            <View style={styles.container}>
                {/*<components.NavigationBar*/}
                    {/*isNeedBack={false}*/}
                    {/*leftItmeTitle={''}*/}
                    {/*rightItmeTitle={''}*/}
                    {/*isShowLeftItem={''}*/}
                    {/*isShowRightItem={''}*/}
                    {/*title={'我的'}*/}
                    {/*onLeftItemCallback={()=>{}}*/}
                    {/*onRightItemCallback={()=>{}}*/}
                {/*/>*/}
                <ScrollView>
                    <View style={styles.header}>
                        <Image  resizeMode="stretch" style={styles.bgImageBgStyle} source={require('../../resource/mine/top.png')}/>
                        <TouchableOpacity
                            onPress ={()=>{
                                if(this.state.islogined){
                                    let {navigation} = this.props
                                    navigation.navigate('TabUserInfo',{onReturnFromUserInfo:()=>{
                                        this.refreshUserInfo();
                                    }});

                                }else {
                                    this.login();
                                }
                            }}>
                            <Image style={styles.avator}
                                   source={ this.state.headurl.length == 0 || !this.state.islogined ? require('../../resource/mine/head_default.png') :{uri:this.state.headurl}}
                            />
                        </TouchableOpacity>


                        <TouchableWithoutFeedback
                            onPress ={()=>{
                                if(this.state.islogined){
                                    let {navigation} = this.props
                                    navigation.navigate('TabUserInfo',{onReturnFromUserInfo:()=>{
                                        this.refreshUserInfo();
                                    }});

                                }else {
                                    this.login();
                                }
                            }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginTop:20,backgroundColor:COLOR.clear,color:'white'}}>{this.state.islogined ?this.state.name:'登录/注册'}</Text>
                            {this.state.islogined? <Image style={styles.userInfo}
                                                          resizeMode="cover"
                                                          source={ require('../../resource/mine/improve.png') }
                            />:<View/>}

                        </View>
                        </TouchableWithoutFeedback>

                    </View>

                    {this.renderSectionHeader('通知')}
                    <components.MineItem unReadCount={this.state.islogined ? this.state.unReadCount:0}  rightText = {this.state.islogined ? this.state.unReadCount:0} leftImg={icon_message} leftText='我的消息' onPress={() => {


                        let {navigation} = this.props
                        navigation.navigate('TabMessage',{
                            onReturned: () => {
                                this.getUnReadCount();
                            }
                        });

                        // if(this.state.islogined){
                        //
                        //     let {navigation} = this.props
                        //     navigation.navigate('TabMessage',{
                        //         onReturned: () => {
                        //             this.getUnReadCount();
                        //         }
                        //     });
                        //
                        // }else {
                        //    this.login();
                        // }



                    }}/>
                    <components.MineItem leftImg={icon_fav} leftText='我的收藏' onPress={() => {

                        if(this.state.islogined){

                            let {navigation} = this.props
                            navigation.navigate('TabFav',);

                        }else {
                            this.login();
                        }


                    }}/>
                    {this.renderSectionHeader('企业服务')}
                    <components.MineItem leftImg={icon_feedback} leftText='我的反馈' onPress={() => {

                        if(this.state.islogined){

                            let {navigation} = this.props
                            navigation.navigate('TabFeedback',);

                        }else {
                            this.login();
                        }


                    }}/>
                    {this.renderSectionHeader('其他')}
                    <components.MineItem leftImg={icon_safe} leftText='账号安全' onPress={() => {


                        if(this.state.islogined){
                          let {navigation} = this.props
                          navigation.navigate('AccountSafe',{
                            title:'账号安全',
                            onReturned:()=>{
                                this.refreshUserInfo();
                            },
                            onResetPwd:()=>{

                                this.setState({islogined: false});

                                this.login();

                            },
                              onReturnedFromLogin:()=>{
                                  this.refreshUserInfo();
                            }
                        })
                        }else {
                            this.login();
                        }

                    }}/>
                    <components.MineItem isNeedArrow = {true} leftImg={icon_cache} leftText='清除缓存' rightText={this.state.cacheSize} onPress={() => {

                        NativeModules.SpeLoggerModule.clearCache((result) =>{
                            console.log('clearCache'+result);

                            setTimeout(()=>{
                                Toast('清除缓存完毕')
                                this.setState({cacheSize: ''});
                            },500)
                        })



                    }}/>
                    <components.MineItem leftImg={icon_share} leftText='分享给好友' onPress={() => {

                        this.openModal();

                    }}/>

                    {loginBtn}
                </ScrollView>
                <components.ShareModal
                    modalVisible={this.state.modalVisible}
                    title='分享给好友'
                    wxAction={() => this.shareTo(SharePlatform.WECHAT)}
                    wxMomentAction={() => this.shareTo(SharePlatform.WECHATMOMENT)}
                    qqAction={() => this.shareTo(SharePlatform.QQ)}
                    wbAction={() => this.shareTo(SharePlatform.SINA)}
                    qZone={()=>this.shareTo(SharePlatform.QQZONE)}
                    cancelAction={()=>{
                        this.closeModal();
                        Toast('取消分享');
                    }}
                />
            </View>
        );
    }

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    shareTo(type) {
        this.closeModal();
        const _title = '艾里逊';
        const  _desc = '艾里逊变速箱公司是全球最大的商用自动变速箱和混合动力系统的领先生产商。我们的产品为全球领先的300多家整车生产商的车辆配套，广泛应用于客车、垃圾车、紧急抢险救援车、建筑车辆和配送车等领域。';
        const _thumbUrl = 'http://allison-app.oss-cn-beijing.aliyuncs.com/img/logo.png';
        const _webUrl = 'http://api.allisonchina.cn/mt/allison/download.do';

        UShare.share(_title,_desc,_webUrl,_thumbUrl,type, (code, message) => {

            Toast(parseInt(code) == 0 ? '分享成功':message);

        });
    }

    renderSectionHeader(name) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{marginLeft:20, color: '#969696',fontSize:16}}>{name}</Text>
            </View>
        )
    }

    getUnReadCount(){
        const body = {
            deviceId: DeviceInfo.getUniqueID(),
        };
        HTTP.startPostPromise(URLS.unReadMessage, body)
            .then((data) => {

                this.setState({unReadCount: parseInt(data.data)});
                // this.setState({unReadCount:0});

            }).catch(e=>{

        });
    }

    login(){
        let {navigation} = this.props
        navigation.navigate('Login',{
            onLogined: () => {
                this.getUnReadCount();

                this.refreshUserInfo();
            },
            onReturnedFromLogin:()=>{
                this.refreshUserInfo();
            }
        });
    }


    logout(){

        Alert.alert(
            '确认退出',
            null,
            [
                {text: '确认', onPress: () => {
                    const body = {
                        deviceId: DeviceInfo.getUniqueID(),
                    };

                    HTTP.startPostPromise(URLS.logout, body)
                        .then((data) => {

                            Toast('退出成功');
                            AsyncStorage.setItem(KEYS.ISKOGINED, '')
                                .then(() => {
                                    this.setState({islogined: false});
                                }).catch();

                            AsyncStorage.setItem(KEYS.NAME, '')
                                .then(() => {
                                    this.setState({name:'登录/注册'});
                                }).catch();

                            AsyncStorage.setItem(KEYS.HEADURL, '')
                                .then(() => {
                                    this.setState({headurl: ''});
                                }).catch();

                            AsyncStorage.setItem(KEYS.USERID, '')
                                .then(() => {
                                    this.setState({id: ''});
                                }).catch();


                        }).catch((e)=>{

                        Toast('退出失败');


                    });
                }},
                {text: '取消', onPress: () => console.log('Bar Pressed!')},
            ]
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        width:SCREEN_WIDTH,
        height:SCREEN_WIDTH*0.533,
    },
    avator:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth:3,
        borderColor:'#6c95bc'
    },
    userInfo:{
        marginLeft:5,
        marginTop:20,
        width:44,
        height:17,
    },
    sectionHeader:{
        marginTop:0,
        backgroundColor:'white',
        height:50,
        justifyContent:'center'
    },
    logout:{

        width:160,
        marginLeft:(SCREEN_WIDTH-160)/2,
        marginRight:(SCREEN_WIDTH-160)/2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#eef3f4',
        borderRadius:5,
        height:40,
        marginTop:40,
        marginBottom:40
    },
    bgImageBgStyle:{
        width:SCREEN_WIDTH,
        height:SCREEN_WIDTH*0.533,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
});
