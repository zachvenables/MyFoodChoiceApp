import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, Text, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUTextBox from '../components/TextBox.js'

//Class for taking heigh input
//-Venables
class HeightInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.state;
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//When text is changed, updates the value for the class.
	//-Venables
	handleChange= (text) => {
		this.value = text
	}

	//handles the button press for entering the data, alerts the user of the value
	//-Venables
	handleSubmit(user) {
		
		if(isNaN(this.value)){
			alert('Please only enter whole numeric values.');
		}
		else{
			user.height = this.value;
			this.state = user;
			this.props.navigation.navigate('UserInputGoals', { user: this.state });
		}
	}

	render() {
		var { user } = this.props.route.params;
		
		return(
			<View>
				<OSUTextBox 
					prompt = 'Input Height'
					keyboardType="numeric"
					onChangeText = {this.handleChange}
				/>
				<OSUButton
					title="enter"
					onPress={e => {e.preventDefault(), this.handleSubmit(user)}}
				/>
			</View>
		);
	}
}

export default HeightInputScreen;