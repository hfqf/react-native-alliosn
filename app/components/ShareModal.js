import React, { Component } from 'react'
import { Text, View, StyleSheet ,TouchableWithoutFeedback,Image} from 'react-native'

import Modal from 'react-native-modalbox';


import {SCREEN_WIDTH,SCREEN_HEIGHT,SYSTEM,COLOR} from '../util/config';

const shareIconWechat = require('../resource/share/share_wx.png');
const shareIconWechatMoments = require('../resource/share/share_wx_circle.png');
const shareIconQQ = require('../resource/share/share_qq.png');
const shareIconWeibo = require('../resource/share/share_wb.png');
const shareIconQZone = require('../resource/share/shareIcon_qzone.png');


export default class ShareModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      shareContent:null
  }
}


 componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible, shareContent: nextProps.shareContent })
  }


  render() {

    // title:分享栏的标题
    const {title,wxAction, wxMomentAction, qqAction, wbAction,qZone,cancelAction} = this.props;
    return (
      <Modal
        swipeToClose={true}
        backButtonClose={false}
        coverScreen={true}
        isOpen={this.state.modalVisible}
        swipeThreshold={0}
        backdropPressToClose={true}
        position='bottom'
        onClosed={()=>{
            this.setState({modalVisible:false})
            cancelAction();
        }}
        style={{ backgroundColor:"transparent",height: 360 ,
                        position:"absolute",left:0,
                        width:SCREEN_WIDTH}}
        >
         {/*<TouchableWithoutFeedback onPress={() => this.setState({modalVisible:false})}>*/}
          <View key={'spinner'} style={styles.spinner}>
            <View style={styles.mainView}>

                <Text  style={styles.titleStyle}>
                    将艾里逊分享给好友
                </Text>

              <View style={styles.btns}>
                  <ShareBtn title='微信好友' icon={shareIconWechat} action={wxAction}/>
                  <ShareBtn title='朋友圈' icon={shareIconWechatMoments} action={wxMomentAction}/>
                  <ShareBtn title='QQ好友' icon={shareIconQQ} action={qqAction}/>

                  {/*<ShareBtn title='微博' icon={shareIconWeibo} action={wbAction}/>*/}
                {/*<ShareBtn title='QQ空间' icon={shareIconQZone} action={qZone}/>*/}
              </View>
                <View  style={{width:SCREEN_WIDTH,marginTop:20,height:1,backgroundColor:'#e5e5e5'}}/>
              {/*<TitleView title='取消' containerStyle={{color:'red'}} callback={() =>this.setState({modalVisible:false})}/>*/}

                 <TouchableWithoutFeedback onPress={() =>{

                     this.setState({modalVisible:false})
                     cancelAction();

                 } }>
                     <View style={styles.titleStyle2}>
                         <Text  style={styles.titleStyle1}>
                             取消
                         </Text>
                     </View>

                 </TouchableWithoutFeedback>
            </View>

          </View>
          {/*</TouchableWithoutFeedback>*/}
      </Modal>
    )
  }

}

 const TitleView = ({title,callback,containerStyle}) => {
  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View style={styles.titleView}>
        <Text style={containerStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const ShareBtn = ({action,title,icon}) => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <View style={{justifyContent:'center',alignItems:'center',marginTop:0,marginLeft:30,height:100}}>
        <Image source={icon} style={{width:60,height:60}}/>
        <Text style={{marginTop:10,textAlign:'center',color:'#6D6D6D'}}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  mainView:{
      backgroundColor:'white',
      height:240,
      // marginTop:SCREEN_HEIGHT-240,
  },
  titleView:{
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH-20,
    height:40,
    borderRadius:8,
    margin:10,
    backgroundColor:'white'
  },
    titleStyle:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:16,
        width:SCREEN_WIDTH,
        paddingTop:30,
        height:60,
        color:'#000000',
        backgroundColor:'white'
    },
    titleStyle1:{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:16,
        height:18,
        width:SCREEN_WIDTH,
        color:'#000000',
        backgroundColor:'white',
    },
    titleStyle2:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:16,
        width:SCREEN_WIDTH,
        color:'#000000',
        backgroundColor:'white',
    },
  btns:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    height:100,
    backgroundColor:'white',
    // borderRadius:8,
    alignItems:'center',
    // justifyContent:'space-between'
  }
})
