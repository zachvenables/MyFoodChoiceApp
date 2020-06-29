import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Text, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//Class that deals with meal plan selection for the user
//-Venables
class MealPlanInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.mealPlan;
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handlePress = this.handlePress.bind(this);
	}

	//Not used.  Remove after testing -Venables
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	//fills appropraite meal plan info for each class
	//-Venables
	handlePress(newPlan, user) {
		user.mealPlan.type = newPlan;
		switch(newPlan){
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
		}
		
		this.value = user;
	}

	handleDone(user){
		if(user.goals == "none"){
			this.props.navigation.navigate('UserInputNoGoals', { user: this.value })
		}else{
			this.props.navigation.navigate('UserInputGoals', { user: this.value })
		}
	}

	render() {
		var { user } = this.props.route.params;
	
		return(
			<View>
				<OSUPrompt prompt = 'Select Your Meal Plan'/>
				

				<OSUButton
					title="Gray10"
					onPress = {e=> { e.preventDefault(); this.handlePress("Gray10", user)} }
				/>
				<OSUButton
					title="Scarlet14"
					onPress = {e=> { e.preventDefault(); this.handlePress("Scarlet14", user)} }
				/>
				<OSUButton
					title="Unlimited"
					onPress = {e=> { e.preventDefault(); this.handlePress("Unlimited", user)} }
				/>
				<OSUButton
					title="DecliningBalance"
					onPress = {e=> { e.preventDefault(); this.handlePress("DecliningBalance", user)} }
				/>
				<OSUButton
					title="Carmen1"
					onPress = {e=> { e.preventDefault(); this.handlePress("Carmen1", user)} }
				/>
				<OSUButton
					title="Carmen2"
					onPress = {e=> { e.preventDefault(); this.handlePress("Carmen2", user) } }
				/>
				<OSUButton
					title="Done"
					onPress = { e=> {e.preventDefault(); this.handleDone(user) }}
				/>
			</View>
		);
	}
}

export default MealPlanInputScreen;