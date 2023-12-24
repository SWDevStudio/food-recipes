<template>
<q-page padding>
  <h4 class="no-margin">
    Мои рецепты
  </h4>
  <div
    v-if="recipeStore.recipes.length"
    class="row"
  >
    <div
      class="col-lg-3 col-6 q-pa-md"
      v-for="recipe in recipeStore.recipes"
      :key="recipe.uid"
    >
      <q-card class="row column full-height">
        <q-card-section>
          <div class="text-h6">
            {{ recipe.name }}
          </div>
          <div >
            <div class="text-bold text-body1">Ингредиенты</div>
            <div
              v-for="item in recipe.ingredients"
              :key="item.name"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            v-if="recipe.steps.length"
            class="q-mt-sm"
          >
            <div class="text-bold text-body1">Шаги</div>
            <div
              v-for="item in recipe.steps"
              :key="item.description"
            >
              {{ item.description }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions vertical class="q-mt-auto">
          <q-btn
            :color="ThemeColor.action"
            @click="recipeStore.removeRecipe(recipe)"
          >
            Удалить
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>

  </div>
  <div v-else class="text-red">
    У вас пока нет рецептов, добавьте их!
  </div>
</q-page>
</template>

<script setup lang="ts">
import {useRecipeStore} from 'stores/recipe-store';
import {ThemeColor} from 'assets/enum/ThemeColor';

const recipeStore = useRecipeStore()
</script>

<style scoped>

</style>
