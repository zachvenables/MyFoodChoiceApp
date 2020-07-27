import * as React from 'react';

import {decode, encode} from 'base-64';

import { ActivityIndicator, YellowBox, ScrollView, TextInput, Button, Text, View } from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import * as firebase from 'firebase';
import 'firebase/firestore';

YellowBox.ignoreWarnings(['Setting a timer']);

import Colors from '../constants/Colors';



class NearestFoodScreen extends React.Component {
	
	state = { showAlert: false, nextState: null, locationName: null, restaurantLocation: null, animate: false }

	constructor(props) {
		super (props);

		this.locationIndex = 0;
		this.message = '';
		
		this.mealPlanCheck = this.mealPlanCheck.bind(this);
		this.loadNextLocation = this.loadNextLocation.bind(this);
		this.getMealPlanData = this.getMealPlanData.bind(this);
	}

	getMealPlanData(mealPlan){
		return "Type: " + mealPlan.type + "\n" 
				+ 'Weekly Traditional Visits: ' + mealPlan.WeeklyTraditionalVisits + '\n'
				+ 'Traditional Visit Exchange: ' + mealPlan.TraditionalVisitExchange + '\n'
				+ 'Dining Dollars: ' + mealPlan.DiningDollars + '\n'
				+ 'BuckID Cash: ' + mealPlan.BuckIDCash
	}

	//-Venables
	mealPlanCheck(user) {
		this.setState({showAlert: true});
	}

	async loadNextLocation(user){
		//Used to correct missing variable bug.  This is a bug with react native, we are using the recommended workaround
		//-Venables
		if (!global.btoa) {  global.btoa = encode; }

		if (!global.atob) { global.atob = decode; }

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
		
		var database = firebase.firestore();

		this.locationIndex = this.locationIndex + 1;

		//if it's after the last index, start over from 0
		if(this.locationIndex == global.locationStack.length){
			this.locationIndex = 0;
		}

		var location = "";
		var restaurantLocation = global.locationStack[this.locationIndex];
		var nextState = [];
			
	

		//Queries the firestore for the first location name ***UPDATE WHEN WE ADD GEOLOCATION***
		//-Venables
		const snapshota = await database.collection('location').doc(restaurantLocation.name).get();
		location = snapshota.data().name;
  		//queries the data about the first restaurant ***UPDATE WHEN WE ADD GEOLOCATION***
  		//-Venables
		var snapshot = await database.collection('location').doc(restaurantLocation.name).collection('foods');
  		//remove restrictions
		if(user.restrictions.Eggs){
			snapshot = snapshot.where("restriction_egg_free","==",user.restrictions.Eggs);
		}
		if(user.restrictions.Gluten){
			snapshot = snapshot.where("restriction_gluten_free","==",user.restrictions.Gluten);
		}
		if(user.restrictions.Fish){
			snapshot = snapshot.where("restriction_fish_free","==",user.restrictions.Fish);
		}
		if(user.restrictions.Peanut){
			snapshot = snapshot.where("restriction_peanut_free","==",user.restrictions.Peanut);
		}
		if(user.restrictions.Soy){
			snapshot = snapshot.where("restriction_soy_free","==",user.restrictions.Soy);
		}
		if(user.restrictions.TreeNuts){
			snapshot = snapshot.where("restriction_treenut_free","==",user.restrictions.TreeNuts);
		}
		if(user.restrictions.Vegan){
			snapshot = snapshot.where("restriction_vegan","==",user.restrictions.Vegan);
		}
		if(user.restrictions.Vegatarian){
			snapshot = snapshot.where("restriction_vegatarian","==",user.restrictions.Vegatarian);
		}
		if(user.restrictions.ShellFish){
			snapshot = snapshot.where("restriction_shellfish_free","==",user.restrictions.ShellFish);
		}
		snapshot.get().then(snapshot => {snapshot.forEach(doc => {nextState.push({'name': doc.data().name, 'calories': doc.data().total_calories})})});

		this.state.nextState = nextState;
		this.state.location = location;
		//waits for the query to finish before navigating
		//-Venables
		await setTimeout(() => {this.setState({animate: false}), this.forceUpdate() }, 1000);
	}

	render() {
		var { user, location, nextState, restaurantLocation } = this.props.route.params;
		const animate = this.state.animate;
		const showAlert = this.state.showAlert;

		this.message = this.getMealPlanData(user.mealPlan);

		if(this.state.nextState == null){
			this.state.nextState = nextState;
		}

		if(this.state.location == null){
			this.state.location = location;
		}

		restaurantLocation = global.locationStack[this.locationIndex];

		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>

			<OSUPrompt prompt = {this.state.location} />
			<View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderTopWidth: 2/*, backgroundColor: Colors.tOSUwhite*/}}>
				<ScrollView style={{width: '90%'}}>
					{
						this.state.nextState.map((item, key) =>(
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
				onPress={e => {e.preventDefault(), this.setState({animate: true}), this.loadNextLocation(user)}}
			/>

			<View style={{paddingTop:10}}/>

			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.props.navigation.navigate('DirectionScreen', { restaurantLocation })}}
			/>
			<ActivityIndicator
				animating = {animate}
				size = "large"
			/>
			<AwesomeAlert
				show={showAlert}
				showProgress={false}
				title="Meal Plan Stats"
				message = {this.message}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText="Got it!"
				confirmButtonColor="#DD6B55"
				onCancelPressed={() => {
					this.setState({showAlert: false});
				}}
				onConfirmPressed={() => {
					this.setState({showAlert: false});
				}}
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