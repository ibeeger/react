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


var Item = React.createClass({
    render:function(){
      return (
        <View style={styles.item}>
            <Image
                source={{uri: this.props.logo}}
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
        this.fetchData();
    },
    fetchData:function(){
      fetch(Query_url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.result.data),
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
            <Item logo={item.logo} team_cn={item.team_cn} rank={item.team_order} />
        )
    },

    render:function(){
      if(!this.state.loaded){
        return  this.renderLoading();
      }else{
        return (
            <ListView
            renderFooter = {() => console.log(1)}
            dataSource={this.state.dataSource}
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
      borderTopColor:"#f0f0f0",
      flexDirection:"row",
    },
    listView:{

    }
});


module.exports = Main;
