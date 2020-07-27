import * as React from 'react';
import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

//Deals with the goal inputs from the user
//-Venables
class GoalInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;
		this.handlePress = this.handlePress.bind(this);

	}

	//Handles the selection of a goal type
	//-Venables
	handlePress(goalType){
		this.value.goals = goalType;
		this.props.navigation.navigate('UserInputGoals', { user: this.value });
	}

	render() {
		var { user } = this.props.route.params;
		this.value = user;

		return(
			<View>
				<OSUPrompt prompt = 'Goal Input Screen'/>
				<OSUButton
					title="Weight Gain"
					onPress = {e =>{e.preventDefault(), this.handlePress('Gain')}}
				/>
				<OSUButton
					title="Weight Loss"
					onPress = {e =>{e.preventDefault(), this.handlePress('Loss')}}
				/>
				<OSUButton
					title="Maintain Weight"
					onPress = {e =>{e.preventDefault(), this.handlePress('Maintain')}}
				/>
			</View>
		);
	}
}

export default GoalInputScreen;