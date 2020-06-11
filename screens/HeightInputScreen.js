import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, TextInput, Button, Text, View } from 'react-native';

//Class for taking heigh input
//-Venables
class HeightInputScreen extends React.Component {
	constructor(props) {
		super (props);
		//this.state = {value: ''};
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
				<Text>Input Height</Text>
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

export default HeightInputScreen;