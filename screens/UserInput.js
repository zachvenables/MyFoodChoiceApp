import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'


//class for storing restriction info
//-Venables
class RestrictionTracker {
	constructor(){
		this.Dairy = false;
		this.Eggs = false;
		this.Fish = false;		
		this.Gluten = false;
		this.Peanuts = false;
		this.ShellFish = false;
		this.Soy = false;
		this.TreeNuts = false;
		this.Wheat = false;
		this.Vegetarian = false;
		this.Vegan = false;
	}
}

//class for storing meal plan info
//-Venables
class MealPlan {
	//builds a default mealplan that has placeholder values
	constructor(){
		this.type = 'none'
		this.WeeklyTraditionalVisits = -1;
		this.TraditionalVisitExchange = false;
		this.DiningDollars = -1.0;
		this.BuckIDCash = -1.0;
	}
}

//User class structure
//-Venables
class User{
	constructor(goals){
		this.weight = 0;
		this.height = 0;
		this.age = 0;
		this.goals = goals;
		this.mealPlan = new MealPlan();
		this.restrictions = new RestrictionTracker();
	}
	
}


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

