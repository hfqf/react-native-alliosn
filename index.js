import React, { Component } from 'react';
import { AppRegistry, NativeModules, NativeAppEventEmitter,AsyncStorage,DeviceEventEmitter,Platform} from 'react-native';

import {AppNavigator,AppNavigator2} from './app/Navigation';

var Oc2RnManager = NativeModules.Oc2RnManager
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';

import  IMEI  from 'react-native-imei';


import {SCREEN_WIDTH,SYSTEM,COLOR,KEYS,HTTP} from './app/util/config'

import Device from  './app/util/DeviceUtil';


export default class CoreApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            isneedlogin: false,
        }

    }



    componentWillMount () {}



    render() {
    return true ?
        (
      <AppNavigator
          ref={'index'}
          onNavigationStateChange={(prevState, currentState,event) => {
              const getCurrentRouteName = (navigationState) => {
                  if (!navigationState) return null;
                  const route = navigationState.routes[navigationState.index];
                  if (route.routes) return getCurrentRouteName(route);
                  return route.routeName;
              };
              let currentRoute = getCurrentRouteName(currentState);
              const prevScreen = getCurrentRouteName(prevState);
              console.log('onNavigationStateChange'+currentRoute+'&'+prevScreen+'&'+JSON.stringify(event));

              if(currentRoute != prevScreen &&event.params == undefined ) {
                  console.log('RELOAD0_TAB'+currentRoute);
                  DeviceEventEmitter.emit(currentRoute,currentRoute);
              }
          }}

      />
    ):   (
            <AppNavigator2
                onNavigationStateChange={(prevState, currentState,event) => {
                    const getCurrentRouteName = (navigationState) => {
                        if (!navigationState) return null;
                        const route = navigationState.routes[navigationState.index];
                        if (route.routes) return getCurrentRouteName(route);
                        return route.routeName;
                    };
                    let currentRoute = getCurrentRouteName(currentState);
                    const prevScreen = getCurrentRouteName(prevState);
                    console.log('onNavigationStateChange'+currentRoute+prevScreen+JSON.stringify(event));

                    // if(currentRoute != prevScreen &&event.params == undefined ) {
                    //     DeviceEventEmitter.emit('RELOAD_TAB',currentRoute);
                    // }
                }}

            />
        )
  }
}


AppRegistry.registerComponent('CoreApp', () => CoreApp);
