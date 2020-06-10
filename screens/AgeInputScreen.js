import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, TextInput, Button, Text, View } from 'react-native';


class AgeInputScreen extends React.Component {
	constructor(props) {
		super (props);
		//this.state = {value: ''};
		this.value;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (text) => {
		this.value = text
	}

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