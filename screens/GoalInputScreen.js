import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


class GoalInputScreen extends React.Component {
	constructor(props) {
		super (props);
		this.value;

		this.handleWeightGain = this.handleWeightGain.bind(this);
		this.handleWeightLoss = this.handleWeightLoss.bind(this);
		this.handleWeightMaintain = this.handleWeightMaintain.bind(this);
	}

	handleWeightGain(event) {
		event.preventDefault();
		this.value = "Weight Gain";
		alert("Button pressed is Weight Gain");

	}

	handleWeightLoss(event) {
		event.preventDefault();
		this.value = "Weight Loss";
		alert("Button pressed is Weight Loss");
	}

	handleWeightMaintain(event) {
		event.preventDefault();
		this.value = "Weight Maintain";
		alert("Button pressed is Weight Maintain");
	}

	render() {
		return(
			<View>
				<Text>Goal Input Screen</Text>
				<Button
					title="Weight Gain"
					onPress = { this.handleWeightGain }

				/>
				<Button
					title="Weight Loss"
					onPress = { this.handleWeightLoss }
				/>
				<Button
					title="Maintain Weight"
					onPress = { this.handleWeightMaintain }
				/>
			</View>
		);
	}
}

export default GoalInputScreen;