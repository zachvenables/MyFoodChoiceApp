import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';

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


class RestrictionInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.state = new RestrictionTracker();

		this.handlePress = this.handlePress.bind(this);

	}


	handlePress(restriction) {
		//event.preventDefault();

		switch(restriction){
			case "Gluten":
				
				break;
			case "ShellFish":
				
				break;
			case "Eggs":
				
				break;
			case "Fish":
				
				break;
			case "Peanuts":
				
				break;
			case "Soy":
				
				break;
			case "TreeNuts":
				
				break;
			case "Vegetarian":
				
				break;
			case "Vegan":
				
				break;
		}

		alert('Added restriction: ' + restriction);
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
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;