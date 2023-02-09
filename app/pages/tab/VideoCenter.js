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
    Button,
    DeviceEventEmitter
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,RN_HASFIX,URLS} from '../../util/config';

import TabBaseWebView from "../base/TabBaseWebView";
import HocUtil from "../base/HocUtil";


export default class TabProduct1 extends Component {


    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });


    componentWillMount(){
        DeviceEventEmitter.addListener('VideoCenter', e=>{
            console.log('VideoCenter componentWillMount')
            this.refs['VideoCenter'].reload();
        });
    }


    render() {
        let {navigation} = this.props
        // const TabWebViewHoc = HocUtil({isNeedBack:false,navigation:navigation, url:URLS.product,
        // headerTitle:'公司产品',
        // onRightButtonCallback:()=>{
        //
        // },
        // onLeftButtonCallback:()=>{
        //     navigation.navigate('CompanyAbout');
        // }});

        return (
            <View  style={styles.container}>
                <TabBaseWebView
                    isTabPage={true}
                    ref={'VideoCenter'}
                    isNeedBack={false}
                    navigation={navigation}
                    url={URLS.videocenter }
                    headerTitle={'视频中心'}
                    onRightButtonCallback={()=>{
                        navigation.navigate('TabMessage',{onReturned:()=>{

                        }});
                    }}
                    onLeftButtonCallback={()=>{
                        navigation.navigate('CompanyAbout');
                    }}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

