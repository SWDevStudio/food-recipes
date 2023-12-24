import {defineStore} from 'pinia';
import {useRecipeStore} from 'stores/recipe-store';
import {FoodTime} from 'assets/enum/FoodTime';
import {Recipe} from 'assets/class/Recipe';
import {Notify} from 'quasar';
import {Ingredient} from 'assets/class/Ingredient';

export interface MenuStore {
  menu: {
    [key: string]: Recipe[],
    [FoodTime.BREAKFAST]: Recipe[],
    [FoodTime.LUNCH]: Recipe[],
    [FoodTime.DINNER]: Recipe[]
  }
}

export const useMenuStore = defineStore('menu-store',{
  persist: true,
  state: (): MenuStore => ({
    menu: {
      [FoodTime.BREAKFAST]: [],
      [FoodTime.LUNCH]: [],
      [FoodTime.DINNER]: []
    }
  }),
  actions: {
    generateStore() {
      const recipeStore = useRecipeStore()
      const foodTimes = Object.values(FoodTime)

      foodTimes.forEach(time => {
        const foodForTime = recipeStore.recipes.filter(i => i.foodTime.includes(time))
        this.menu[time] = []
        while (this.menu[time].length < 7) {
          const foodIndex = Math.ceil(Math.random() * foodForTime.length)
          this.menu[time].push(foodForTime[foodIndex - 1])
        }
      })

      Notify.create('Меню сгенерировано')
    }
  },
  getters: {
    allRecipesInMenu() {
      const arr: Recipe[] = []
      for (const key in this.menu) {
        arr.push(...this.menu[key]);
      }
      return arr
    },
    getMenuForDay(): Array<{
      [FoodTime.BREAKFAST]: Recipe,
      [FoodTime.DINNER]: Recipe,
      [FoodTime.LUNCH]: Recipe
    }> {
      const days= 7
      return Array.from(new Array(days)).map((v, key) => ({
        [FoodTime.BREAKFAST]: this.menu.breakfast[key],
        [FoodTime.LUNCH]: this.menu.lunch[key],
        [FoodTime.DINNER]: this.menu.dinner[key],
      }))
    },
    ingredientList() {
      const ingredientList: { [key: string]: Ingredient } = {}

      JSON.parse(JSON.stringify(this.allRecipesInMenu))
        .forEach((recipe: Recipe) => {
          recipe.ingredients.forEach(i => {
            if (ingredientList[i.name]) {
              ingredientList[i.name].measurementValue += +i.measurementValue
            } else {
              ingredientList[i.name] = i
            }
          })
      })

      return ingredientList
    }
  }
})
