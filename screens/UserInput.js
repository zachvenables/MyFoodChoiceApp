import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//NoGoalsScreen is much simpler that UserInputGoals screen so it is included in this file.  Operates the same way
//-Venables
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


//Checks if the user wants to have weight management Goals
//-Venables
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