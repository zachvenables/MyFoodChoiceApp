import React, { useState } from 'react'
import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'
import OSUCheckbox from '../components/Checkbox.js'

//Converted to Functional from class for state hook functionality

//Depricated
//Class used to track which restriction selections have been made
//-Venables

export default function RestrictionInputScreen ( {route, navigation } ) {
	var { user } = route.params;
	//var { user } = this.props.route.params;

	//Create initial state and setters for checkboxes
	const [isDairy, setDairy] = useState(user.restrictions.Dairy);
	const [isEggs, setEggs] = useState(user.restrictions.Eggs);
	const [isFish, setFish] = useState(user.restrictions.Fish);
	const [isGluten, setGluten] = useState(user.restrictions.Gluten);
	const [isPeanuts, setPeanuts] = useState(user.restrictions.Peanuts);
	const [isShellFish, setShellFish] = useState(user.restrictions.ShellFish);
	const [isSoy, setSoy] = useState(user.restrictions.Soy);
	const [isTreeNuts, setTreeNuts] = useState(user.restrictions.TreeNuts);
	const [isWheat, setWheat] = useState(user.restrictions.Wheat);
	const [isVegetarian, setVegetarian] = useState(user.restrictions.Vegetarian);
	const [isVegan, setVegan] = useState(user.restrictions.Vegan);

	//Submit button
	const handleSubmit = event => {
		event.preventDefault();
		//Set all restrictions from checkbox state
		user.restrictions.Dairy = isDairy;
		user.restrictions.Eggs = isEggs;
		user.restrictions.Fish = isFish;
		user.restrictions.Gluten = isGluten;
		user.restrictions.Peanuts = isPeanuts;
		user.restrictions.ShellFish = isShellFish;
		user.restrictions.Soy = isSoy;
		user.restrictions.TreeNuts = isTreeNuts;
		user.restrictions.Wheat = isWheat;
		user.restrictions.Vegetarian = isVegetarian;
		user.restrictions.Vegan = isVegan;

		//Submit and go to screen
		if(user.goals == 'none'){
			navigation.navigate('UserInputNoGoals', { user });
		}else{
			navigation.navigate('UserInputGoals', { user });
		}
	  }

	return (
			<View>
				<OSUPrompt prompt = 'Select Dietary Restrictions'/>

				<OSUCheckbox 
					option = 'Dairy' 
					isSelected = {isDairy}
					setSelection = {setDairy} 
				/>
				<OSUCheckbox 
					option = 'Eggs' 
					isSelected = {isEggs}
					setSelection = {setEggs} 
				/>
				<OSUCheckbox 
					option = 'Fish' 
					isSelected = {isFish}
					setSelection = {setFish} 
				/>
				<OSUCheckbox 
					option = 'Gluten' 
					isSelected = {isGluten}
					setSelection = {setGluten} 
				/>
				<OSUCheckbox 
					option = 'Peanuts' 
					isSelected = {isPeanuts}
					setSelection = {setPeanuts} 
				/>
				<OSUCheckbox 
					option = 'ShellFish' 
					isSelected = {isShellFish}
					setSelection = {setShellFish} 
				/>
				<OSUCheckbox 
					option = 'Soy' 
					isSelected = {isSoy}
					setSelection = {setSoy} 
				/>
				<OSUCheckbox 
					option = 'Tree Nuts' 
					isSelected = {isTreeNuts}
					setSelection = {setTreeNuts} 
				/>
				<OSUCheckbox 
					option = 'Wheat' 
					isSelected = {isWheat}
					setSelection = {setWheat} 
				/>
				<OSUCheckbox 
					option = 'Vegetarian' 
					isSelected = {isVegetarian}
					setSelection = {setVegetarian} 
				/>
				<OSUCheckbox 
					option = 'Vegan' 
					isSelected = {isVegan}
					setSelection = {setVegan} 
				/>
				<OSUButton 
					title="Done"
					onPress = { handleSubmit}
				/>
			</View>
	)
}
/*
//Class for all restriction input functionality
//-Venables
class RestrictionInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;

		//this.handlePress = this.handlePress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	//Uses different cases based on button type, has toggle properties
	//-Venables
	// handlePress(restriction, user) {
	// 	switch(restriction){
	// 		case "Gluten":
	// 			user.restrictions.Gluten = !user.restrictions.Gluten
	// 			break;
	// 		case "ShellFish":
	// 			user.restrictions.ShellFish = !user.restrictions.ShellFish
	// 			break;
	// 		case "Eggs":
	// 			user.restrictions.Eggs = !user.restrictions.Eggs
	// 			break;
	// 		case "Fish":
	// 			user.restrictions.Fish = !user.restrictions.Fish
	// 			break;
	// 		case "Peanuts":
	// 			user.restrictions.Peanuts = !user.restrictions.Peanuts
	// 			break;
	// 		case "Soy":
	// 			user.restrictions.Soy = !user.restrictions.Soy
	// 			break;
	// 		case "TreeNuts":
	// 			user.restrictions.TreeNuts = !user.restrictions.TreeNuts
	// 			break;
	// 		case "Vegetarian":
	// 			user.restrictions.Vegetarian = !user.restrictions.Vegetarian
	// 			break;
	// 		case "Vegan":
	// 			user.restrictions.Vegan = !user.restrictions.Vegan
	// 			break;
	// 		default:
	// 			alert("Something didn't work right");
	// 			break;
	// 	}
		

	// 	this.value = user;
	// 	//this.props.navigation.navigate('RestrictionInputScreen', {user: this.value})
	// 	//alert('Added restriction: ' + restriction);
	// }

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
*/
//export default RestrictionInputScreen;