import {Ingredient} from 'assets/class/Ingredient';
import {FoodTime} from 'assets/enum/FoodTime';

export class Recipe {
  name!: string

  steps!: RecipeStep[]

  ingredients!: Ingredient[]

  uid!: number

  foodTime!: FoodTime[]

  constructor(
    name?: string,
    steps?: RecipeStep[],
    ingredients?: Ingredient[],
    foodTime?: FoodTime[]
  ) {
    this.name = name || ''
    this.steps = steps || []
    this.ingredients = ingredients || []
    this.uid = new Date().getTime()
    this.foodTime = foodTime || [FoodTime.BREAKFAST]
  }

  addIngredient() {
    this.ingredients.push(new Ingredient())
  }
}


export interface RecipeStep {
  description: string
}
