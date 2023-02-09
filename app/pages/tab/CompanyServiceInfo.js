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

export default class CompanyServiceInfo extends Component {


constructor(props){
    const {state: {params: {url,title}}} = props.navigation;

    super(props);
        that = this;

    this.state = {
        url: url,
        title: title,

    }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });

    render() {
        let {navigation} = this.props
        return (

            <View  style={styles.container}>
            <TabBaseWebView
                ref={'CompanyServiceInfo'}
                isNeedBack={true}
                isshowleftbtn={true}
                navigation={navigation}
                url={this.state.url }
                headerTitle={this.state.url}
                onRightButtonCallback={()=>{


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

