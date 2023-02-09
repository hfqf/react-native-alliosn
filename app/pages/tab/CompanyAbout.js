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
    Button, DeviceEventEmitter
} from 'react-native';

import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,RN_HASFIX,URLS} from '../../util/config';

import TabBaseWebView from "../base/TabBaseWebView";


let that;

export default class CompanyAbout extends Component {


    constructor(props){
        super(props);
        that = this;

    }

    componentWillMount(){
        DeviceEventEmitter.addListener('CompanyStack', e=>{
            this.refs['CompanyAbout'].reload();
        });
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });

    render() {
        let {navigation} = this.props
        return (

            <View  style={styles.container}>
            <TabBaseWebView
                ref={'CompanyAbout'}
                isNeedBack={false}
                isshowleftbtn={true}
                navigation={navigation}
                url={URLS.about }
                headerTitle={''}
                onRightButtonCallback={()=>{

                    // this.refs['CompanyAbout'].startShare();

                }}

                onLeftButtonCallback={()=>{



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

