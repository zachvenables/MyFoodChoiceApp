import * as React from 'react';
import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUTextBox from '../components/TextBox.js'

class WeightInputScreen extends React.Component {

	constructor(props) {
		super (props);
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	//Used when the text in the box is changed.  Updates to reflect value in the box
	//-Venables
	handleChange = (text) => {
		this.value = text;
	}


	//When the enter button is pressed, alerts the value to the screen
	//-Venables
	handleSubmit(user) {
		if(isNaN(this.value)){
			alert('Please only enter whole numeric values.');
		}
		else{
			user.weight = this.value;
			this.props.navigation.navigate('UserInputGoals', { user })
		}
	}

	render() {
		var { user } = this.props.route.params;

		return(
		<View>
			<OSUTextBox 
				prompt = 'Input Weight (pounds)' 
				keyboardType="numeric"
				onChangeText = {this.handleChange}
			/>
			<OSUButton
				title="enter"
				onPress={ e => { e.preventDefault(),  this.handleSubmit(user) }}
			/>
		</View>
		);
	}
}

export default WeightInputScreen;