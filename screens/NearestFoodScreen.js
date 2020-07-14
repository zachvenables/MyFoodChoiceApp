//import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';

import { YellowBox, ScrollView, TextInput, Button, Text, View } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
//import firebaseKeys from './../firebase';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//import {decode, encode} from 'base-64';

YellowBox.ignoreWarnings(['Setting a timer']);

import Colors from '../constants/Colors';



class NearestFoodScreen extends React.Component {
	
	constructor(props) {
		super (props);
		
		this.locationName = "Eatery";

		this.state = {};

		//Initialize Firebase..
		if(!firebase.apps.length){
			firebase.initializeApp({
					apiKey: "AIzaSyBCjwYHTf9Yj1kAN7mByIhnA3rD0OZlzJY",
					authDomain: "osumyfoodchoiceapp-a8fd6.firebaseapp.com",
					databaseURL: "https://osumyfoodchoiceapp-a8fd6.firebaseio.com",
					projectId: "osumyfoodchoiceapp-a8fd6",
					storageBucket: "osumyfoodchoiceapp-a8fd6.appspot.com",
					messagingSenderId: "752614312654",
					appId: "1:752614312654:web:e3234a1c1c83e85a0dde9f",
					measurementId: "G-XKCPW0Q23G"
			});
		}
		
		this.database = firebase.firestore();
		
		
		this.locationName = "Oxley's by the Numbers";

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
		alert(
			'Remember to rate our app ★★★★★ on the app store!'
		)
		//alert('Show Meal plan status');
	}

	loadNextLocation(user){
		alert(
			'Remember to rate our app ★★★★★ on the app store!'
		)
		//alert('load next clost eatery');
	}

	getDirections(user){
		alert(
			'Remember to rate our app ★★★★★ on the app store!'
		)
		//alert('go to directions screen');
	}

	render() {
		var { user, location, nextState } = this.props.route.params;

		//alert(this.database.collection('location'));

		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>

			<OSUPrompt prompt = {location} />
			<View style={{width: '100%', height: 350, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderTopWidth: 2/*, backgroundColor: Colors.tOSUwhite*/}}>
				<ScrollView style={{width: '90%'}}>
					{
						nextState.map((item, key) =>(
							<View key={key} style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
								<Text style = {{color: Colors.tOSUscarlet, fontSize: 12}}>{item.name}     Calories: {item.calories}</Text>
							</View>
						))
					}
				</ScrollView>
			</View>

			<View style={{paddingTop:100}}/> 

			<OSUButton 
				title="Next Location"
				onPress={e => {e.preventDefault(), this.loadNextLocation(user)}}
			/>

			<View style={{paddingTop:10}}/>

			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.getDirections(user)}}
			/>
			
		</View>
		);


		const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#fff",
			},  
		});

	}
}

export default NearestFoodScreen;