<template>
<q-page padding class="row column">
  <div v-if="!menuStore.allRecipesInMenu.length">
    <div class="text-red">
      Меню не составлено, составьте его сейчас
    </div>
  </div>
  <div
    v-else
  >
    <div id="pdf-content" class="row">
      <h6 class="col-12 no-margin">Меню на неделю</h6>
      <div class="col-12 q-gutter-md row q-mt-md q-mb-md">
        <div
          v-for="(day, dKey) in menuStore.getMenuForDay"
          :key="dKey"
          class="col-auto"
        >
          <div class="text-bold">
            {{ days[dKey] }}
          </div>
          <div
            v-for="(recipe, rKey) in day"
            :key="rKey"
            class="q-mt-sm"
          >
            {{ recipe.name }}
          </div>
        </div>
      </div>


      <div class="col-12">
        <h6 class="no-margin">Список ингредиентов</h6>
        <div
          v-for="(item, key) in menuStore.ingredientList"
          :key="key"
        >
        <span class="text-bold">
          {{ item.name }}:
        </span>
          <span>
          {{ getMeasure(item) }}
        </span>
        </div>
      </div>
    </div>
    <q-btn
      class="q-mt-md"
      title="будет в будущем"
      disable
      :color="ThemeColor.action"
      @click="onClickGeneratePdf"
    >
      Сгенерировать PDF (будет в будующем)
    </q-btn>
  </div>

  <q-btn
    class="q-mt-auto"
    :color="ThemeColor.action"
    @click="onClickGenerateMenu"
  >
    {{ menuStore.allRecipesInMenu.length ? 'Обновить меню' : 'Составить меню' }}
  </q-btn>
</q-page>
</template>

<script setup lang="ts">

import {useMenuStore} from 'stores/menu-store';
import {ThemeColor} from 'assets/enum/ThemeColor';
import {Ingredient} from 'assets/class/Ingredient';
import {UnitMeasurement} from 'assets/enum/UnitMeasurement';
import { jsPDF } from 'jspdf';

const menuStore = useMenuStore()

const days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]

function getMeasure(ingredient: Ingredient) {
  const convertedMeasure = ingredient.measurementValue / 1000
  return `${convertedMeasure} ${ingredient.measurement === UnitMeasurement.VOLUME ? 'л.' : 'кг.'}`
}

function onClickGeneratePdf() {
 const pdfBlock: HTMLElement | null = document.querySelector('#pdf-content')
  if (pdfBlock) {
    const doc = new jsPDF('p', 'pt', 'a4')
    doc.html(pdfBlock ,{
      filename: 'test',
      fontFaces: [{
          family: 'sans-serif',
          src: [

          ]
      }],
      callback: doc => doc.save(),
      x: 10,
      y: 10
    })
  }
}

function onClickGenerateMenu() {
  menuStore.generateStore()
}
</script>

<style scoped>

</style>
