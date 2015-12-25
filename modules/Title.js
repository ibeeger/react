/*
* @Author: willclass
* @Date:   2015-12-25 10:52:49
* @Last Modified by:   willclass
* @Last Modified time: 2015-12-25 11:42:13
*/

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var Title = React.createClass({

	render:function(){
		return (
			<View style={styles.Vtitle}>
			<TouchableHighlight style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
			<View style={styles.Back}>
			<Text style={styles.BackText}>返回</Text>
			</View>
			</TouchableHighlight>

			<View style={styles.Center}>
			<Text style={styles.TitText}  numberOfLines={1}>{this.props.title}</Text>
			</View>
			<TouchableHighlight style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
			<View style={styles.Info}>
			<Text style={styles.InfoText}>{this.props.info}</Text>
			</View>
			</TouchableHighlight>
			</View>
			)
	}

});




var styles = StyleSheet.create({
	touch:{
		// underlayColor:"rgba(0,0,0,0.3)"
		marginTop:20,
    marginLeft:5,
    marginRight:5,
		width:50,
		height:50,
		borderRadius:25,
	},
	Vtitle:{
		flex:1,
		height:70,
		backgroundColor:"#eb5343",
		flexDirection:"row",
    overflow:"hidden",
	},
	Center:{
		height:70,
		flex:4,
    justifyContent: 'center',
    marginLeft:30,
    marginRight:30,
    marginTop:10,
	},
	TitText:{
		fontSize:20,
		color:"#fff",
		textAlign:"center",
	},
	BackText:{
		fontSize:16,
		color:"#eee",
		textAlign:"center",
	},
	InfoText:{
		fontSize:16,
		color:"#eee",
		textAlign:"center",
	},
	Back:{
    justifyContent: 'center',
		width:50,
		height:50,
	},
	Info:{
    justifyContent: 'center',
		width:50,
		height:50,

	}

})

module.exports = Title;
