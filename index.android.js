/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;


var Title = require("./modules/Title.js");
var Footer = require("./modules/FooterAndroid.js");
var Main = require("./modules/List.js");


var url = "http://api.ibeeger.com/driving/info/0?type=";


var reactNative = React.createClass({
  getInitialState : function(){
     return {txt:"loading",
             title:"首页",
             isload:false,dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })}
  },
  componentDidMount:function(){
        this.getData("jinggao");
    },
  getData:function(item){
    fetch(url+item)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.arr),
          isload: true,
          title:responseData.name
        });
      })
      .done();
  },

  renderList:function(){
    if (this.state.isload) {
      return (
           <Main dataSource={this.state.dataSource}></Main>
        ) 
    }else{
      return (<Text>loading</Text>)
    };
  },

  render: function() {
    return (
      <View style={styles.views}>
      <Title style={styles.title} title={this.state.title} info="" />
      <View style={styles.main}>
        {this.renderList()}
      </View>

      <Footer style = {styles.footer} 
              onPressOne = {() => this.getData("jinggao")}
              onPressTwo = {() => this.getData("jinling")}
              onPressThree = {() => this.getData("zhilu")}
              onPressFour = {() => this.getData("zhishi")}
      ></Footer>
          
      </View>
    );
  }
});



var styles = StyleSheet.create({
  views:{
    flex:1,
  },
  title: {
    height:50,
    flex:1
  },
  main:{
    flex:6
  },
  footer:{
     justifyContent:'flex-end'
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);
