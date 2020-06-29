import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

//class for storing restriction info
//-Venables
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
	constructor(){
		this.weight = 0;
		this.height = 0;
		this.age = 0;
		this.goals = 'none';
		this.mealPlan = new MealPlan();
		this.restrictions = new RestrictionTracker();
	}
	
}


//Checks if the user wants to have weight management Goals
//-Venables
export default function UserInputScreen( { route, navigation } ){
	
	return(
		<View style={styles.container}>
			<Text style={{height: 50}}>Would you like to meet weight management Goals?</Text>
			<View style={styles.button}>
				<Button
					onPress={() => navigation.navigate('UserInputGoals', {user: new User()})}
					title='yes'
					color= '#990000'
				/>
			</View>
			<View style={styles.button}>
				<Button
					onPress={ () => navigation.navigate('UserInputNoGoals', {user: new User()})}
					title='no'
					color= '#990000'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
    backgroundColor: '#fff',
  },

  button: {
	width: "60%",
	height: 50,
  },
  
});