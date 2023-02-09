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

export default class WebViewDetail extends Component {


    constructor(props){
        const {state: {params: {url,title,isPush,isEditForComputer}}} = props.navigation;

        super(props);
        that = this;

        this.state = {
            isEditForComputer:isEditForComputer!=undefined&&isEditForComputer,
            url: url,
            title: title,
            isPush:isPush==undefined?false:isPush
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
                    ref={'WebViewDetail'}
                    isNeedBack={true}
                    isShowLeftBtn={true}
                    navigation={navigation}
                    url={this.state.url }
                    headerTitle={this.state.title}
                    onRightButtonCallback={()=>{



                    }}

                    onLeftButtonCallback={()=>{

                        if(this.refs['WebViewDetail'].getLeftJs()=='edit()'){
                            this.refs['WebViewDetail'].startGetComputeredPatas();
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

