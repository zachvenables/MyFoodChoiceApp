import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


class WeightInputScreen extends React.Component {
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
			<Text>Weight Input Screen</Text>
			<form onSubmit = {this.handleSubmit}>
				<label>
					Weight:
					<input
						type="number"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit"/>
			</form>
		</View>
		);
	}
}

export default WeightInputScreen;