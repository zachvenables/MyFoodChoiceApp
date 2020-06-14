import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//Deals with the goal inputs from the user
//-Venables
class GoalInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;
		this.handlePress = this.handlePress.bind(this);

	}

	//-Venables
	handlePress(goalType, user){
		this.value.goals = goalType;
		this.props.navigation.navigate('UserInputGoals', { user: this.value });
	}

	render() {
		var { user } = this.props.route.params;
		this.value = user;

		return(
			<View>
				<Text>Goal Input Screen</Text>
				<Button
					title="Weight Gain"
					onPress = {e =>{e.preventDefault(), this.handlePress('Gain', { user })}}
				/>
				<Button
					title="Weight Loss"
					onPress = {e =>{e.preventDefault(), this.handlePress('Loss', { user })}}
				/>
				<Button
					title="Maintain Weight"
					onPress = {e =>{e.preventDefault(), this.handlePress('Maintain', { user })}}
				/>
			</View>
		);
	}
}

export default GoalInputScreen;