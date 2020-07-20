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
			case "Wheat":
				user.restrictions.Wheat = !user.restrictions.Wheat
				break;
			case "Dairy":
				user.restrictions.Dairy = !user.restrictions.Dairy
				break;
			case "Vegetarian":
				user.restrictions.Vegetarian = !user.restrictions.Vegetarian
				break;
			case "Vegan":
				user.restrictions.Vegan = !user.restrictions.Vegan
				break;
			default:
				alert("Something didn't work right");
				break;
		}
		

		this.value = user;
		this.props.navigation.navigate('RestrictionInputScreen', {user: this.value})
		//alert('Added restriction: ' + restriction);
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
					submit = {user.restrictions.Gluten}
				/>
				<OSUButton
					title="ShellFish"
					onPress = {e=> { e.preventDefault(); this.handlePress("ShellFish", user)} }
					submit = {user.restrictions.ShellFish}
				/>
				<OSUButton
					title="Eggs"
					onPress = {e=> { e.preventDefault(); this.handlePress("Eggs", user)} }
					submit = {user.restrictions.Eggs}
				/>
				<OSUButton
					title="Fish"
					onPress = {e=> { e.preventDefault(); this.handlePress("Fish", user)} }
					submit = {user.restrictions.Fish}
				/>
				<OSUButton
					title="Peanuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("Peanuts", user)} }
					submit = {user.restrictions.Peanuts}
				/>
				<OSUButton
					title="Soy"
					onPress = {e=> { e.preventDefault(); this.handlePress("Soy", user)} }
					submit = {user.restrictions.Soy}
				/>
				<OSUButton
					title="TreeNuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("TreeNuts", user)} }
					submit = {user.restrictions.TreeNuts}
				/>
				<OSUButton
					title="Wheat"
					onPress = {e=> { e.preventDefault(); this.handlePress("Wheat", user)} }
					submit = {user.restrictions.Wheat}
				/>
				<OSUButton
					title="Dairy"
					onPress = {e=> { e.preventDefault(); this.handlePress("Dairy", user)} }
					submit = {user.restrictions.Dairy}
				/>
				<OSUButton
					title="Vegetarian"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegetarian", user)} }
					submit = {user.restrictions.Vegetarian}
				/>
				<OSUButton
					title="Vegan"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegan", user)} }
					submit = {user.restrictions.Vegan}
				/>
				<OSUButton 
					title="Done"
					onPress = { e=> { e.preventDefault(); this.handleSubmit(user)}}
					submit = {true}
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;