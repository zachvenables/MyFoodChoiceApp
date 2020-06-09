import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


class RestrictionInputScreen extends React.Component {
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
				<Text>Select Dietary Restrictions:</Text>
				<Button
					title="Gluten"
				/>
				<Button
					title="ShellFish"
				/>
				<Button
					title="Eggs"
				/>
				<Button
					title="Fish"
				/>
				<Button
					title="Peanuts"
				/>
				<Button
					title="Soy"
				/>
				<Button
					title="TreeNuts"
				/>
				<Button
					title="Vegetarian"
				/>
				<Button
					title="Vegan"
				/>
			</View>
		);
	}
}

export default RestrictionInputScreen;