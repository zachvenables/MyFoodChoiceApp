import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, TextInput, Text, View } from 'react-native';

import OSUButton from '../components/button.js'

//handles screen for user age input
//-Venables
class AgeInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.state;
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//When the text bos value changes, updates the class value
	//-Venables
	handleChange = (text) => {
		this.value = text
	}

	//handles button press, alerts the user. primarily for testing
	//-Venables
	handleSubmit(user) {
		
		
		if(isNaN(this.value)){
			alert('Please only enter whole numeric values.');
		}
		else{
			user.age = this.value;
			this.state = user;
			this.props.navigation.navigate('UserInputGoals', { user: this.state });
		}
	}



	render() {
		var { user } = this.props.route.params;

		return(
			<View>
				<Text>Input Age</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					keyboardType="numeric"
					onChangeText = {this.handleChange}
				/>
				<OSUButton title={'enter'} onPress={e => {e.preventDefault(), this.handleSubmit(user)}} />
				{/* <Button
					title="enter"
					onPress={e => {e.preventDefault(), this.handleSubmit(user)}}
				/> */}
			</View>
		);
	}
}

export default AgeInputScreen;