import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


function NoGoalsScreen(){
	return(
		<View>
			<Text>Please Enter the following:</Text>
			<Button
				title='mealPlan'
			/>
			<Button
				title='Restrictions'
			/>
		</View>
	);

}

export default function UserInputScreen( { navigation } ){
	return(
		<View>
			<Text>Would you like to meet weight management Goals?</Text>
			<Button
				onPress={() => navigation.navigate('UserInputGoals')}
				title='yes'
			/>

			<Button
				//onPress={ navigation.navigate('NoGoalsScreen')}
				title='no'
			/>
		</View>
	);
}