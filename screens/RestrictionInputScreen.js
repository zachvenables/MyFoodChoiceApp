import * as React from 'react';
import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'


//Class used to track which restriction selections have been made
//-Venables

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
				<OSUPrompt prompt = 'Select Dietary Restrictions'/>
				
				<OSUButton
					title="Gluten"
					onPress = {e=> { e.preventDefault(); this.handlePress("Gluten", user)} }
				/>
				<OSUButton
					title="ShellFish"
					onPress = {e=> { e.preventDefault(); this.handlePress("ShellFish", user)} }
				/>
				<OSUButton
					title="Eggs"
					onPress = {e=> { e.preventDefault(); this.handlePress("Eggs", user)} }
				/>
				<OSUButton
					title="Fish"
					onPress = {e=> { e.preventDefault(); this.handlePress("Fish", user)} }
				/>
				<OSUButton
					title="Peanuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("Peanuts", user)} }
				/>
				<OSUButton
					title="Soy"
					onPress = {e=> { e.preventDefault(); this.handlePress("Soy", user)} }
				/>
				<OSUButton
					title="TreeNuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("TreeNuts", user)} }
				/>
				<OSUButton
					title="Vegetarian"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegetarian", user)} }
				/>
				<OSUButton
					title="Vegan"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegan", user)} } 
				/>
				<OSUButton 
					title="Done"
					onPress = { e=> { e.preventDefault(); this.handleSubmit(user)}}
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;