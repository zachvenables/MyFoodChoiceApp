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
			<form onSubmit = {this.handleSubmit}>
				<label>
					Weight Gain:
					<input
						type="radio"
						id="goal"
						name="goal"
						value="Weight Gain"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Weight Loss:
					<input
						type="radio"
						id="goal"
						name="goal"
						value="Weight Loss"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Maintain Weight:
					<input
						type="radio"
						id="goal"
						name="goal"
						value="Maintain Weight"
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit"/>
			</form>
		</View>
		);
	}
}

export default GoalInputScreen;