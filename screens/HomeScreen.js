import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OSUButton from '../components/Button.js'

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

class HomeScreen extends React.Component {

  //If user data exists, give option to edit data or continue.
  //If no data exists, continue with user input process.  
  async checkUserData() {
    try {
       const jsonUser = await AsyncStorage.getItem('userInfo');
       if (jsonUser != null){
         var user = new User();
         user = JSON.parse(jsonUser);
         this.props.navigation.navigate('UserInputNoGoals', { user })
       }
       else {
        this.props.navigation.navigate('UserInput')
      }
    } catch (e) {
        console.log(e);
    }
}

  render(){  
    return (
      <View style={styles.container}>
       <OSUButton onPress={e => {e.preventDefault(), this.checkUserData()}} title="Enter Data" />
        {/* <Button
          onPress={() => navigation.navigate('UserInput')}
          title="Enter Data"
          color="#990000"
          /> */}
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  
});

export default HomeScreen;