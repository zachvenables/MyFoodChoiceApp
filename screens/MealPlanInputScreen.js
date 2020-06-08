import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


class MealPlanInputScreen extends React.Component {
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
			<Text>MealPlan Input Screen</Text>
			<form onSubmit = {this.handleSubmit}>
				<label>
					Gray10 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Gray10"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Scarlet 14 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Scarlet14"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Gray10 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Gray10"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Gray10 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Gray10"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Gray10 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Gray10"
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Gray10 :
					<input
						type="radio"
						id="plan"
						name="plan"
						value="Gray10"
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit"/>
			</form>
		</View>
		);
	}
}

export default MealPlanInputScreen;