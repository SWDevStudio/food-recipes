<template>
<q-page padding  class="row column">
  <h4 class="no-margin">
    Создание рецепта
  </h4>
  <q-form>
    <q-input
      label="Название рецепта"
      v-model="recipe.name"
    />

    <div class="q-my-md">
      <span class="text-black">
        В какое время?
      </span>
      <q-option-group
        :options="Object.values(FoodTime).map(i => ({ label: i, value: i }))"
        type="checkbox"
        v-model="recipe.foodTime"
      />
    </div>
    <div class="row column q-mt-md">
      <div class="row" style="align-items: center">
        <h6 class="q-mt-none q-mb-none"> Ингредиенты </h6>
        <q-btn
          @click="onClickAddIngredient"
          :color="ThemeColor.action"
          class="q-ml-auto"
          :disable="disableAddIngredient"
        >
          Добавить ингредиент
        </q-btn>
      </div>

      <div
        v-for="(ingredient, key) in recipe.ingredients"
        :key="key"
        class="row q-gutter-sm  items-center"
      >
        <div
          v-if="key === recipe.ingredients.length - 1"
          class="col-12 q-mt-lg"
        >
          <q-checkbox
            v-model="hasNewIngredient"
            label="Это новый ингредиент!"
          />
        </div>
        <template v-if="hasNewIngredient">
          <div class="col-7">
            <q-input
              label="Укажите новый ингредиент"
              v-model="modelNewIngredient.name"
            />
          </div>
          <div class="col-12 col-md-1">
            <q-btn
              class="full-width"
              @click="onCreateIngredient"
              :color="ThemeColor.action"
            >
              Создать
            </q-btn>
          </div>
        </template>
        <template v-else>
          <div class="col-7">
            <q-select
              label="Укажите ингредиент"
              v-model="recipe.ingredients[key]"
              :options="ingredientSuggests"
              option-label="name"
              option-value="name"
              use-input
              @filter="ingredientFilterFn"
            />
          </div>
          <div class="col-1">
            <q-input
              label="Кол-во"
              v-model.number="recipe.ingredients[key].measurementValue"
            />
          </div>
          <div class="col-12 col-md-1">
            <q-select
              label="Мера веса"
              v-model="recipe.ingredients[key].measurement"
              option-label="measurement"
              option-value="measurement"
              :options="Object.values(UnitMeasurement)"
            />
          </div>
        </template>

        <div class="col-12 col-md-1">
          <q-btn
            class="full-width"
            color="red"
            @click="onClickRemoveIngredient(ingredient)"
          >
            Удалить
          </q-btn>
        </div>
      </div>
    </div>
    <div class="row column q-mt-lg">
      <div class="row col-12 ">
        <h5 class="no-margin"> Шаги </h5>
        <q-btn
          class="q-ml-auto q-mt-none q-mb-none"
          :color="ThemeColor.action"
          @click="addRecipeStep"
          :disable="!newStep.description.length"
        >
          Добавить шаг
        </q-btn>
      </div>

      <div class="row q-gutter-sm items-center">
        <div
          v-for="(step, key) in recipe.steps"
          :key="key"
          class="col-12"
        >
          <div class="text-h6 row q-mt-md">
            Шаг {{ key + 1 }}
            <q-btn
              color="red q-ml-auto"
              @click="removeStep(step)"
            >
              Удалить
            </q-btn>
          </div>
          <div> {{ step.description }} </div>
        </div>
      </div>
      <div class="row q-gutter-sm items-center">
        <div class="col-12">
          <q-input
            v-model="newStep.description"
            type="textarea"
            label="Укажите описание шага"
          />
        </div>
      </div>
    </div>
  </q-form>

  <q-btn
    :color="ThemeColor.action"
    class="q-mt-auto"
    @click="onClickAddRecipe"
  >
    Добавить рецепт
  </q-btn>
</q-page>
</template>

<script setup lang="ts">

import {computed, Ref, ref} from 'vue';
import {Recipe, RecipeStep} from 'assets/class/Recipe';
import {useIngredientStore} from 'stores/ingredient-store';
import {UnitMeasurement} from 'assets/enum/UnitMeasurement';
import {Ingredient} from 'assets/class/Ingredient';
import {FoodTime} from 'assets/enum/FoodTime';
import {ThemeColor} from 'assets/enum/ThemeColor';
import {useRecipeStore} from 'stores/recipe-store';

const ingredientStore = useIngredientStore()
const recipeStore = useRecipeStore()

const recipe = ref(new Recipe())

const filterString = ref('')

const newStep: Ref<RecipeStep> = ref({
  description: ''
})

const hasNewIngredient = ref(false)
const modelNewIngredient = ref(new Ingredient())

function addRecipeStep() {
  recipe.value.steps.push(JSON.parse(JSON.stringify(newStep.value)))
  newStep.value.description = ''
}

const ingredientSuggests = computed(() => {
  if (!filterString.value) return JSON.parse(JSON.stringify(ingredientStore.ingredients))
  return JSON.parse(JSON.stringify(ingredientStore.ingredients.filter(i => i.name.includes(filterString.value))))
})

const disableAddIngredient = computed(() => {
  if (!recipe.value.ingredients.length) return false
  return  !recipe.value.ingredients[recipe.value.ingredients.length - 1]?.name
})


function ingredientFilterFn(val: string, update: any) { update(() => { filterString.value = val }) }
const onClickAddIngredient = () => recipe.value.addIngredient()
function onClickRemoveIngredient(ingredient: Ingredient) {
  recipe.value.ingredients = recipe.value.ingredients.filter(i => i.name !== ingredient.name)
  onCloseNewIngredientForm()
}

function removeStep(step: RecipeStep) {
  recipe.value.steps = recipe.value.steps.filter(i => i.description !== step.description)
}

function onCloseNewIngredientForm() {
  hasNewIngredient.value = false
  modelNewIngredient.value = new Ingredient()
}

function onCreateIngredient() {
  ingredientStore.addIngredient(modelNewIngredient.value)
  recipe.value.ingredients[recipe.value.ingredients.length - 1] = JSON.parse(JSON.stringify(modelNewIngredient.value))
  onCloseNewIngredientForm()
}

function onClickAddRecipe() {
  recipeStore.addRecipe(recipe.value)
  // window.location.reload()
}
</script>

<style scoped>

</style>
