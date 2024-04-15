<template>
  <div>
    <dx-select-box v-model="selectedTeam" :items="teamOptions" placeholder="Выберите команду"></dx-select-box>
    <dx-select-box v-model="selectedFrequency" :items="frequencyOptions" placeholder="Выберите регулярность"></dx-select-box>
    <div>
      <dx-date-box v-model="selectedDate" placeholder="Выберите дату" :isValid="isValidDate"></dx-date-box>
      <dx-select-box v-model="selectedDayOfWeek" :items="dayOfWeekOptions" placeholder="Выберите день недели" :showClearButton="true" :acceptCustomValue="true" :valueExpr="'value'" :displayExpr="'name'"></dx-select-box>
    </div>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import DxDateBox from 'devextreme-vue/date-box';

export default {
  components: {
    DxSelectBox,
    DxDateBox,
  },
  data() {
    return {
      selectedTeam: null,
      selectedFrequency: null,
      selectedDate: null,
      selectedDayOfWeek: [],
      teamOptions: ['Analize', 'Vacuum'],
      frequencyOptions: ['Регулярно', 'Однократно'],
      dayOfWeekOptions: [
        { name: 'Понедельник', value: 1 },
        { name: 'Вторник', value: 2 },
        { name: 'Среда', value: 3 },
        { name: 'Четверг', value: 4 },
        { name: 'Пятница', value: 5 },
        { name: 'Суббота', value: 6 },
        { name: 'Воскресенье', value: 7 }
      ]
    };
  },
  computed: {
    isValidDate() {

      return true;
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
