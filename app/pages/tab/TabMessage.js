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

import TabBaseWebView from "../base/TabBaseWebView";

import JPush from 'jpush-react-native'

export default class TabMessage extends Component {


    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });


    componentWillMount(){

        if(SYSTEM.iOS){
            JPush.setBadge(0,function () {

            });
        }

    }

    render() {
        let {navigation} = this.props

        return (

            <View  style={styles.container}>
            <TabBaseWebView
                isNeedBack={true}
                isShowLeftBtn={true}
                navigation={navigation}
                url={navigation.state.params.url == undefined ? URLS.tidings : navigation.state.params.url}
                headerTitle={'我的消息'}

                onRightButtonCallback={()=>{

                    let {navigation} = this.props
                    navigation.navigate('PushSet',{
                    });

                }}

                onLeftButtonCallback={()=>{

                    if(navigation.state.params.isPush){
                        navigation.goBack();
                        navigation.state.params.onReturnedFromWebDetail();
                    }else {
                        navigation.state.params.onReturned();
                        navigation.goBack();
                    }
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

