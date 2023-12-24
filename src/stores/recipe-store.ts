import {defineStore} from 'pinia';
import {Recipe} from 'assets/class/Recipe';
import {Notify} from 'quasar';
import {Ingredient} from 'assets/class/Ingredient';
import {UnitMeasurement} from 'assets/enum/UnitMeasurement';
import {FoodTime} from 'assets/enum/FoodTime';

export interface RecipeStore {
  recipes: Recipe[]
}

export const useRecipeStore = defineStore('recipe-store', {
  persist: true,
  state: (): RecipeStore => ({
    recipes: [
      new Recipe('Манная каша',
        [{ description: 'Офигенная манная каша' }],
        [
          new Ingredient('Молоко', UnitMeasurement.VOLUME, 100),
          new Ingredient('Манка', UnitMeasurement.VOLUME, 100),
        ],
        [FoodTime.BREAKFAST]
      ),
      new Recipe(
        'Гречневая каша',
        [{ description: 'Офигенная гречневая каша' }],
        [
          new Ingredient('Молоко', UnitMeasurement.VOLUME, 100),
          new Ingredient('Гречка', UnitMeasurement.WEIGHT, 100),
        ],
        [FoodTime.BREAKFAST]
      ),
      new Recipe(
        'Борш',
        [{ description: 'Офигенный борш' }],
        [
          new Ingredient('Вода', UnitMeasurement.VOLUME, 1000),
          new Ingredient('Картофель', UnitMeasurement.WEIGHT, 100),
        ],
        [FoodTime.DINNER, FoodTime.LUNCH]
      ),
      new Recipe(
        'Харчо',
        [{ description: 'Харчо номер 1' }],
        [
          new Ingredient('Вода', UnitMeasurement.VOLUME, 500),
          new Ingredient('Картофель', UnitMeasurement.WEIGHT, 100),
          new Ingredient('Куриное мясо', UnitMeasurement.WEIGHT, 500),
        ],
        [FoodTime.DINNER, FoodTime.LUNCH]
      ),
      new Recipe(
        'Греческий салат',
        [],
        [
          new Ingredient('Салат', UnitMeasurement.WEIGHT, 100),
          new Ingredient('Сыр', UnitMeasurement.WEIGHT, 100),
        ],
        [FoodTime.DINNER]
      )
    ]
  }),
  getters: {
    getRecipe(state) {
      return (uid: number) => state.recipes.find(i => i.uid === uid)
    }
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe)
      Notify.create('Рецепт добавлен в базу')
    },
    removeRecipe(recipe: Recipe) {
      this.recipes = this.recipes.filter(i => i.uid !== recipe.uid)
      Notify.create('Рецепт удален из базы')
    }
  },
});
