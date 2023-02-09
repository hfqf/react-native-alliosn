import React, { Component,PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    TextInput,
    WebView,
    Alert,
    Button,
    BackHandler,
    TouchableWithoutFeedback,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,RN_HASFIX,URLS,RN_HASFIXWith,NAV_BAR_HEIGHT} from '../../util/config';
import * as components from '../../components'
import UShare from '../../share/share'
import SharePlatform from '../../share/SharePlatform'
import RNPicker from 'react-native-picker';
import DeviceInfo from 'react-native-device-info';


const WEBVIEW_REF =  SYSTEM.iOS ? 'TabBaseWebView' : 'TabBaseWebView4Android';
import Toast from '../../util/toast/CaToastUtil';
import PropTypes from 'prop-types';
import AndroidWebView from 'react-native-webview-android'
import WebViewDetail from "./WebViewDetail";

class TabBaseWebView extends Component {

    static  propTypes={
        url: PropTypes.string.isRequired,
        headerTitle:PropTypes.string.isRequired,
        isShowLeftBtn:PropTypes.bool,
        leftBtnTitle:PropTypes.string,
        leftBtnJS:PropTypes.string,
        isShowRightBtn:PropTypes.bool,
        rightBtnTitle:PropTypes.string,
        rightBtnJS:PropTypes.string,
        onLeftButtonCallback:PropTypes.func.isRequired,
        onRightButtonCallback:PropTypes.func.isRequired,
        sharePlatform:PropTypes.string,
        modalVisible:PropTypes.bool,
        shareInfo:PropTypes.object,
        navigation:PropTypes.object.isRequired,
        isNeedBack:PropTypes.bool,
        isLeftItemIcon:PropTypes.bool,
        isRightItemIcon:PropTypes.bool,
        canGoback:PropTypes.bool,
        isTabPage:PropTypes.bool,
        isNeedPickImage:PropTypes.bool
    }


    static  defaultProps={
        url:'',
        headerTitle:'',
        isShowLeftBtn:false,
        leftBtnTitle:'',
        leftBtnJS:'',
        isShowRightBtn:false,
        rightBtnTitle:'',
        rightBtnJS:'',
        sharePlatform:'0',
        modalVisible:false,
        shareInfo:{},
        isNeedBack:true,
        isLeftItemIcon:false,
        isRightItemIcon:false,
        canGoback:false,
        isTabPage:false,
        isNeedPickImage:false
    }



    constructor(props){
        super(props);
        console.log('TabBaseWebView constructor'+this.props.url);
        this.state = {
            url: this.props.url,
            headerTitle: this.props.headerTitle,
            isShowLeftBtn: this.props.isShowLeftBtn,
            leftBtnTitle: this.props.leftBtnTitle,
            leftBtnJS: this.props.leftBtnJS,
            isShowRightBtn: this.props.isShowRightBtn,
            rightBtnTitle: this.props.rightBtnTitle,
            rightBtnJS: this.props.rightBtnJS,
            onLeftButtonCallback: this.props.onLeftButtonCallback,
            onRightButtonCallback: this.props.onRightButtonCallback,
            sharePlatform: this.props.sharePlatform,
            modalVisible: this.props.modalVisible,
            shareInfo: this.props.shareInfo,
            isNeedBack:this.props.isNeedBack,
            navigation:this.props.navigation,
            isTabPage:this.props.isTabPage,
            isNeedPickImage:this.props.isNeedPickImage,
            isCanGoBack4AndroidWebView:false,
            isLoaded:true,
        }
    }


    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });



    clearComputer(){
        if(this.state.leftBtnJS.length > 0){
            this.refs[WEBVIEW_REF].postMessage(this.state.leftBtnJS);
        }
    }

    componentWillMount(){
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
        return true;
        // if (this.state.isTabPage) {
        //     return true;
        // }else {
        //     let  navigation = this.state.navigation;
        //     navigation.goBack();
        //     return false;
        // }
    }


    render() {

        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
        };

        const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

        let that = this;
        return (


            <View style={styles.container}>
                <components.NavigationBar
                    isH5={true}
                    isNeedPickImage={this.state.isNeedPickImage}
                    isTabPage = {this.state.isTabPage}
                    isLeftItemIcon={this.state.isLeftItemIcon}
                    isRightItemIcon={this.state.isRightItemIcon}
                    isNeedBack={this.state.isNeedBack}
                    leftItmeTitle={this.state.leftBtnTitle}
                    rightItmeTitle={this.state.rightBtnTitle}
                    isShowLeftItem={ this.state.isShowLeftBtn }
                    isShowRightItem={this.state.isShowRightBtn}
                    title={this.state.headerTitle}
                    onLeftItemCallback={this.props.onLeftButtonCallback}
                    onRightItemCallback= {()=>{

                        _rightJs =  that.state.rightBtnJS;
                        if(_rightJs == 'share4ios()') {
                            that.startShare()
                        }else if(_rightJs == 'send()'){
                            that.startRightJs()
                        }else if(_rightJs == 'jumpTidings()'){
                            this.state.navigation.navigate('TabMessage',{onReturned:()=>{

                                }});
                        }
                        else {
                            this.props.onRightButtonCallback()
                        }
                    }}
                />


                {SYSTEM.iOS || this.state.isNeedPickImage == false ?

                    SYSTEM.iOS ?
                        <WebView
                            onNavigationStateChange={(url, title, loading, canGoBack, canGoForward) => {


                            }}
                            ref={WEBVIEW_REF}
                            style={{
                                width: SCREEN_WIDTH,
                                height: SCREEN_HEIGHT - NAV_BAR_HEIGHT,
                                backgroundColor: 'gray'
                            }}
                            source={{uri: this.state.url, method: 'GET'}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            scalesPageToFit={true}
                            renderError={() => {
                                return this._renderError()
                            }
                            }
                            onError={(error) => {
                                // this.setState({isLoaded:false})
                            }}
                            onMessage={this.onMessage.bind(this)}
                            injectedJavaScript={patchPostMessageJsCode}
                        />
                        :
                        <KeyboardAvoidingView behavior="padding" style={styles.container2}>
                            <WebView
                                onNavigationStateChange={(url, title, loading, canGoBack, canGoForward) => {


                                }}
                                ref={WEBVIEW_REF}
                                style={{
                                    width: SCREEN_WIDTH,
                                    height: SCREEN_HEIGHT - NAV_BAR_HEIGHT,
                                    backgroundColor: 'gray'
                                }}
                                source={{uri: this.state.url, method: 'GET'}}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                scalesPageToFit={true}
                                renderError={() => {
                                    return this._renderError()
                                }
                                }
                                onError={(error) => {
                                    // this.setState({isLoaded:false})
                                }}
                                onMessage={this.onMessage.bind(this)}
                                injectedJavaScript={patchPostMessageJsCode}
                            />
                        </KeyboardAvoidingView>

                    :
                    <AndroidWebView
                    onNavigationStateChange = {(url, title, loading, canGoBack, canGoForward) => {
                    if (url.canGoBack) {
                        this.state.navigation.state.params.onBacked();
                        this.state.navigation.goBack();
                    }
                    console.log('AndroidWebView' + JSON.stringify(url));

                }}
                    ref={WEBVIEW_REF}
                    style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT - NAV_BAR_HEIGHT, backgroundColor: 'gray'}}
                    source={{uri: this.state.url, method: 'GET'}}
                    javaScriptEnabled={true}
                    onMessage={this.onMessage.bind(this)}
                    injectedJavaScript={patchPostMessageJsCode}
                    />
                }


                <components.ShareModal
                    modalVisible={this.state.modalVisible}
                    title='分享该网页'
                    wxAction={() => this.shareTo(SharePlatform.WECHAT)}
                    wxMomentAction={() => this.shareTo(SharePlatform.WECHATMOMENT)}
                    qqAction={() => this.shareTo(SharePlatform.QQ)}
                    wbAction={() => this.shareTo(SharePlatform.SINA)}
                    qZone={()=>this.shareTo(SharePlatform.QQZONE)}
                    cancelAction={()=>{
                        this.closeModal();
                        Toast('取消分享')
                    }}
                />
            </View>
        );

    }

    _renderError=()=>{
        let that = this;
       return  (
           <TouchableWithoutFeedback onPress={()=>{
               that.reload();
           }}
           >
           <View style={styles.container1}>
               {/*<Text style={styles.errorContainer}>*/}
                   {/*重新加载*/}
               {/*</Text>*/}
               <Image style={{width:200,height:200,marginTop:(SCREEN_HEIGHT-NAV_BAR_HEIGHT-200)/2-50,marginLeft:(SCREEN_WIDTH-200)/2}} source={require('../../resource/allison/network_error.png')}/>

            </View>
           </TouchableWithoutFeedback>
       );
    }


    _setOnesState= (_arr,callback) => {

        let   _isShowLeftBtn = false
        let   _leftBtnTitle  = '1'
        let   _leftleftBtnJS = ''
        let   _isShowRightBtn = false
        let   _rightBtnTitle = '3'
        let   _rightBtnJS = ''
        let   _headerTitle=''
        for(let i=0 ;i<_arr.length;i++){
            const  info = _arr[i];
            if(info.menuType == 'left'){
                _isShowLeftBtn=true
                _leftBtnTitle=info.menuName
                _leftleftBtnJS=info.menuEvent

            }else if(info.menuType == 'right'){
                _isShowRightBtn=true
                _rightBtnTitle=info.menuName
                _rightBtnJS=info.menuEvent
            }else if(info.menuType == 'center') {
                _headerTitle=info.menuName
            }
        }

        this.setState({
                isShowLeftBtn:_isShowLeftBtn,
                leftBtnTitle:_leftBtnTitle,
                leftBtnJS:_leftleftBtnJS,
                isShowRightBtn:_isShowRightBtn,
                rightBtnTitle:_rightBtnTitle,
                rightBtnJS:_rightBtnJS,
                headerTitle:_headerTitle,
                isLeftItemIcon:_leftBtnTitle.indexOf("http")>-1,
                isRightItemIcon:_rightBtnTitle.indexOf("http")>-1
            },function () {
                callback();
            }
        );



    }


    onMessage = e => {
        console.log('onMessage'+e.nativeEvent.data);
        const _json =  JSON.parse(e.nativeEvent.data);
        if(_json.topMenu != undefined){
            const  _arr = _json.topMenu;

            this._setOnesState(_arr,function () {

                // const {state, setParams } = that.props.navigation;
                // setParams({ leftBtnTitle: that.state.leftBtnTitle,rightBtnTitle: that.state.rightBtnTitle ,headerTitle:that.state.headerTitle});

            });
        }else if(_json.share != undefined){

            const _shareInfo =  _json.share[0];

            this.setState({modalVisible:false,shareInfo:_shareInfo},function () {

                this.openModal();

            });

        }else if(_json.companyService != undefined){
            const webInfo =   _json.companyService[0];
            const _url = webInfo.url;
            const _title = webInfo.title;
            this.state.navigation.navigate('WebViewDetail',
                {url:_url+RN_HASFIXWith,
                isEditForComputer:true,
                    title:_title,
                    onReturned:()=>{
                        this.reload();
                    },
                    onReturned2:(editCarInformation)=>{
                        this.reload4editCarInformation(editCarInformation);
                    }
                });
        }else if(_json.loginJumping != undefined){
            this.state.navigation.navigate('Login',
                {
                    onLogined: () => {
                        this.reload();
                },
                    onReturnedFromLogin:()=>{
                    this.reload();
                }
            });
        }else if(_json.goback != undefined){
            this.state.navigation.state.params.onReturned();
            this.state.navigation.goBack();
        }else if(_json.realoadCarInformation != undefined){

            const editCarInformation =   _json.realoadCarInformation[0];
            this.state.navigation.state.params.onReturned2(editCarInformation.url);
        }
        }



    canGoback(){
        return this.state.canGoback;
    }


    getLeftJs=()=>{
        return this.state.leftBtnJS;
    }


    goBack = () => {
        this.refs[WEBVIEW_REF].goBack();
    };

    goBack4Web = () => {
        this.refs[WEBVIEW_REF].goBack();
    };


    goForward = () => {
        this.refs[WEBVIEW_REF].goForward();
    };

    reload = () => {
            this.refs[WEBVIEW_REF].reload();
    };

    reload4ViewAppeared = () => {
        this.refs[WEBVIEW_REF].reload();
    };

    reload4editCarInformation = (newUrl) => {

        if(newUrl != undefined){
            this.setState({url:newUrl});
            this.reload();
        }
    };

    //分享

    startShare(){
        if(this.state.rightBtnJS.length > 0){
            this.refs[WEBVIEW_REF].postMessage(this.state.rightBtnJS);
        }
    }

    startGetComputeredPatas(){
        if(this.state.leftBtnJS.length > 0){
            this.refs[WEBVIEW_REF].postMessage(this.state.leftBtnJS);
        }
    }

    startRightJs(){
        if(this.state.rightBtnJS.length > 0){
            this.refs[WEBVIEW_REF].postMessage(this.state.rightBtnJS);
        }
    }

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    shareTo(type) {
        this.closeModal();

        const shareInfo =  this.state.shareInfo;
        const _title = shareInfo.title;
        const  _desc = shareInfo.desc;
        const _thumbUrl =  shareInfo.thumbUrl;
         const _webUrl = shareInfo.webpageUrl;

        UShare.share(_title,_desc,_webUrl,_thumbUrl,type, (code, message) => {

            Toast(parseInt(code) == 0 ? '分享成功':message);
            console.log('UShare.share'+code+message);
            let callbackJson = {shareCallback:{
                shareInfo:shareInfo,
                platform:String(type),
                state:parseInt(code) == 0?'1':'0'
            }};

            console.log('callbackJson:'+ JSON.stringify(callbackJson));
            this.refs[WEBVIEW_REF].postMessage(JSON.stringify(callbackJson));

        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    container2: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingTop: 0,
    },

    container1: {
        backgroundColor: 'white',
        flex: 1,
    },

    errorContainer: {
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT-NAV_BAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        textAlign:'center',
    },
    modalContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    innerContainer: {
        height:200,
        alignItems: 'center',
        backgroundColor: 'red',

    },
});


export  default  TabBaseWebView;
