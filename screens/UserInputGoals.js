/**
 *This screen's main functions are to navigate the user to the different input screens and then when the "next" button is selected,
 * sorts all locations by distance from the user's location.  It stores this value in a global variable titled "locationStack" that can be used in the nearestFoodScreen.
 *At this time it also pulls from the cloud storage all of the food items associated with the closest location and then passes that to the nearestFoodScreen as well, but as a parameter.
*/

import React from 'react';
import { decode, encode } from 'base-64';
import { ScrollView, ActivityIndicator, View, Modal, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../constants/Colors';
import OSUButton from '../components/Button.js';
import OSUPrompt from '../components/Prompt.js';
import OSUCheckbox from '../components/Checkbox.js'
import OSUTextBox from '../components/TextBox.js'
import * as firebase from 'firebase';
import 'firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';

const haversine = require('haversine');

class UserInputGoals extends React.Component {

	state = {
		showAlert: false, animate: false, UserLocation: JSON.parse(global.Location).coords,
		restrictionsVisible: false, goal: 'Maintain', mealPlan: 'none',
		ageText: 0, weightText: 0, heightText: 0,
		dairy: false, eggs: false, fish: false, gluten: false, peanuts: false, shellfish: false, soy: false, treenuts: false, wheat: false, vegetarian: false, vegan: false
	};

	constructor(props) {
		super(props);

		this.location;
		this.locationStack;
		this.message = '';

		this.handleMealPlanChange = this.handleMealPlanChange.bind(this);

		this.SaveUserData = this.SaveUserData.bind(this);
		this.getData = this.getData.bind(this);
		this.saveData = this.saveData.bind(this);
		this.getClosestLocation = this.getClosestLocation.bind(this);
		this.validCheck = this.validCheck.bind(this);
		this.initialRestrictions = this.initialRestrictions.bind(this);
		this.updateRestrictions = this.updateRestrictions.bind(this);
	}


	//input validation for text boxes
	//-Venables
	validCheck(user) {
		if (isNaN(user.age)) {
			alert('Error! Please enter a whole number for age.');
			this.setState({ animate: false });
			return;
		}
		else if (isNaN(user.height)) {
			alert('Error! Please enter a whole number for height.');
			this.setState({ animate: false });
			return;
		}
		else if (isNaN(user.weight)) {
			alert('Error! Please enter a whole number for weight.');
			this.setState({ animate: false });
			return;
		}
		else {
			this.SaveUserData(user);//save data and navigate to next screen
		}
	}


	//calculates distances to all of the dining locations to the user and then sorts them in order of shortest distance.
	//-Venables
	getClosestLocation() {
		var userLocation = { latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude };

		var locations = [{ name: 'restaraunt_a1', latitude: 39.996768, longitude: -83.013802, distance: haversine(userLocation, { latitude: 39.996768, longitude: -83.013802 }) },
		{ name: 'restaraunt_a3', latitude: 40.004874, longitude: -83.013215, distance: haversine(userLocation, { latitude: 40.004874, longitude: -83.013215 }) },
		{ name: 'restaraunt_a4', latitude: 40.004307, longitude: -83.010929, distance: haversine(userLocation, { latitude: 40.004307, longitude: -83.010929 }) },
		{ name: 'restaraunt_a7', latitude: 39.997536, longitude: -83.014577, distance: haversine(userLocation, { latitude: 39.997536, longitude: -83.014577 }) },
		{ name: 'restaraunt_a8', latitude: 39.999948, longitude: -83.021801, distance: haversine(userLocation, { latitude: 39.999948, longitude: -83.021801 }) },
		{ name: 'restaraunt_a10', latitude: 40.002565, longitude: -83.016633, distance: haversine(userLocation, { latitude: 40.002565, longitude: -83.016633 }) },
		{ name: 'restaraunt_a11', latitude: 40.002834, longitude: -83.016698, distance: haversine(userLocation, { latitude: 40.002834, longitude: -83.016698 }) },
		{ name: 'restaraunt_a12', latitude: 40.007038, longitude: -83.018217, distance: haversine(userLocation, { latitude: 40.007038, longitude: -83.018217 }) },
		{ name: 'restaraunt_a14', latitude: 40.000792, longitude: -83.015056, distance: haversine(userLocation, { latitude: 40.000792, longitude: -83.015056 }) }
		];

		locations = locations.sort(function (a, b) {
			return a.distance > b.distance;

		});

		this.location = locations[0];
		global.locationStack = locations;
	}

	//Modal Toggle
	restrictionsModalHandler = (visible) => {
		this.setState({ restrictionsVisible: visible });
	}

	//Used to swap between state and user without hooks
	initialRestrictions(user) {
		this.setState({
			dairy: user.restrictions.Dairy,
			eggs: user.restrictions.Eggs,
			fish: user.restrictions.Fish,
			gluten: user.restrictions.Gluten,
			peanuts: user.restrictions.Peanuts,
			shellfish: user.restrictions.ShellFish,
			soy: user.restrictions.Soy,
			treenuts: user.restrictions.TreeNuts,
			wheat: user.restrictions.Wheat,
			vegetarian: user.restrictions.Vegetarian,
			vegan: user.restrictions.Vegan
		})
	}

	//Used to swap between state and user without hooks
	updateRestrictions(user) {
		user.restrictions.Dairy = this.state.dairy;
		user.restrictions.Eggs = this.state.eggs;
		user.restrictions.Fish = this.state.fish;
		user.restrictions.Gluten = this.state.gluten;
		user.restrictions.Peanuts = this.state.peanuts;
		user.restrictions.ShellFish = this.state.shellfish;
		user.restrictions.Soy = this.state.soy;
		user.restrictions.TreeNuts = this.state.treenuts;
		user.restrictions.Wheat = this.state.wheat;
		user.restrictions.Vegetarian = this.state.vegetarian;
		user.restrictions.Vegan = this.state.vegan;
	}



	//saves the users data, accesses the firebase, navigates to the next screen
	//-Venables
	async SaveUserData(user) {
		//Used to correct missing variable bug.  This is a bug with react native, we are using the recommended workaround
		//-Venables
		if (!global.btoa) { global.btoa = encode; }

		if (!global.atob) { global.atob = decode; }

		//Initialize Firebase..
		if (!firebase.apps.length) {
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
		var location = "";
		var restaurantLocation = this.location;
		var nextState = [];

		//Queries the firestore for the first location name ***UPDATE WHEN WE ADD GEOLOCATION***
		//-Venables
		const snapshota = await database.collection('location').doc(restaurantLocation.name).get();
		location = snapshota.data().name;

		//queries the data about the first restaurant ***UPDATE WHEN WE ADD GEOLOCATION***
		//-Venables
		var snapshot = await database.collection('location').doc(restaurantLocation.name).collection('foods');

		//remove restrictions
		if (user.restrictions.Eggs) {
			snapshot = snapshot.where("restriction_egg_free", "==", user.restrictions.Eggs);
		}
		if (user.restrictions.Gluten) {
			snapshot = snapshot.where("restriction_gluten_free", "==", user.restrictions.Gluten);
		}
		if (user.restrictions.Fish) {
			snapshot = snapshot.where("restriction_fish_free", "==", user.restrictions.Fish);
		}
		if (user.restrictions.Peanuts) {
			snapshot = snapshot.where("restriction_peanut_free", "==", user.restrictions.Peanuts);
		}
		if (user.restrictions.Soy) {
			snapshot = snapshot.where("restriction_soy_free", "==", user.restrictions.Soy);
		}
		if (user.restrictions.TreeNuts) {
			snapshot = snapshot.where("restriction_treenut_free", "==", user.restrictions.TreeNuts);
		}
		if(user.restrictions.Wheat){
			snapshot = snapshot.where("restriction_wheat_free", "==", user.restrictions.Wheat);
		}
		if (user.restrictions.Vegan) {
			snapshot = snapshot.where("restriction_vegan", "==", user.restrictions.Vegan);
		}
		if (user.restrictions.Vegetarian) {
			snapshot = snapshot.where("restriction_vegetarian", "==", user.restrictions.Vegetarian);
		}
		if (user.restrictions.ShellFish) {
			snapshot = snapshot.where("restriction_shellfish_free", "==", user.restrictions.ShellFish);
		}
		snapshot.get().then(snapshot => { snapshot.forEach(doc => { nextState.push({ 'name': doc.data().name, 'calories': doc.data().total_calories }) }) });


		//waits for the query to finish before navigating
		//-Venables
		await setTimeout(() => { this.setState({ animate: false }), this.props.navigation.navigate('NearestFoodScreen', { user, location, nextState, restaurantLocation });; }, 1500);
	}


	//Primarily used to display the currently saved data by the user
	//-Venables
	async getData() {
		try {
			const jsonUser = await AsyncStorage.getItem('userInfo');
			user = JSON.parse(jsonUser);
			this.message =
				'mealPlan: ' + user.mealPlan.type + '\n'
				+ 'gluten: ' + user.restrictions.Gluten + '\n'
				+ 'shellfish: ' + user.restrictions.ShellFish + '\n'
				+ 'eggs: ' + user.restrictions.Eggs + '\n'
				+ 'fish: ' + user.restrictions.Fish + '\n'
				+ 'peanuts: ' + user.restrictions.Peanuts + '\n'
				+ 'soy: ' + user.restrictions.Soy + '\n'
				+ 'treenuts: ' + user.restrictions.TreeNuts + '\n'
				+ 'wheat: ' + user.restrictions.Wheat + '\n'
				+ 'dairy: ' + user.restrictions.Dairy + '\n'
				+ 'vegetarian: ' + user.restrictions.Vegetarian + '\n'
				+ 'vegan: ' + user.restrictions.Vegan + '\n'
				+ 'age: ' + user.age + '\n'
				+ 'weight: ' + user.weight + '\n'
				+ 'height: ' + user.height + '\n'
				+ 'goals: ' + user.goals + '\n'
				;
		} catch (e) {
			console.log(e);
		}
	}

	//this is loaded on every page render to save the changes made to the user attributes
	async saveData(user) {
		try {
			await AsyncStorage.setItem('userInfo', JSON.stringify(user));
			//alert('saved!');
		} catch (e) {
			console.log(e);
		}
	}


	//fills appropraite meal plan info for each class
	//-Venables
	handleMealPlanChange(newPlan, user) {
		user.mealPlan.type = newPlan;
		switch (newPlan) {
			case "Gray10":
				user.mealPlan.WeeklyTraditionalVisits = 10;
				user.mealPlan.TraditionalVisitExchange = true;
				user.mealPlan.DiningDollars = 200.0;
				user.mealPlan.BuckIDCash = 150.0;
				break;
			case "Scarlet14":
				user.mealPlan.WeeklyTraditionalVisits = 14;
				user.mealPlan.TraditionalVisitExchange = true;
				user.mealPlan.DiningDollars = 200.0;
				user.mealPlan.BuckIDCash = 150.0;
				break;
			case "Unlimited":
				user.mealPlan.WeeklyTraditionalVisits = 999;
				user.mealPlan.TraditionalVisitExchange = false;
				user.mealPlan.DiningDollars = 100.0;
				user.mealPlan.BuckIDCash = 0.0;
				break;
			case "DecliningBalance":
				user.mealPlan.WeeklyTraditionalVisits = 0;
				user.mealPlan.TraditionalVisitExchange = false;
				user.mealPlan.DiningDollars = 1399.0;
				user.mealPlan.BuckIDCash = 0.0;
				break;
			case "Carmen1":
				user.mealPlan.WeeklyTraditionalVisits = 0;
				user.mealPlan.TraditionalVisitExchange = false;
				user.mealPlan.DiningDollars = 284.0;
				user.mealPlan.BuckIDCash = 0.0;
				break;
			case "Carmen2":
				user.mealPlan.WeeklyTraditionalVisits = 0;
				user.mealPlan.TraditionalVisitExchange = false;
				user.mealPlan.DiningDollars = 0.0;
				user.mealPlan.BuckIDCash = 150.0;
				break;
			default:
				alert("Something didn't work right");
				break;

		}
	}


	render() {
		var { user } = this.props.route.params;
		const animate = this.state.animate;//for activit indicator
		const showAlert = this.state.showAlert; //for AwesomeAlert
		const { restrictionsVisible } = this.state;//for modal in restriction input

		//displays data that the user as entered
		this.message =
			'Meal Plan: ' + user.mealPlan.type + '\n'
			+ 'Gluten: ' + (user.restrictions.Gluten ? "Yes" : "No") + '\n'
			+ 'Shellfish: ' + (user.restrictions.ShellFish ? "Yes" : "No") + '\n'
			+ 'Eggs: ' + (user.restrictions.Eggs ? "Yes" : "No") + '\n'
			+ 'Fish: ' + (user.restrictions.Fish ? "Yes" : "No") + '\n'
			+ 'Peanuts: ' + (user.restrictions.Peanuts ? "Yes" : "No") + '\n'
			+ 'Soy: ' + (user.restrictions.Soy ? "Yes" : "No") + '\n'
			+ 'TreeNuts: ' + (user.restrictions.TreeNuts ? "Yes" : "No") + '\n'
			+ 'Dairy: ' + (user.restrictions.Dairy ? "Yes" : "No") + '\n'
			+ 'Vegetarian: ' + (user.restrictions.Vegetarian ? "Yes" : "No") + '\n'
			+ 'Vegan: ' + (user.restrictions.Vegan ? "Yes" : "No") + '\n'
			+ 'Age: ' + user.age + '\n'
			+ 'Weight: ' + user.weight + '\n'
			+ 'Height: ' + user.height + '\n'
			+ 'Goals: ' + user.goals + '\n'
			;

		this.getClosestLocation();
		this.saveData(user);

		return (
			<ScrollView>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Modal animationType='Slide' visible={restrictionsVisible} transparent={true}>

						<ScrollView style={{ borderRadius: 20, borderWidth: 2, borderColor: Colors.tOSUscarlet, backgroundColor: Colors.tOSUwhite, margin: 50 }}>
							<OSUPrompt prompt='Restrictions:' />
							<OSUCheckbox
								option='Dairy'
								isSelected={this.state.dairy}
								setSelection={value => { this.setState({ dairy: value }) }}
							/>
							<OSUCheckbox
								option='Eggs'
								isSelected={this.state.eggs}
								setSelection={value => { this.setState({ eggs: value }) }}
							/>
							<OSUCheckbox
								option='Fish'
								isSelected={this.state.fish}
								setSelection={value => { this.setState({ fish: value }) }}
							/>
							<OSUCheckbox
								option='Gluten'
								isSelected={this.state.gluten}
								setSelection={value => { this.setState({ gluten: value }) }}
							/>
							<OSUCheckbox
								option='Peanuts'
								isSelected={this.state.peanuts}
								setSelection={value => { this.setState({ peanuts: value }) }}
							/>
							<OSUCheckbox
								option='ShellFish'
								isSelected={this.state.shellfish}
								setSelection={value => { this.setState({ shellfish: value }) }}
							/>
							<OSUCheckbox
								option='Soy'
								isSelected={this.state.soy}
								setSelection={value => { this.setState({ soy: value }) }}
							/>
							<OSUCheckbox
								option='Tree Nuts'
								isSelected={this.state.treenuts}
								setSelection={value => { this.setState({ treenuts: value }) }}
							/>
							<OSUCheckbox
								option='Wheat'
								isSelected={this.state.wheat}
								setSelection={value => { this.setState({ wheat: value }) }}
							/>
							<OSUCheckbox
								option='Vegetarian'
								isSelected={this.state.vegetarian}
								setSelection={value => { this.setState({ vegetarian: value }) }}
							/>
							<OSUCheckbox
								option='Vegan'
								isSelected={this.state.vegan}
								setSelection={value => { this.setState({ vegan: value }) }}
							/>

							<OSUButton
								onPress={() => {
									this.updateRestrictions(user);
									this.restrictionsModalHandler(false);
								}}
								title='Done'
							/>
						</ScrollView>
					</Modal>
				</View>

				<OSUPrompt prompt='Enter the following info:' />
				<Text />
				<View style={{ marginHorizontal: 30 }}>
					<OSUTextBox
						prompt='Age'
						keyboardType="numeric"
						onChangeText={value => { user.age = value }}
					/>
					<OSUTextBox
						prompt='Weight (pounds)'
						keyboardType="numeric"
						onChangeText={value => { user.weight = value }}
					/>
					<OSUTextBox
						prompt='Height (inches)'
						keyboardType="numeric"
						onChangeText={value => { user.height = value }}
					/>
				</View>

				<View style={{ paddingHorizontal: 50, paddingTop: 10, PaddingBottom: 5 }}>
					<Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>Select your Goal</Text>
					<View style={{
						height: 40,
						borderColor: Colors.tOSUgray,
						borderWidth: 2,
						borderBottomWidth: 5,
						borderRadius: 5,
						marginBottom: 10
					}}>
						<RNPickerSelect
							placeholder={{}}
							style={{ color: 'black' }}
							onValueChange={(value) => { user.goals = value }}
							items={[
								{ label: 'Maintain Weight', value: 'Maintain' },
								{ label: 'Weight Gain', value: 'Gain' },
								{ label: 'Weight Loss', value: 'Loss' }
							]}
						/>
					</View>
					<Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>Select Your Meal Plan</Text>
					<View style={{
						height: 40,
						borderColor: Colors.tOSUgray,
						borderWidth: 2,
						borderBottomWidth: 5,
						borderRadius: 5,
						marginBottom: 10,
						fontSize: 20
					}}>
						<RNPickerSelect
							placeholder={{}}
							style={{ alignText: 'center', color: 'black' }}
							onValueChange={(value) => { this.handleMealPlanChange(value, user) }}
							items={[
								{ label: 'Gray10', value: 'Gray10' },
								{ label: 'Scarlet14', value: 'Scarlet14' },
								{ label: 'Unlimited', value: 'Unlimited' },
								{ label: 'Declining Balance', value: 'DecliningBalance' },
								{ label: 'Carmen1', value: 'Carmen1' },
								{ label: 'Carmen2', value: 'Carmen2' }
							]}
						/>
					</View>
				</View>

				<OSUButton
					onPress={() => {
						this.initialRestrictions(user),
						this.restrictionsModalHandler(true);
					}}
					title='Select Restrictions'
				/>
				<OSUButton
					title='display data'
					onPress={e => { e.preventDefault(), this.setState({ showAlert: true }), this.getData(user) }}
				/>
				<OSUButton
					title='Continue'
					onPress={e => { e.preventDefault(), this.setState({ animate: true }), this.validCheck(user) /*this.SaveUserData(user)*/ }}
					submit={true}
				/>
				<ActivityIndicator
					animating={animate}
					size="large"
					color='grey'
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: '-65%',
						bottom: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}}
				/>

				<AwesomeAlert
					show={showAlert}
					showProgress={false}
					title="User Data"
					message={this.message}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showConfirmButton={true}
					confirmText="Got it!"
					confirmButtonColor={Colors.tOSUscarlet}
					onCancelPressed={() => {
						this.setState({ showAlert: false });
					}}
					onConfirmPressed={() => {
						this.setState({ showAlert: false });
					}}
				/>

			</ScrollView>
		);
	}
}

export default UserInputGoals;