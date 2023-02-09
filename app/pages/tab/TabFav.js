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

export default class TabFav extends Component {


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
                isNeedBack={true}
                isShowLeftBtn={true}
                navigation={navigation}
                url={URLS.collect }
                headerTitle={'我的收藏'}

                onRightButtonCallback={()=>{

                    navigation.navigate('TabMessage',{onReturned:()=>{

                    }});

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

