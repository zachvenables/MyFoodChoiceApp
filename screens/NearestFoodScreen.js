//import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { YellowBox, ScrollView, TextInput, Button, Text, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//import {decode, encode} from 'base-64';

import * as firebase from 'firebase';
import 'firebase/firestore';

YellowBox.ignoreWarnings(['Setting a timer']);


class NearestFoodScreen extends React.Component {
	
	constructor(props) {
		super (props);
		
		this.locationName = "Eatery";

		this.state = {};
		
		this.mealPlanCheck = this.mealPlanCheck.bind(this);
		this.loadNextLocation = this.loadNextLocation.bind(this);
		this.getDirections = this.getDirections.bind(this);
		this.getData = this.getData.bind(this);
	}

	getData(data){
		alert(snapshot.val());
	}


	
	//-Venables
	mealPlanCheck(user) {
		alert('Show Meal plan status');
	}

	loadNextLocation(user){
		alert('load next clost eatery');
	}

	getDirections(user){
		alert('go to directions screen');
	}

	render() {
		var { user, location, nextState } = this.props.route.params;
		
		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>
			<OSUPrompt prompt = {location} />
			<View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey'}}>
				<ScrollView style={{width: '90%'}}>
					{
						nextState.map((item, key) =>(
							<View key={key} style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
								<Text>{item.name} Calories: {item.calories}</Text>
							</View>
						))
					}
				</ScrollView>
			</View>
			<OSUButton 
				title="Next Location"
				onPress={e => {e.preventDefault(), this.loadNextLocation(user)}}
			/>
			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.getDirections(user)}}
			/>
			
			
		</View>
		);


	}
}

export default NearestFoodScreen;