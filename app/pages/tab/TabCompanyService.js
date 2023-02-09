import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter
} from 'react-native';
import {URLS} from '../../util/config';

import TabBaseWebView from "../base/TabBaseWebView";
import DeviceInfo from 'react-native-device-info';
import HTTP from '../../util/http/HTTPManager';
import Toast from '../../util/toast/CaToastUtil';

export default class TabCompanyService extends Component {
    constructor(props){
        super(props);

        this.state = {
            islogined:false,
        }

    }
    static navigationOptions = ({navigation, screenProps}) => ({
        header:null,
    });

    componentWillMount(){
        this.getLoginState();
        DeviceEventEmitter.addListener('TabCompanyService', e=>{
            this.getLoginState();
            this.refs['TabCompanyService'].reload();
        });
    }

    getLoginState(){
        const body = {
            deviceId: DeviceInfo.getUniqueID(),
        };

        HTTP.startPostPromise(URLS.getLoginUserInfo, body)
            .then((data) => {
                this.setState({islogined: data.result == '1'});
            }).catch(e=>{

        });

    }

    render() {
        let {navigation} = this.props
        return (
            <View  style={styles.container}>
                <TabBaseWebView

                    isTabPage={true}
                    ref={'TabCompanyService'}
                    isNeedBack={false}
                    navigation={navigation}
                    url={URLS.server }
                    headerTitle={'企业服务'}
                    onRightButtonCallback={()=>{

                        let {navigation} = this.props
                        navigation.navigate('TabMessage',{
                            onReturned:()=>{

                            }
                        });

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

