import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


class GoalInputScreen extends React.Component {
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
				<Text>Goal Input Screen</Text>
				<Button
					title="Weight Gain"
				/>
				<Button
					title="Weight Loss"
				/>
				<Button
					title="Maintain Weight"
				/>
			</View>
		);
	}
}

export default GoalInputScreen;