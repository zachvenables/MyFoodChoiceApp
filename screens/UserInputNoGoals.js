import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

//navigates to each respective input screen
//-Venables


function SaveUserData(user, navigation){
	alert('saved');
	navigation.navigate('NearestFoodScreen', { user });
}

export default function UserInputNoGoals( {route, navigation } ){
	var { user } = route.params;
	alert(
		'mealPlan: ' + user.mealPlan.type + '\n'
		+ 'TradVisits: ' + user.mealPlan.WeeklyTraditionalVisits + '\n'
		+ 'TradVisitExch: ' + user.mealPlan.TraditionalVisitExchange + '\n'
		+ 'DiningDollars: ' + user.mealPlan.DiningDollars + '\n'
		+ 'BuckIDCash: ' + user.mealPlan.BuckIDCash + '\n'
		+ 'gluten: ' + user.restrictions.Gluten + '\n'
		+ 'shellfish: ' + user.restrictions.ShellFish + '\n'
		+ 'eggs: ' + user.restrictions.Eggs + '\n'
		+ 'fish: ' + user.restrictions.Fish + '\n'
		+ 'peanuts: ' + user.restrictions.Peanuts + '\n'
		+ 'soy: ' + user.restrictions.Soy + '\n'
		+ 'treenuts: ' + user.restrictions.TreeNuts + '\n'
		+ 'vegetarian: ' + user.restrictions.Vegetarian + '\n'
		+ 'vegan: ' + user.restrictions.Vegan + '\n'
		+ 'age: ' + user.age + '\n'
		+ 'weight: ' + user.weight + '\n'
		+ 'height: ' + user.height + '\n'
		+ 'goals: ' + user.goals + '\n'
	);


	const styles = StyleSheet.create({
		  container: {
			flex: 1,
			alignItems: "center",
			backgroundColor: "#fff",
		  },

		  button: {
			width: "60%",
			height: 50,
		  },

		  text: {
			height: 170,
			justifyContent: 'center',
		  },
	});


	
	return(
		<View style={styles.container}>
			<View style={styles.text}>
				<Text>Please enter the following information about yourself:</Text>
			</View>
			<View style={styles.button}>
			<Button
				onPress={() => navigation.navigate('MealPlanInputScreen', { user })}
				title='Meal Plan'
				color= '#990000'
			/>
			</View>
			<View style={styles.button}>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen', { user })}
				title='Restrictions'
				color= '#990000'
			/>
			</View>
			<View style={styles.button}>
			<Button
				title='Next'
				onPress={e => {e.preventDefault(), SaveUserData(user, navigation)}}
				color= '#990000'
			/>
			</View>
		</View>
	);




	
}