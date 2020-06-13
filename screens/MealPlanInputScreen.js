import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//Class that deals with meal plan selection for the user
//-Venables
class MealPlanInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handlePress = this.handlePress.bind(this);
	}

	//Not used.  Remove after testing -Venables
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	//Default event is handled in the xml.  Alerts user based on which selection is made. 
	//Place holder for later functionality.
	//-Venables
	handlePress(newPlan, mealPlan) {
		mealPlan.type = newPlan;
		switch(newPlan){
			case "Gray10":
				mealPlan.WeeklyTraditionalVisits = 10;
				mealPlan.TraditionalVisitExchange = true;
				mealPlan.DiningDollars = 200.0;
				mealPlan.BuckIDCash = 150.0;
				break;
			case "Scarlet14":
				mealPlan.WeeklyTraditionalVisits = 14;
				mealPlan.TraditionalVisitExchange = true;
				mealPlan.DiningDollars = 200.0;
				mealPlan.BuckIDCash = 150.0;
				break;
			case "Unlimited":
				mealPlan.WeeklyTraditionalVisits = 999;
				mealPlan.TraditionalVisitExchange = false;
				mealPlan.DiningDollars = 100.0;
				mealPlan.BuckIDCash = 0.0;
				break;
			case "DecliningBalance":
				mealPlan.WeeklyTraditionalVisits = 0;
				mealPlan.TraditionalVisitExchange = false;
				mealPlan.DiningDollars = 1399.0;
				mealPlan.BuckIDCash = 0.0;
				break;
			case "Carmen1":
				mealPlan.WeeklyTraditionalVisits = 0;
				mealPlan.TraditionalVisitExchange = false;
				mealPlan.DiningDollars = 284.0;
				mealPlan.BuckIDCash = 0.0;
				break;
			case "Carmen2":
				mealPlan.WeeklyTraditionalVisits = 0;
				mealPlan.TraditionalVisitExchange = false;
				mealPlan.DiningDollars = 0.0;
				mealPlan.BuckIDCash = 150.0;
				break;
			default:
				alert("Something didn't work right");
		}

		this.value = mealPlan;
	}

	render() {
		var {mealPlan, restrictions} = this.props.route.params;

		return(
			<View>
				<Text>Select Your Meal Plan</Text>
				<Button
					title="Gray10"
					onPress = {e=> { e.preventDefault(); this.handlePress("Gray10", mealPlan)} }
				/>
				<Button
					title="Scarlet14"
					onPress = {e=> { e.preventDefault(); this.handlePress("Scarlet14", mealPlan)} }
				/>
				<Button
					title="Unlimited"
					onPress = {e=> { e.preventDefault(); this.handlePress("Unlimited", mealPlan)} }
				/>
				<Button
					title="DecliningBalance"
					onPress = {e=> { e.preventDefault(); this.handlePress("DecliningBalance", mealPlan)} }
				/>
				<Button
					title="Carmen1"
					onPress = {e=> { e.preventDefault(); this.handlePress("Carmen1", mealPlan)} }
				/>
				<Button
					title="Carmen2"
					onPress = {e=> { e.preventDefault(); this.handlePress("Carmen2", mealPlan) } }
				/>
				<Button
					title="Done"
					onPress = { e=> {e.preventDefault(); this.props.navigation.navigate('UserInputNoGoals', {mealPlan: this.value, restrictions}) }}
				/>
			</View>
		);
	}
}

export default MealPlanInputScreen;