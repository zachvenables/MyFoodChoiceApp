import * as React from 'react';

import {View, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//must add in key from GDrive
const GOOGLE_API_KEY = 'AIzaSyD-SLZuE9347jsoS7P8LKKffy0xFg1YEXw';

class DirectionScreen extends React.Component {
	
	state = { UserLocation: JSON.parse(global.Location).coords};
	constructor(props){
		super(props);

	}
	//40.000796, -83.034572
	//40.003146, -83.035581
	//39.997747, -83.033540

	render(){
		var { restaurantLocation } = this.props.route.params;

		return(
			<MapView
				initialRegion={{latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude, latitudeDelta: 0.0009, longitudeDelta: 0.0009}}
				style = {{height: 400, marginTop: 80}}
				showsUserLocation = {true}
				followUserLocation = {true}
				zoomEnabled = {true}
			>
				<MapView.Marker coordinate={{latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude}} />
				<MapView.Marker coordinate={{latitude: restaurantLocation.latitude, longitude: restaurantLocation.longitude}} />
				<MapViewDirections
					origin={{latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude}}
					destination={{latitude: restaurantLocation.latitude, longitude: restaurantLocation.longitude}}
					mode={"WALKING"}
					apikey={GOOGLE_API_KEY}
					strokeWidth={3}
					strokeColor={"red"}
				/>
			</MapView>
		);
	}

}

export default DirectionScreen;