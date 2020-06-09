import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Fragment, TextInput, Button, Text, View } from 'react-native';


class HeightInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		alert('submission is: ' + this.state.value);
	}

	render() {
		return(
			<View>
				<Text>Input Weight</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					keyboardType="numeric"
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