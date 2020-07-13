import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'
import User from '../User.js'

//Checks if the user wants to have weight management Goals
//-Venables
export default function UserInputScreen( { navigation } ){
	
	return(
		<View>
			<OSUPrompt prompt = 'Would you like to meet weight management Goals?'/>
			<OSUButton
				onPress={() => navigation.navigate('UserInputGoals', {user: new User('select')})}
				title='yes'
			/>
			<OSUButton
				onPress={ () => navigation.navigate('UserInputNoGoals', {user: new User('none')})}
				title='no'
			/>
		</View>
	);
}
