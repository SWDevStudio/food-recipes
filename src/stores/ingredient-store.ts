import {defineStore} from 'pinia';
import {Ingredient} from 'assets/class/Ingredient';
import {UnitMeasurement} from 'assets/enum/UnitMeasurement';

export interface IngredientStore {
  ingredients: Ingredient[]
}

export const useIngredientStore = defineStore('ingredient-store', {
  persist: true,
  state: (): IngredientStore => ({
    ingredients: [
      new Ingredient('Молоко', UnitMeasurement.VOLUME),
      new Ingredient('Куриное мясо', UnitMeasurement.WEIGHT),
      new Ingredient('Картофель', UnitMeasurement.WEIGHT),
      new Ingredient('Манка', UnitMeasurement.WEIGHT),
      new Ingredient('Вода', UnitMeasurement.VOLUME),
      new Ingredient('Сыр', UnitMeasurement.WEIGHT),
      new Ingredient('Салат', UnitMeasurement.WEIGHT),
    ]
  }),
  actions: {
    addIngredient(ingredient: Ingredient) {
      if (!this.ingredients.find(item => item.name === ingredient.name)) {
       this.ingredients.push(ingredient)
      }
    },
    removeIngredient(ingredient: Ingredient) {
      this.ingredients = this.ingredients.filter(item => item.name !==ingredient.name )
    }
  }
})
