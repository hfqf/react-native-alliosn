/**
 * ailife   导航
 *
 */

 import React from 'react'

import {
    Image,
    Alert,
    Button,
    Text,
    AsyncStorage
} from 'react-native';

 import {StackNavigator, TabNavigator} from 'react-navigation'

 import {COLOR, SYSTEM, JNZP_URLS, KEYS,SCREEN_WIDTH} from './util/config';
 import * as components from './components';

import DeviceUtil from  './util/DeviceUtil';


 // //引导页
 import AppIntroPage from './pages/AppIntro/AppIntroPage';

 // 登陆页
 import Login from './pages/Login';
 import Adv from './pages/adv';

 /*
 tab四个主页面
  */
 import Home from './pages/Home';
 import News from './pages/News';
 import Movie from './pages/Movie';
 import Mine from './pages/tab/TabMine';
 import Register from './pages/Register';

 import VerifyCodeLogin from './pages/VerfrifyCodeLogin';
 import ForgetPwd from './pages/ForgetPwd';


 /*
 首页模块
  */
 import TestPage from './pages/TestPage'
 import SharePage from './pages/SharePage'

 /*
  联系人模块
  */
 import ContactDetail from './pages/ContactDetail'
 import EditProfile from './pages/EditProfile'

import WebViewDetail from './pages/base/WebViewDetail'


import ProductCenter from './pages/tab/TabProduct'

import ProductCenter1 from './pages/tab/TabProduct1'
import VideoCenter from './pages/tab/VideoCenter'

import Computer from './pages/tab/TabComputer'
import TabCompanyService from './pages/tab/TabCompanyService'
import CompanyAbout from './pages/tab/CompanyAbout'
import CompanyServiceInfo from './pages/tab/CompanyServiceInfo'

import TabUserInfo from './pages/tab/TabUserInfo'
import TabFav from './pages/tab/TabFav'
import TabFeedback from './pages/tab/TabFeedfback'
import TabMessage from './pages/tab/TabMessage'
import TabAddFeedback from './pages/tab/TabAddFeedback'

import PushSet from './pages/PushSet'

import AccountSafe from './pages/AccountSafe'
import ResetPwd from './pages/ResetPwd'
import SafeVerify from './pages/SafeVerify'
import InputVerifyCode from './pages/InputVerifyCode'
import ChangeTelPhone from './pages/ChangeTelPhone'



import DeviceInfo from 'react-native-device-info';



 const HomeIcon_Normal = require('./resource/tabbar/home_normal.png');
 const HomeIcon_Selected = require('./resource/tabbar/home_selected.png');
 const MovieIcon_Normal = require('./resource/tabbar/movie_normal.png');
 const MovieIcon_Selected = require('./resource/tabbar/movie_selected.png');
 const NewsIcon_Normal = require('./resource/tabbar/news_normal.png');
 const NewsIcon_Selected = require('./resource/tabbar/news_selected.png');
 const MineIcon_Normal = require('./resource/tabbar/mine_normal.png');
 const MineIcon_Selected = require('./resource/tabbar/mine_selected.png');

const tab0_un = require('./resource/tabicons/tab0_un.png');
const tab0_on = require('./resource/tabicons/tab0_on.png');
const tab1_un = require('./resource/tabicons/tab1_un.png');
const tab1_on = require('./resource/tabicons/tab1_on.png');
const tab2_un = require('./resource/tabicons/tab2_un.png');
const tab2_on = require('./resource/tabicons/tab2_on.png');
const tab3_un = require('./resource/tabicons/tab3_un.png');
const tab3_on = require('./resource/tabicons/tab3_on.png');
const tab4_un = require('./resource/tabicons/tab4_un.png');
const tab4_on = require('./resource/tabicons/tab4_on.png');
const videocenter_un = require('./resource/tabicons/video_un.png');
const videocenter_on = require('./resource/tabicons/video_on.png');





 const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
   const tabBarLabel= tabBarTitle;
   const tabBarIcon = (({tintColor,focused}) =>{
     return(
       <components.TabBarItem
         focused = {focused}
         normalImage = {normalImage}
         selectedImage = {selectedImage}
         tintColor = {tintColor}
         title={navTitle}
       />
     )
   });
   const headerStyle={backgroundColor:'white'};
   const headerTitle = navTitle;
   const headerTitleStyle = {fontSize:18,color:'black',alignSelf:'center'}
   const tabBarVisible = true;
   return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
 }

const TabOptions2 = (tabBarTitle,normalImage,selectedImage) => {
    const tabBarLabel= tabBarTitle;
    const tabBarIcon = (({tintColor,focused}) =>{
        return(
                <components.TabBarItem
                    focused = {focused}
                    normalImage = {normalImage}
                    selectedImage = {selectedImage}
                    tintColor = {tintColor}
                />
        )
    });
    const headerStyle={backgroundColor:'white'};
    const headerTitleStyle = {fontSize:18,color:'black',alignSelf:'center'}
    const tabBarVisible = true;
    return {tabBarLabel,tabBarIcon,headerTitleStyle,headerStyle,tabBarVisible};
}

 // const StackOptions = ({navigation}) => {
 //     // console.log(navigation);
 //     let {state,goBack} = navigation;
 //
 //     const headerStyle = {backgroundColor:'#4ECBFC'};
 //
 //     const headerTitle = state.params ? state.params.title : state.routeName;
 //
 //     const headerTitleStyle = {fontSize:SYSTEM.iOS?20:23,
 //         color:'white',fontWeight:'500',alignSelf:'center',paddingTop:SYSTEM.iOS? null: 17,}
 //     const headerBackTitle = '返回'
 //     const headerBackTitleStyle={color:'black',fontSize:16}
 //     const headerLeft = (
 //         <Button
 //             isCustom={true}
 //             customView={
 //                             <Icon
 //                                 name='ios-arrow-back'
 //                                 size={30}
 //                                 color='white'
 //                                 style={{marginLeft:12,paddingTop:SYSTEM.iOS? null: 17}}
 //                             />
 //                         }
 //             onPress={()=>{goBack()}}
 //         />
 //     );
 //     let headerRight;
 //     if (state.params?state.params.headerRight:null){
 //         headerRight = state.params.headerRight;
 //     }
 //     let header;
 //     if (state.params ? state.params.isVisible === true : null){
 //         header = null;
 //     }
 //     return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight,headerBackTitle}
 // };
 //
 //


 /*
  页面需要隐藏tabbar时通用方法，传入页面名称
  */
const PageHiddenTabbar = (screen) => {
  return {screen: screen, navigationOptions: {
    tabBarVisible:false
  }}
}


const HomeStack = StackNavigator({
  Home: {
    screen:Home,
      navigationOptions:() => TabOptions('首页',HomeIcon_Normal,HomeIcon_Selected,'首页'),
  },
  TestPage: PageHiddenTabbar(TestPage),
  WebViewDetail:PageHiddenTabbar(WebViewDetail),
  SharePage:PageHiddenTabbar(SharePage)
},{
  navigationOptions:{
    headerBackTitleStyle:{color:'black'},
    headerTintColor:'black'
  }
}
)


const MovieStack = StackNavigator({
  Movie: {
    screen:Movie,
      navigationOptions:() => TabOptions('电影',MovieIcon_Normal,MovieIcon_Selected,'电影'),
  }
},
{
  navigationOptions:{
    headerBackTitleStyle:{color:'black'},
    headerTintColor:'black'

  }
}
)

const NewsStack = StackNavigator({
  News: {
    screen:News,
    navigationOptions:() => TabOptions('联系人',NewsIcon_Normal,NewsIcon_Selected,'联系人'),
  },
  ContactDetail: PageHiddenTabbar(ContactDetail),

  EditProfile: PageHiddenTabbar(EditProfile)
},
{
  navigationOptions:{
    headerBackTitleStyle:{color:'black'},
    headerTintColor:'black'
  }
}
)

const MineStack = StackNavigator({
  Mine: {
    screen:Mine,
      navigationOptions:() => TabOptions('我的',tab4_un,tab4_on,'我的'),
  },
        TabUserInfo:PageHiddenTabbar(TabUserInfo),
        TabFav:PageHiddenTabbar(TabFav),
        TabFeedback:PageHiddenTabbar(TabFeedback),
        TabMessage:PageHiddenTabbar(TabMessage),
        TabAddFeedback:PageHiddenTabbar(TabAddFeedback),
        PushSet:PageHiddenTabbar(PushSet),
        AccountSafe:PageHiddenTabbar(AccountSafe),
        ResetPwd:PageHiddenTabbar(ResetPwd),
        SafeVerify:PageHiddenTabbar(SafeVerify),
        InputVerifyCode:PageHiddenTabbar(InputVerifyCode),
        ChangeTelPhone:PageHiddenTabbar(ChangeTelPhone),
        WebViewDetail:PageHiddenTabbar(WebViewDetail),


    },

{
  navigationOptions:{
    headerBackTitleStyle:{color:'black'},
    headerTintColor:'black'
  }
}
)

const ProductCenterStack = StackNavigator({
        ProductCenter: {
            screen:ProductCenter1,
            navigationOptions:() => TabOptions('产品中心',tab1_un,tab1_on,'产品中心'),
        },
        WebViewDetail:PageHiddenTabbar(WebViewDetail),
        TabCompanyService:PageHiddenTabbar(TabCompanyService),
        TabMessage:PageHiddenTabbar(TabMessage),
        PushSet:PageHiddenTabbar(PushSet),


    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:'',
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'产品中心',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)

const VideoCenterStack = StackNavigator({
    VideoCenter: {
        screen:VideoCenter,
        navigationOptions:() => TabOptions('视频中心',videocenter_un,videocenter_on,'视频中心'),
    },
    WebViewDetail:PageHiddenTabbar(WebViewDetail),
    TabCompanyService:PageHiddenTabbar(TabCompanyService),
    TabMessage:PageHiddenTabbar(TabMessage),
    PushSet:PageHiddenTabbar(PushSet),


},
{
    navigationOptions:{
        headerBackTitleStyle:{color:'black'},
        headerTintColor:'black'
    },
    initialRouteParams:{
        url:'',
        isShowLeftBtn:false,
        leftBtnTitle:'返回',
        leftBtnJS:'',
        headerTitle:'产品中心',
        isShowRightBtn:false,
        rightBtnTitle:'...',
        rightBtnJS:'',
    },
}
)

const ComputerStack = StackNavigator({
        Computer: {
            screen:Computer,
            navigationOptions:() => TabOptions('计算器',tab2_un,tab2_on,'计算器'),
        },
        WebViewDetail:PageHiddenTabbar(WebViewDetail),
        TabMessage:PageHiddenTabbar(TabMessage),
        PushSet:PageHiddenTabbar(PushSet),

    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:'',
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'计算器',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)

const TabCompanyServiceStack = StackNavigator({
        TabCompanyService: {
            screen:TabCompanyService,
            navigationOptions:() => TabOptions('企业服务',tab3_un,tab3_on,'企业服务'),
        },
        CompanyServiceInfo:PageHiddenTabbar(CompanyServiceInfo),
        TabMessage:PageHiddenTabbar(TabMessage),
        PushSet:PageHiddenTabbar(PushSet),
        WebViewDetail:PageHiddenTabbar(WebViewDetail),
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:'',
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)


const CompanyAboutStack = StackNavigator({
        CompanyStack: {
            screen:CompanyAbout,
            navigationOptions:() => TabOptions('企业介绍',tab0_un,tab0_on,'企业介绍'),
        },
        WebViewDetail:PageHiddenTabbar(WebViewDetail),
        TabMessage:PageHiddenTabbar(TabMessage),
        PushSet:PageHiddenTabbar(PushSet),
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:'',
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)

/*
广告投放
 */

import Tab1 from './pages/tab2/TabHome'
import Tab2 from './pages/tab2/TabTakeData'
import Tab3 from './pages/tab2/TabAnalysis'
import Tab4 from './pages/tab2/TabAdvPush'

const TAB1Stack = StackNavigator({
        tab1: {
            screen:Tab1,
            navigationOptions:() => TabOptions('首页',tab1_un,tab1_on,'首页'),
        }
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:JNZP_URLS.home,
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'企业服务',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)



const TAB2Stack = StackNavigator({
        tab2: {
            screen:Tab2,
            navigationOptions:() => TabOptions('数据采集',tab2_un,tab2_on,'数据采集'),
        }
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:JNZP_URLS.takedata,
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'企业服务',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)


const TAB3Stack = StackNavigator({
        tab3: {
            screen:Tab3,
            navigationOptions:() => TabOptions('画像分析',tab3_un,tab3_on,'画像分析'),
        }
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:JNZP_URLS.analysis,
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'企业服务',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)


const TAB4Stack = StackNavigator({
        tab4: {
            screen:Tab4,
            navigationOptions:() => TabOptions('广告投放',tab4_un,tab4_on,'广告投放'),
        }
    },
    {
        navigationOptions:{
            headerBackTitleStyle:{color:'black'},
            headerTintColor:'black'
        },
        initialRouteParams:{
            url:JNZP_URLS.advpush,
            isShowLeftBtn:false,
            leftBtnTitle:'返回',
            leftBtnJS:'',
            headerTitle:'企业服务',
            isShowRightBtn:false,
            rightBtnTitle:'...',
            rightBtnJS:'',
        },
    }
)

const MyTab = TabNavigator({
        // MovieStack: {
        //     screen: MovieStack,
        //     navigationOptions: {
        //         header:null
        //     }
        // },
        // HomeStack: {
        //     screen: HomeStack,
        //     navigationOptions: {
        //         header:null
        //     }
        // },
        //

        // NewsStack: {
        //   screen: NewsStack,
        //   navigationOptions: {
        //     header: null
        //   }
        // },

        CompanyAbout:{
            screen: CompanyAboutStack,
            navigationOptions: {
                header: null
            }
        },
        VideCenterStack:{
            screen: VideoCenterStack,
            navigationOptions: {
                header: null
            }
        },
        ProductCenterStack:{
            screen: ProductCenterStack,
            navigationOptions: {
                header: null
            }
        },

        TabCompanyServiceStack:{
            screen: TabCompanyServiceStack,
            navigationOptions: {
                header: null
            }
        },

        MineStack: {
            screen: MineStack,
            navigationOptions: {
                header: null
            }
        },
},
 {
   tabBarPosition: 'bottom',
   swipeEnabled:false,
   animationEnabled:false,
   backBehavior:'none',
   labelStyle:{
     fontSize:12,
   },
   iconStyle:{
     height:22,
     width:22,
     margin:0
   },
   lazy:true,
   tabBarOptions: {
     labelStyle:
         SYSTEM.iOS ?
         {
             fontSize:12,
         }:
             {
         marginTop:-2,
         fontSize:12,
         },
        iconStyle:
        SYSTEM.iOS?
            {
            height:22,
             width:22,
             backgroundColor:'white',
             margin:0
             }:
            {
                height:49,
                width:SCREEN_WIDTH/4,
                backgroundColor:'white',
                margin:-7
            }
     ,
        style: {
         height:49,
         backgroundColor:'white'
     },
        activeBackgroundColor:'white',
        inactiveBackgroundColor:'white',
        activeTintColor:null,
        inactiveTintColor:null,
        showIcon:true,
        showLabel:false,
        opacity:0,
        indicatorStyle :{
            height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
        }
   }

 });

export const AppNavigator = StackNavigator({

  adv:{
        screen: Adv
    },



        WebViewDetail:{
             screen:WebViewDetail
   },

  MyTab :{
            screen: MyTab
        },

        Login: {
            screen: Login
        },

        Register : {
            screen: Register,
        },

        VerifyCodeLogin:{
            screen:VerifyCodeLogin
        },

        ForgetPwd:{
            screen:ForgetPwd
        },



        TabMessage :{
            screen: TabMessage
        },

  PushSet :{
            screen: PushSet
         }

    },

    {
      headerMode:'screen',
      navigationOptions: {
      gesturesEnabled:false,
      headerTintColor:'black'

    },

})

export const AppNavigator2 = StackNavigator({

    MyTab :{
        screen: MyTab
    },

    Register : {
        screen: Register,
    },

    VerifyCodeLogin:{
        screen:VerifyCodeLogin
    },

    ForgetPwd:{
        screen:ForgetPwd
    },

},{
    headerMode:'screen',
    navigationOptions: {
        gesturesEnabled:false,
        headerTintColor:'black'

    }

})




//退出登陆 ，重制路由
export function navToLogin (navigation, {isReset = true} = {}) {
  navigation.navigate('MyTab', {isReset})
}
