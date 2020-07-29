import * as React from 'react';

import { YellowBox, ScrollView, TextInput, Button, Text, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

YellowBox.ignoreWarnings(['Setting a timer']);

import Colors from '../constants/Colors';



class NearestFoodScreen extends React.Component {
	
	constructor(props) {
		super (props);
		
		this.mealPlanCheck = this.mealPlanCheck.bind(this);
		this.loadNextLocation = this.loadNextLocation.bind(this);
	}


	//-Venables
	mealPlanCheck(user) {
		alert(
			'Remember to rate our app ★★★★★ on the app store!'
		)
	}

	loadNextLocation(user){
		alert(
			'Remember to rate our app ★★★★★ on the app store!'
		)
	}

	render() {
		var { user, location, nextState, restaurantLocation } = this.props.route.params;

		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>

			<OSUPrompt prompt = {location} />
			<View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'flex-end', borderBottomWidth: 2, borderTopWidth: 2/*, backgroundColor: Colors.tOSUwhite*/}}>
				<ScrollView style={{width: '90%'}}>
					{
						nextState.map((item, key) =>(
							<View key={key} style={{width: '70%', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row'}}>
								<Text style = {{color: Colors.tOSUscarlet, fontSize: 12}}>{item.name}</Text>
								<Text style = {{color: Colors.tOSUscarlet, fontSize: 12}}>Calories: {item.calories}</Text>
							</View>
						))
					}
				</ScrollView>
			</View>

			<View style={{paddingTop:100}}/> 

			<OSUButton 
				title="Next Location"
				onPress={e => {e.preventDefault(), this.loadNextLocation(user)}}
			/>

			<View style={{paddingTop:10}}/>

			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.props.navigation.navigate('DirectionScreen', { restaurantLocation })}}
			/>
			
		</View>
		);


		const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#fff",
			},  
		});

	}
}

export default NearestFoodScreen;