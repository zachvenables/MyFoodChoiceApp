import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';


class RestrictionTracker {
	constructor(){
		this.Gluten = false;
		this.ShellFish = false;
		this.Eggs = false;
		this.Fish = false;
		this.Peanuts = false;
		this.Soy = false;
		this.TreeNuts = false;
		this.Vegetarian = false;
		this.Vegan = false;
	}
}

class MealPlan {
	constructor(){
		this.type = 'none'
		this.WeeklyTraditionalVisits = 0;
		this.TraditionalVisitExchange = false;
		this.DiningDollars = 0.0;
		this.BuckIDCash = 0.0;
	}
}


//Checks if the user wants to have weight management Goals
//-Venables
export default function UserInputScreen( { route, navigation } ){
	
	return(
		<View>
			<Text>Would you like to meet weight management Goals?</Text>
			<Button
				onPress={() => navigation.navigate('UserInputGoals', {
					weight: 0,
					height: 0,
					age: 0,
					goals: "none",
					mealPlan: new MealPlan(),
					restrictions: new RestrictionTraker(),
				  })}
				title='yes'
			/>

			<Button
				onPress={ () => navigation.navigate('UserInputNoGoals', {mealPlan: new MealPlan(), restrictions: new RestrictionTracker()})}
				title='no'
			/>
		</View>
	);
}