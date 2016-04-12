var React = require("react-native");


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} = React;


var Query_url = 'http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=football&_sport_s_=opta&_sport_a_=teamOrder&type=213&season=2015&format=json';
var url = "http://api.ibeeger.com/driving/info/0?type=";

var Item = React.createClass({
    render:function(){
      return (
        <View style={styles.item}>
            <Image
                source={{uri: "http://oss.files.ibeeger.com"+this.props.logo}}
                style={styles.logo}
            />
            <View style={styles.rightContainer}>
                <Text style={styles.name}>{this.props.team_cn}</Text>
                <Text style={styles.rank}>{this.props.team_order}</Text>
            </View>
        </View>
    );
    }
});

var Main = React.createClass({
    getInitialState:function(){
        return {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }),
            list:null,
            loaded:false,
        }
    },
    componentDidMount:function(){
        // this.fetchData();
    },
    fetchData:function(){
      fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.arr),
          loaded: true,
        });
      })
      .done();
    },
    renderLoading:function(){
        return (
          <View style={styles.main}>
             <Text>loading...</Text>
          </View>
        )
    },
    renderScoreboard:function(item){
        return (
            <Item logo={item.picurl} team_cn={item.name} rank={item.name} />
        )
    },

    render:function(){
      if(!this.props.dataSource){
        return  this.renderLoading();
      }else{
        return (
            <ListView
            dataSource={this.props.dataSource}
            renderRow={this.renderScoreboard}
            style={styles.main}
            >
            </ListView>
          )
      }
    }
})



var styles = StyleSheet.create({
    main:{
        flex:1,
    },
    list:{
    },
    logo:{
      width:50,
      height:50,
      borderRadius:25,
      marginTop:5,
      marginLeft:5,
      marginRight:15,
    },
    rightContainer:{
      alignSelf:"center",
    },
    item:{
      height:60,
      borderTopWidth:1,
      borderStyle:"solid",
      borderTopColor:"#e6e6e6",
      flexDirection:"row",

    },
    listView:{

    }
});


module.exports = Main;
