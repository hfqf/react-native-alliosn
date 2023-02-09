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


let that;

export default class TabFeedfback extends Component {


    constructor(props){
        super(props);
        that = this;
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });

    render() {
        let {navigation} = this.props
        return (

            <View  style={styles.container}>
            <TabBaseWebView
                ref={'TabFeedfback'}
                isNeedBack={true}
                isShowLeftBtn={true}
                navigation={navigation}
                url={URLS.feedback }
                headerTitle={'我的反馈'}

                onRightButtonCallback={()=>{

                    let {navigation} = this.props
                    navigation.navigate('TabAddFeedback',{
                        onBacked:()=>{
                        this.refs['TabFeedfback'].reload();
                    },
                        onReturned:()=>{
                            this.refs['TabFeedfback'].reload();
                        },
                    });

                }}

                onLeftButtonCallback={()=>{
                    navigation.goBack();
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

