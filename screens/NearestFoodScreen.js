import * as React from 'react';
import {decode, encode} from 'base-64';
import { TouchableOpacity, StyleSheet, ActivityIndicator, YellowBox, ScrollView, TextInput, Button, Text, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AwesomeAlert from 'react-native-awesome-alerts';
import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'
import * as firebase from 'firebase';
import 'firebase/firestore';
import Colors from '../constants/Colors';

YellowBox.ignoreWarnings(['Setting a timer']);

//missing a promise when checking for next location
console.disableYellowBox = true;	


class NearestFoodScreen extends React.Component {
	state = { 
		showAlert: false, 
		foodList: null, 
		locationName: null, 
		restaurantLocation: null, 
		animate: false,
		tableHead: ['Name', 'Cal']
	
		}

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
				+ 'Traditional Visit Exchange: ' + (mealPlan.TraditionalVisitExchange ? "Yes" : "No") + '\n'
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
		if(user.restrictions.Wheat){
			snapshot = snapshot.where("restriction_wheat_free", "==", user.restrictions.Wheat);
		}
		if(user.restrictions.Vegan){
			snapshot = snapshot.where("restriction_vegan","==",user.restrictions.Vegan);
		}
		if(user.restrictions.Vegetarian){
			snapshot = snapshot.where("restriction_vegetarian","==",user.restrictions.Vegetarian);
		}
		if(user.restrictions.ShellFish){
			snapshot = snapshot.where("restriction_shellfish_free","==",user.restrictions.ShellFish);
		}
		snapshot.get().then(snapshot => {snapshot.forEach(doc => {nextState.push({'name': doc.data().name, 'calories': doc.data().total_calories})})});

		//this.setState({foodList: nextState});
		this.state.location = location;

		global.DirectionName = location;

		//waits for the query to finish before navigating
		//-Venables
		await setTimeout(() => {this.setState({animate: false}), this.state.foodList = nextState, this.forceUpdate() }, 1400);
	}


	render() {
		var { user, location, nextState, restaurantLocation } = this.props.route.params;
		const animate = this.state.animate;
		const showAlert = this.state.showAlert;

		//this is updated for the direction screen header name
		if(global.DirectionName != this.state.location){
			global.DirectionName = location;
		}

		this.message = this.getMealPlanData(user.mealPlan);

		if(this.state.foodList == null){
			this.state.foodList = nextState;
		}

		if(this.state.location == null){
			this.state.location = location;
		}

		restaurantLocation = global.locationStack[this.locationIndex];

		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<View style={{paddingTop:'6%'}}/> 
			<View style={{paddingBottom: '9%'}}>
			<OSUPrompt prompt = {this.state.location} />
			</View>			
			<View style={{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1/*, backgroundColor: Colors.tOSUwhite*/}}>
				<ScrollView style={{width: '100%'}}>
					<View>
					<Table borderStyle={{borderWidth: 1, borderColor: '#BB0000'}}>
						<Row data={this.state.tableHead} style={{ height: 45, backgroundColor: '#BB0000'}} textStyle={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold'}} flexArr={[2, 1]} />
					{
						this.state.foodList.map((item, key) =>(
							<Row key={key} data={[item.name, item.calories]} style={{height: 35}} textStyle={{textAlign: 'center'}} flexArr={[2, 1]}/>
						))
					}
					</Table>
					</View>
				</ScrollView>
			</View>

			<View style={{paddingTop:'8%'}}/> 
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>
			<OSUButton 
				title="Next Location"
				onPress={e => {e.preventDefault(), this.setState({animate: true}), this.loadNextLocation(user)}}
			/>
			<OSUButton 
				title="Update Preferences"
				onPress={e => {e.preventDefault(), this.locationIndex = 0, this.state.location = null,  this.state.foodList = null, this.props.navigation.navigate('UserInputGoals', {user})}}
			/>
			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.props.navigation.navigate('DirectionScreen', { restaurantLocation })}}
				submit={true}
			/>
			<ActivityIndicator
				animating = {animate}
				size = "large"
				color = 'grey'
				style = {{
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
				title="Meal Plan Stats"
				message = {this.message}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText="Got it!"
				confirmButtonColor={Colors.tOSUscarlet}
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

