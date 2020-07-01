import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ScrollView, TextInput, Button, Text, View } from 'react-native';

//import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class NearestFoodScreen extends React.Component {

	constructor(props) {
		super (props);
<<<<<<< Updated upstream
=======
		
		//Initialize Firebase..
		/*
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
		*/
		
		this.locationName = "eatery";

		//this.getLocationName();


>>>>>>> Stashed changes
		this.state = {
			foods: [
				{'name': 'FoodA', 'calories': 100, 'id': 1},
				{'name': 'FoodB', 'calories': 200, 'id': 2},
				{'name': 'FoodC', 'calories': 300, 'id': 3},
				{'name': 'FoodD', 'calories': 400, 'id': 4},
				{'name': 'FoodE', 'calories': 100, 'id': 5},
				{'name': 'FoodF', 'calories': 320, 'id': 6},
				{'name': 'FoodG', 'calories': 500, 'id': 7},
				{'name': 'FoodH', 'calories': 100, 'id': 8},
				{'name': 'FoodI', 'calories': 300, 'id': 9}
			]
		};
		
		this.mealPlanCheck = this.mealPlanCheck.bind(this);
		this.loadNextLocation = this.loadNextLocation.bind(this);
		this.getDirections = this.getDirections.bind(this);
<<<<<<< Updated upstream
=======
		this.getData = this.getData.bind(this);
		//this.getLocationName = this.getLocationName.bind(this);
	}

	getData(data){
		alert(snapshot.val());
>>>>>>> Stashed changes
	}

	
	//-Venables
	mealPlanCheck(user) {
		alert('Show Meal plan status');
	}

	loadNextLocation(user){
		alert('load next closest eatery');
	}

	getDirections(user){
		alert('go to directions screen');
	}
	/*
	async getLocationName() {
		await this.database.collection('location').doc('restaraunt_a1').get().then(function (doc) {
			if(doc.exists){
				alert(doc.data().name);
				
			}else{
				alert('error');
			}
		
		});
	}
	*/
	render() {
		var { user, location, nextState } = this.props.route.params;

<<<<<<< Updated upstream
		//user location data to find closest eatery

=======
>>>>>>> Stashed changes
		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<View style={{height: 130, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Nearest Food</Text>
			</View>
			<View style={{height: 90, backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center'}}>
				<Button 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
<<<<<<< Updated upstream
					color='#990000'
				/>
			</View>
			<View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Location X (Closest)</Text>
			</View>
=======
			/>
			<OSUPrompt prompt = { location } />
>>>>>>> Stashed changes
			<View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey'}}>
				<ScrollView style={{width: '90%'}}>
					{
						nextState.map((item, index) =>(
							<View key={item.id} style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
								<Text>{item.name} - Calories: {item.calories}</Text>
							</View>
						
						))
					}
				</ScrollView>
			</View>
			<View  style={{height: 90, justifyContent: 'center', alignItems: 'center'}}>
				<Button 
					title="Next Location"
					onPress={e => {e.preventDefault(), this.loadNextLocation(user)}}
					color="#990000"
				/>
			</View>
			<View  style={{height: 110, justifyContent: 'center', alignItems: 'center'}}>
				<Button 
					title="Get Directions"
					onPress={e => {e.preventDefault(), this.getDirections(user)}}
					color="#990000"
				/>
			</View>
			
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