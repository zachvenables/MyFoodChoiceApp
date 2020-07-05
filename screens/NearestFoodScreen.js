//import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ScrollView, TextInput, Button, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import firebaseKeys from './../firebase';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import Colors from '../constants/Colors';


class NearestFoodScreen extends React.Component {
	
	constructor(props) {
		super (props);
		
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

		this.state = {
			foods: [
				{'name': 'BBQ Barbacoa Beef Nacho', 'calories': 170, 'id': 1},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 2},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 3},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 4},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 5},
				{'name': 'BBQ Barbacoa Beef Burrito', 'calories': 170, 'id': 6},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 7},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 8},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 9},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 10},
				{'name': 'BBQ Barbacoa Beef Nacho', 'calories': 170, 'id': 11},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 12},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 13},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 14},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 15},
				{'name': 'BBQ Barbacoa Beef Burrito', 'calories': 170, 'id': 16},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 17},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 18},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 19},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 20},
				{'name': 'BBQ Barbacoa Beef Nacho', 'calories': 170, 'id': 21},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 22},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 23},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 24},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 25},
				{'name': 'BBQ Barbacoa Beef Burrito', 'calories': 170, 'id': 26},
				{'name': 'Veggie Refried Pinto Beans Nacho', 'calories': 210, 'id': 27},
				{'name': 'Black Beans & Roasted Corn Nacho', 'calories': 70, 'id': 28},
				{'name': 'Chicken Sub Nacho', 'calories': 130, 'id': 29},
				{'name': 'Chicken Grilled Nacho', 'calories': 170, 'id': 30}
			]
		};
		
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
		var { user } = this.props.route.params;

		//alert(this.database.collection('location'));
		
		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>
			<OSUPrompt prompt = {this.locationName} />
			<View style={{width: '100%', height: 350, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderTopWidth: 2/*, backgroundColor: Colors.tOSUwhite*/}}>
				<ScrollView style={{width: '90%'}}>
					{
						this.state.foods.map((item, index) =>(
							<View key={item.id} style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
								<Text style = {{color: Colors.tOSUscarlet, fontSize: 20}}>{item.name}     Calories: {item.calories}</Text>
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