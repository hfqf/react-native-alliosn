import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    TextInput,
    WebView,
    Alert,
    Button
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,RN_HASFIX,URLS} from '../../util/config';
import * as components from '../../components'
import UShare from '../../share/share'
import SharePlatform from '../../share/SharePlatform'
import RNPicker from 'react-native-picker';
import DeviceInfo from 'react-native-device-info';


const WEBVIEW_REF = 'webview';
import Toast from '../../util/toast/CaToastUtil';


let that;

export default class TabProductCenter extends Component {


    componentWillMount(){
        DeviceEventEmitter.addListener('VideoCenter', e=>{
            this.refs['VideoCenter'].reload();
        });
    }



    constructor(props){
        super(props);
        that = this;
        this.state = {
            url: this.props.navigation.state.params.url,
            isShowLeftBtn:false,
            leftBtnTitle:'',
            leftBtnJS:'',
            headerTitle:'',
            isShowRightBtn:false,
            rightBtnTitle:'',
            rightBtnJS:'',
            sharePlatform:'0',
            modalVisible:false,
            shareInfo:{}
        }

    }


    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle:`${navigation.state.params.headerTitle}`,
        // headerLeft:(
        //     <Text  onPress={()=>{
        //         that.leftItemBtnClicked();
        //     }} style={{marginLeft:5, width:80, textAlign:"center"}} >
        //         {navigation.state.params.leftBtnTitle}
        //     </Text>
        // ),
        headerRight:(
            <Text  onPress={()=>{
                console.log('32232332');
                navigation.navigate('NotiSet');
            }} style={{marginLeft:5, width:80, textAlign:"center"}} >
                {navigation.state.params.rightBtnTitle}
            </Text>
        )
    });

    leftItemBtnClicked (){

        let {navigation} = this.props
        navigation.goBack();
    }


    rightItemBtnClicked (){

        let {navigation} = this.props;
        navigation.navigate('WebViewDetail',{
            url:URLS.product+'&devicedId='+DeviceInfo.getUniqueID(),
            headerTitle:'详情',
            isShowLeftBtn:false,
            isShowRightBtn:true,
            leftBtnTitle:'',
            rightBtnTitle:'',
            leftBtnJS:'',
            rightBtnJS:''
        });

    }



    componentDidMount(){



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

        that.setState({
                isShowLeftBtn:_isShowLeftBtn,
                leftBtnTitle:_leftBtnTitle,
                leftBtnJS:_leftleftBtnJS,
                isShowRightBtn:_isShowRightBtn,
                rightBtnTitle:_rightBtnTitle,
                rightBtnJS:_rightBtnJS,
                headerTitle:_headerTitle,
            },function () {
                callback();
            }
        );



    }

    onMessage = e => {
        const _json =  JSON.parse(e.nativeEvent.data);
        if(_json.topMenu != undefined){
            const  _arr = _json.topMenu;
            console.log('onMessage'+e.nativeEvent.data);

            that._setOnesState(_arr,function () {

                const {state, setParams } = that.props.navigation;
                setParams({ leftBtnTitle: that.state.leftBtnTitle,rightBtnTitle: that.state.rightBtnTitle ,headerTitle:that.state.headerTitle});

            });
        }else if(_json.share != undefined){

            const _shareInfo =  _json.share[0];

            this.setState({modalVisible:false,shareInfo:_shareInfo},function () {

                that.openModal();

            });

        }


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


        return (
        //     <TabBaseWebView
        //     isTabPage={true}
        //     ref={'ProductCenter'}
        //     isNeedBack={false}
        //     navigation={navigation}
        //     url={URLS.product }
        //     headerTitle={''}
        //     onRightButtonCallback={()=>{
        //         navigation.navigate('TabMessage',{onReturned:()=>{

        //         }});
        //     }}
        //     onLeftButtonCallback={()=>{
        //         navigation.navigate('CompanyAbout');
        //     }}
        // />
            <View style={styles.container}>
                <WebView
                    ref={'VideoCenter'}
                    isTabPage={true}
                    style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-20,backgroundColor:'gray'}}
                    source={{uri:this.state.url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    onMessage={this.onMessage.bind(this)}
                    injectedJavaScript={patchPostMessageJsCode}
                />
                <components.ShareModal
                  modalVisible={this.state.modalVisible}
                  title='分享该网页'
                  wxAction={() => this.shareTo(SharePlatform.WECHAT)}
                  wxMomentAction={() => this.shareTo(SharePlatform.WECHATMOMENT)}
                  qqAction={() => this.shareTo(SharePlatform.QQ)}
                  wbAction={() => this.shareTo(SharePlatform.SINA)}
                  qZone={()=>this.shareTo(SharePlatform.QQZONE)}
                />
            </View>
        );

    }



    goBack = () => {
        this.refs[WEBVIEW_REF].goBack();
    };

    goForward = () => {
        this.refs[WEBVIEW_REF].goForward();
    };

    reload = () => {
        this.refs[WEBVIEW_REF].reload();
    };


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
        const _thumbUrl = 'http://dev.umeng.com/images/tab2_1.png';// shareInfo.thumbUrl;
        // const _webUrl = shareInfo.webpageUrl;
        const _webUrl = 'http://www.baidu.com';


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
