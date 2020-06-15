import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';

//Class used to track which restriction selections have been made
//-Venables
class RestrictionTracker {
	constructor(props){
		this.Gluten = false;
		this.ShellFish = false;
		this.Eggs = false;
		this.Fish = false;
		this.Peanuts = false;
		this.Soy = false;
		this.TreeNuts = false;
		this.Vegetarian = false;
		this.Vegan = false;
	}
}

//Class for all restriction input functionality
//-Venables
class RestrictionInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;

		this.handlePress = this.handlePress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	//Uses different cases based on button type, has toggle properties
	//-Venables
	handlePress(restriction, user) {
		switch(restriction){
			case "Gluten":
				user.restrictions.Gluten = !user.restrictions.Gluten
				break;
			case "ShellFish":
				user.restrictions.ShellFish = !user.restrictions.ShellFish
				break;
			case "Eggs":
				user.restrictions.Eggs = !user.restrictions.Eggs
				break;
			case "Fish":
				user.restrictions.Fish = !user.restrictions.Fish
				break;
			case "Peanuts":
				user.restrictions.Peanuts = !user.restrictions.Peanuts
				break;
			case "Soy":
				user.restrictions.Soy = !user.restrictions.Soy
				break;
			case "TreeNuts":
				user.restrictions.TreeNuts = !user.restrictions.TreeNuts
				break;
			case "Vegetarian":
				user.restrictions.Vegetarian = !user.restrictions.Vegetarian
				break;
			case "Vegan":
				user.restrictions.Vegan = !user.restrictions.Vegan
				break;
			default:
				alert("Something didn't work right");
		}
		
		this.value = user;

		alert('Added restriction: ' + restriction);
	}

	//Logs the selections that have been made and then outputs them to the screen
	//Primarily for testing
	//-Venables
	
	handleSubmit(user){
	
		if(user.goals == 'none'){
			this.props.navigation.navigate('UserInputNoGoals', { user: this.value });
		}else{
			this.props.navigation.navigate('UserInputGoals', { user: this.value });
		}
		
	}

	render() {
		var { user } = this.props.route.params;
		
		return(
			<View>
				<Text>Select Dietary Restrictions:</Text>
				<Button
					title="Gluten"
					onPress = {e=> { e.preventDefault(); this.handlePress("Gluten", user)} }
					color= '#990000'
				/>
				<Button
					title="ShellFish"
					onPress = {e=> { e.preventDefault(); this.handlePress("ShellFish", user)} }
					color= '#990000'
				/>
				<Button
					title="Eggs"
					onPress = {e=> { e.preventDefault(); this.handlePress("Eggs", user)} }
					color= '#990000'
				/>
				<Button
					title="Fish"
					onPress = {e=> { e.preventDefault(); this.handlePress("Fish", user)} }
					color= '#990000'
				/>
				<Button
					title="Peanuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("Peanuts", user)} }
					color= '#990000'
				/>
				<Button
					title="Soy"
					onPress = {e=> { e.preventDefault(); this.handlePress("Soy", user)} }
					color= '#990000'
				/>
				<Button
					title="TreeNuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("TreeNuts", user)} }
					color= '#990000'
				/>
				<Button
					title="Vegetarian"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegetarian", user)} }
					color= '#990000'
				/>
				<Button
					title="Vegan"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegan", user)} }
					color= '#990000'
				/>
				<Button 
					title="Submit"
					onPress = { e=> { e.preventDefault(); this.handleSubmit(user)}}
					color= '#990000'
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;