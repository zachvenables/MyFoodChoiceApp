import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';


//Screens for entire app
//-Venables
import Home from './screens/HomeScreen';
//import UserInput from './screens/UserInput';
import UserInputGoals from './screens/UserInputGoals';
/*
import WeightInputScreen from './screens/WeightInputScreen';
import AgeInputScreen from './screens/AgeInputScreen';
import HeightInputScreen from './screens/HeightInputScreen';
import GoalInputScreen from './screens/GoalInputScreen';
import MealPlanInputScreen from './screens/MealPlanInputScreen';
import RestrictionInputScreen from './screens/RestrictionInputScreen';
import UserInputNoGoals from './screens/UserInputNoGoals';
*/
import NearestFoodScreen from './screens/NearestFoodScreen';
import DirectionScreen from './screens/DirectionScreen';

const Stack = createStackNavigator();


//Creates Navigator and navigates to home screen.  All navigation afterwards is dependent on current screen.
//-Venables
export default function App(props) {
  const isLoadingComplete = useCachedResources();

  global.DirectionName = 'Directions';

  //console.disableYellowBox = true;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UserInputGoals" component={UserInputGoals} options={{title: "Input"}}/>
            <Stack.Screen name="NearestFoodScreen" component={NearestFoodScreen} options={{title: "Closest Location"}} />
            <Stack.Screen name="DirectionScreen" component={DirectionScreen} options={{title: global.DirectionName}} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
