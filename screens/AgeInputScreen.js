import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, TextInput, Button, Text, View } from 'react-native';

//handles screen for user age input
//-Venables
class AgeInputScreen extends React.Component {
	constructor(props) {
		super (props);
		//this.state = {value: ''};
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
	handleSubmit(event) {
		event.preventDefault();
		//var val = value
		if(isNaN(this.value)){
			alert('Please only enter whole numeric values.');
		}
		else{
			alert('Button Pressed ' + this.value);
		}
	}

	render() {
		alert('new' + this.props.route.params);
		return(
			<View>
				<Text>Input Age</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					keyboardType="numeric"
					onChangeText = {this.handleChange}
				/>
				<Button
					title="enter"
					onPress={ this.handleSubmit }
				/>
			</View>
		);
	}
}

export default AgeInputScreen;