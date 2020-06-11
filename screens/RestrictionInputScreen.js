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
		this.state = new RestrictionTracker();

		this.handlePress = this.handlePress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	//Uses different cases based on button type
	//-Venables
	handlePress(restriction) {
		switch(restriction){
			case "Gluten":
				this.Gluten = !this.Gluten
				break;
			case "ShellFish":
				this.ShellFish = !this.ShellFish
				break;
			case "Eggs":
				this.Eggs = !this.Eggs
				break;
			case "Fish":
				this.Peanuts = !this.Peanuts
				break;
			case "Peanuts":
				this.Peanuts = !this.Peanuts
				break;
			case "Soy":
				this.Soy = !this.Soy
				break;
			case "TreeNuts":
				this.TreeNuts = !this.TreeNuts
				break;
			case "Vegetarian":
				this.Vegetarian = !this.Vegetarian
				break;
			case "Vegan":
				this.Vegan = !this.Vegan
				break;
			default:
				alert("Something didn't work right");
		}

		alert('Added restriction: ' + restriction);
	}

	//Logs the selections that have been made and then outputs them to the screen
	//Primarily for testing
	//-Venables
	handleSubmit(event){
		event.preventDefault();
		var message = ""

		message += "Gluten: ";
		if(this.Gluten){message += "Selected"}
		message += "\nShellFish: ";
		if(this.ShellFish){message += "Selected"}
		message += "\nEggs: ";
		if(this.Eggs){message += "Selected"}
		message += "\nFish: ";
		if(this.Fish){message += "Selected"}
		message += "\nPeanuts: ";
		if(this.Peanuts){message += "Selected"}
		message += "\nSoy: ";
		if(this.Soy){message += "Selected"}
		message += "\nTreeNuts: ";
		if(this.TreeNuts){message += "Selected"}
		message += "\nVegetarian: ";
		if(this.Vegetarian){message += "Selected"}
		message += "\nVegan: ";
		if(this.Vegan){message += "Selected"}

		alert(message);
	}

	render() {
		return(
			<View>
				<Text>Select Dietary Restrictions:</Text>
				<Button
					title="Gluten"
					onPress = {e=> { e.preventDefault(); this.handlePress("Gluten")} }
				/>
				<Button
					title="ShellFish"
					onPress = {e=> { e.preventDefault(); this.handlePress("ShellFish")} }
				/>
				<Button
					title="Eggs"
					onPress = {e=> { e.preventDefault(); this.handlePress("Eggs")} }
				/>
				<Button
					title="Fish"
					onPress = {e=> { e.preventDefault(); this.handlePress("Fish")} }
				/>
				<Button
					title="Peanuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("Peanuts")} }
				/>
				<Button
					title="Soy"
					onPress = {e=> { e.preventDefault(); this.handlePress("Soy")} }
				/>
				<Button
					title="TreeNuts"
					onPress = {e=> { e.preventDefault(); this.handlePress("TreeNuts")} }
				/>
				<Button
					title="Vegetarian"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegetarian")} }
				/>
				<Button
					title="Vegan"
					onPress = {e=> { e.preventDefault(); this.handlePress("Vegan")} }
				/>
				<Button 
					title="Submit"
					onPress = { this.handleSubmit }
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;