import * as React from 'react';

import {View, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import OSUButton from '../components/Button.js';
import OSUPrompt from '../components/Prompt.js';

/*------------------------------
 *
 *must add in key from GDrive
 *
 *------------------------------
*/
const GOOGLE_API_KEY = 'AIzaSyD-SLZuE9347jsoS7P8LKKffy0xFg1YEXw';

class DirectionScreen extends React.Component {
	
	state = { ModeButton: "Walking", Mode: "WALKING", UserLocation: JSON.parse(global.Location).coords};
	constructor(props){
		super(props);

		//changes the header
		this.props.navigation.setOptions({title: global.DirectionName});

		this.changeDirectionState = this.changeDirectionState.bind(this);
	}


	//Used to change the mode of direction if the user has a bike
	//-Venables
	changeDirectionState(){
		if(this.state.Mode == "WALKING"){
			this.setState({
				Mode: "BICYCLING",
				ModeButton: "Cycling"
			});
		}else{
			this.setState({
				Mode: "WALKING",
				ModeButton: "Walking"
			});
		}
	}

	render(){
		var { restaurantLocation } = this.props.route.params;

		var mode = this.state.Mode;
		var modeButton = this.state.ModeButton;

		return(
			<View>
				<MapView
					initialRegion={{latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude, latitudeDelta: Math.abs(restaurantLocation.latitude - this.state.UserLocation.latitude), longitudeDelta: Math.abs(restaurantLocation.longitude - this.state.UserLocation.longitude)}}
					style = {{height: 400, marginTop: 80}}
					showsUserLocation = {true}
					followUserLocation = {true}
					zoomEnabled = {true}
				>
					<MapView.Marker coordinate={{latitude: restaurantLocation.latitude, longitude: restaurantLocation.longitude}} />
					<MapViewDirections
						origin={{latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude}}
						destination={{latitude: restaurantLocation.latitude, longitude: restaurantLocation.longitude}}
						mode={mode}
						apikey={GOOGLE_API_KEY}//MUST ENTER IN ORDER TO USE
						strokeWidth={3}
						strokeColor={"red"}
					/>
				</MapView>
				<View
					style={{
						position: 'absolute',//use absolute position to show button on top of the map
						top: '90%', //for center align
						alignSelf: 'flex-end' //for align to right
					}}
				>
					<OSUButton 
						title={modeButton}
						onPress={e =>{e.preventDefault(), this.changeDirectionState()}}
					/>
				</View>
			
			</View>
			
		);
	}

}

export default DirectionScreen;