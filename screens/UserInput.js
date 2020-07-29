import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'
import User from '../User.js'

//Checks if the user wants to have weight management Goals
//-Venables
class UserInput extends React.Component{

	constructor(props){
		super (props);

		this.user;

		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(goalType){
		this.user.goals = goalType;
		this.props.navigation.navigate('UserInputGoals', {user: this.user});
	}
	

	render(){
		var { user } = this.props.route.params;
		this.user = user;

		return(
			<View>
				<OSUPrompt prompt = 'What weight management goals would you like to meet?'/>
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
				<OSUButton
					onPress={ () => this.props.navigation.navigate('UserInputNoGoals', {user: new User('none')})}
					title='no goals'
				/>
			</View>
	);}
}

export default UserInput;