import * as React from 'react';

import {View, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//must add in key from GDrive
const GOOGLE_API_KEY = '';

class DirectionScreen extends React.Component {
	
	state = {};
	constructor(props){
		super(props);

	}
	//40.000796, -83.034572
	//40.003146, -83.035581
	//39.997747, -83.033540

	render(){
	
		return(
			<MapView
				initialRegion={{latitude: 40.000796, longitude: -83.034572, latitudeDelta: 0.02, longitudeDelta: 0.02}}
				style = {{height: 400, marginTop: 80}}
				showsUserLocation = {true}
				followUserLocation = {true}
				zoomEnabled = {true}
			>
				<MapView.Marker coordinate={{latitude: 40.003146, longitude: -83.035581}} />
				<MapView.Marker coordinate={{latitude: 39.997747, longitude: -83.033540}} />
				<MapViewDirections
					origin={{latitude: 40.003146, longitude: -83.035581}}
					destination={{latitude: 39.997747, longitude: -83.033540}}
					apikey={GOOGLE_API_KEY}
					strokeWidth={3}
					strokeColor={"hotpink"}
				/>
			</MapView>
		);
	}

}

export default DirectionScreen;