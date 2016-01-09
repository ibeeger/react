// 比如在index.android.js中使用
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ToastAndroid,
  DeviceEventEmitter,
  Text,
  View,
} = React;

var WeChatAndroid = require('react-native-wechat-android');

var appId = 'wxc95bc6456b2c7143';   // 你的AppId 

var shareWebPageOptions = {
  link: 'https://github.com/beefe/react-native-wechat-android', //分享的网页的链接
  tagName: 'test tagName',
  thumbSize: 150,       //分享网页的缩略图大小
  title: 'this is share title',
  desc: 'this is my share desc',
  thumbImage: 'http://img1.imgtn.bdimg.com/it/u=3924416677,403957246&fm=21&gp=0.jpg',  //分享的网页缩略图的url
};

var shareLocalImageOptions = {
  imageSourceType: 0,
  thumbSize: 150,               //分享本地图片的缩略图大小
  localPath: '/mnt/sdcard/temp.png',   //分享的本地图片的完整路径
};

var shareRemoteImageOptions = {
  imageSourceType: 1,
  thumbSize: 150,               //分享网络图片的缩略图大小
  scene: 0,
  remoteUrl: 'https://avatars3.githubusercontent.com/u/3015681?v=3&s=460',     //分享的网络图片的url
};

var MyProject = React.createClass({
  _registerApp(){
    WeChatAndroid.registerApp(appId,(registerOK) => {
      ToastAndroid.show(registerOK + '',ToastAndroid.SHORT);
    });
  },
  _isWXAppInstalled(){
    WeChatAndroid.isWXAppInstalled(
      (isInstalled) => {
        if(isInstalled){
          ToastAndroid.show('已安装',ToastAndroid.SHORT);
        }else{
          ToastAndroid.show('未安装',ToastAndroid.SHORT);
        }
      },
      (err) => {
        ToastAndroid.show(err,ToastAndroid.SHORT);
      },
    );
  },
  _isWXAppSupportAPI(){
    WeChatAndroid.isWXAppSupportAPI(
      (isSupport) => {
        ToastAndroid.show(isSupport + '',ToastAndroid.SHORT);
      },
      (err) => {
        ToastAndroid.show(err,ToastAndroid.SHORT);
      }
    );
  },
  _sendAuthRequest(){
    WeChatAndroid.sendAuthReq(null,(err) => {
       ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendWebPageToSession(){
    shareWebPageOptions.scene = 0;
    WeChatAndroid.sendLinkURL(shareWebPageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendWebPageToTimeline(){
    shareWebPageOptions.scene = 1;
    WeChatAndroid.sendLinkURL(shareWebPageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendWebPageToFavorite(){
    shareWebPageOptions.scene = 2;
    WeChatAndroid.sendLinkURL(shareWebPageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendLocalImageToSession(){
    shareLocalImageOptions.scene = 0;
    WeChatAndroid.sendImage(shareLocalImageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendLocalImageToTimeline(){
    shareLocalImageOptions.scene = 1;
    WeChatAndroid.sendImage(shareLocalImageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendLocalImageToFavorite(){
    shareLocalImageOptions.scene = 2;
    WeChatAndroid.sendImage(shareLocalImageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  _sendRemoteImageToSession(){
    WeChatAndroid.sendImage(shareRemoteImageOptions,(err) => {
      ToastAndroid.show(err,ToastAndroid.SHORT);
    });
  },
  componentWillMount: function(){
    DeviceEventEmitter.addListener('finishedAuth',function(event){  // 对应WXEntryActivity.java @A
      var success = event.response.success;         // 对应WXEntryActivity.java @A1
      if(success){
         ToastAndroid.show(
            ' code = ' + JSON.stringify(event.response.code) +     // 对应WXEntryActivity.java @A2
            ' state = ' + JSON.stringify(event.response.state),    // 对应WXEntryActivity.java @A3
            ToastAndroid.LONG
          );
      }else{
        ToastAndroid.show('授权失败',ToastAndroid.SHORT);
      }
    });
    DeviceEventEmitter.addListener('finishedShare',function(event){   // 对应WXEntryActivity.java @S
      var success = event.response.success;                           // 对应WXEntryActivity.java @S1
      if(success){
        ToastAndroid.show('分享成功',ToastAndroid.SHORT);
      }else{
        ToastAndroid.show('分享失败',ToastAndroid.SHORT);
      }
    });
//    DeviceEventEmitter.addListener('finishedPay',function(event){    // 对应WXPayEntryActivity.java @P
//      var success = event.response.success;                          // 对应WXPayEntryActivity.java @P1
//      if(success){
//        // 在此发起网络请求由服务器验证是否真正支付成功，然后做出相应的处理
//      }else{
//        ToastAndroid.show('支付失败',ToastAndroid.SHORT);
//      }
//    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this._registerApp} >
          注册到微信
        </Text>
        <Text style={styles.text} onPress={this._isWXAppInstalled} >
          是否安装微信
        </Text>
        <Text style={styles.text} onPress={this._isWXAppSupportAPI} >
          是否微信支持的API
        </Text>
        <Text style={styles.text} onPress={this._sendAuthRequest} >
          微信登录
        </Text>
        <Text style={styles.text} onPress={this._sendWebPageToSession} >
          分享网页给朋友
        </Text>
        <Text style={styles.text} onPress={this._sendWebPageToTimeline} >
          分享网页到朋友圈
        </Text>
        <Text style={styles.text} onPress={this._sendWebPageToFavorite} >
          分享网页到收藏
        </Text>
        <Text style={styles.text} onPress={this._sendLocalImageToSession} >
          分享本地图片给朋友
        </Text>
        <Text style={styles.text} onPress={this._sendLocalImageToTimeline} >
          分享本地图片到朋友圈
        </Text>
        <Text style={styles.text} onPress={this._sendLocalImageToFavorite} >
          分享本地图片到收藏
        </Text>
        <Text style={styles.text} onPress={this._sendRemoteImageToSession} >
          分享网络图片给朋友
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
});

AppRegistry.registerComponent('reactNative', () => MyProject);