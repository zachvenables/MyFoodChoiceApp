

export default class User {
	constructor(){
		this.weight = 0;
		this.height = 0;
		this.age = 0;
		this.goals = null;
		this.mealPlan = null;
		this.restrictions = null;
	}

	getWeight(){
		return this.weight;
	}

	updateWeight(newWeight){
		this.weight = newWeight;	
	}

	getHeight(){
		return this.height;
	}

	getGoals(){
		return this.goals;	
	}

	updateGoals(newGoals){
		this.goals = newGoals;
	}

	getMealPlan(){
		return this.mealPlan;
	}

	updateMealPlan(newPlan){
		this.mealPlan = newPlan;
	}

	getRestrictions(){
		return this.restrictions;
	}

	updateRestrictions(newRestrictions){
		this.restrictions = newRestrictions;
	}
	
}