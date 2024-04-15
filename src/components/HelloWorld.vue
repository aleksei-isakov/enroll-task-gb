<template>
  <div class="main-wrapper">
    <div class="input-container">
      <label class="label" for="team-select">Выберите команду</label>
      <dx-select-box v-model="selectedTeam"
                     :items="teamOptions"
                     placeholder=""
                     id="team-select"
      />
    </div>

    <div class="input-container">
      <label class="label" for="regularity-select">Выберите регулярность</label>
      <dx-select-box v-model="selectedFrequency"
                   :items="frequencyOptions"
                   placeholder=""
                   id="regularity-select"
      >
    </dx-select-box>
    </div>

    <div class="date-input-block">

      <div class="input-container">
      <label class="label" for="date-select">Дата</label>
      <dx-date-box v-model="selectedDate"
                   type="date"
                   id="date-select"
                   :min="currentDate"
                   :acceptCustomValue="false"
                   :onValueChanged="onDateChange"
      >
      </dx-date-box>
      </div>

      <div v-if="selectedFrequency === 'Регулярно'"
           class="input-container"
      >
        <label class="label" for="day-select">День недели</label>
        <dx-select-box v-model="selectedDayOfWeek"
                     :items="dayOfWeekOptions"
                     id="day-select"
                     placeholder=""
                     :showClearButton="true"
                     :acceptCustomValue="false"
                     :valueExpr="'value'"
                     :displayExpr="'name'"
                     :onValueChanged="onDayOfWeekChange"
        >
        </dx-select-box>
      </div>

      <div class="input-container">
        <label class="label" for="time-select">Время</label>
        <input type="time"
             v-model="selectedTime"
             id="time-select"
             placeholder="Выберите время"
             @onValueChanged="onTimeChange"
        >
      </div>
    </div>

    <div>
      <dx-button text="Сохранить" @click="validateAndSave"></dx-button>
      <dx-button text="Отмена" @click="clearForm"></dx-button>
    </div>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import DxSelectBox from 'devextreme-vue/select-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxButton from 'devextreme-vue/button';
// import DxValidator, {
//   DxRequiredRule,
//   DxPatternRule
// } from 'devextreme-vue/validator';

export default {
  components: {
    DxSelectBox,
    DxDateBox,
    DxButton,
  },
  data() {
    return {
      selectedTeam: null,
      selectedFrequency: null,
      selectedDate: null,
      selectedDayOfWeek: null,
      selectedTime: null,
      currentDate: new Date(),
      teamOptions: ['Analize', 'Vacuum'],
      frequencyOptions: ['Регулярно', 'Однократно'],
      dayOfWeekOptions: [
        { name: 'Понедельник', value: 1 },
        { name: 'Вторник', value: 2 },
        { name: 'Среда', value: 3 },
        { name: 'Четверг', value: 4 },
        { name: 'Пятница', value: 5 },
        { name: 'Суббота', value: 6 },
        { name: 'Воскресенье', value: 0 }
      ]
    };
  },
  methods: {
    onDateChange(value) {
      if (value && this.selectedDayOfWeek) {
        this.selectedDayOfWeek = null;
      }
    },
    onDayOfWeekChange(value) {
      if (value && this.selectedDate) {
        this.selectedDate = null;
      }
    },
    onTimeChange() {

    },
    validateAndSave() {
      const isValid = this.selectedFrequency === 'Однократно' ? this.selectedDate && this.selectedTime : this.selectedDate && this.selectedDayOfWeek && this.selectedTime;
      isValid ? alert('Данные успешно сохранены') : alert('Неверно заполненные поля')
    },
    clearForm() {
      this.selectedFrequency = null;
      this.selectedDate = null;
      this.selectedDayOfWeek = null;
      this.selectedTime = null;
    }
  },
  computed: {
      // тут будут валидаторы //
  }
};
</script>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.date-input-block {
  display: flex;
  justify-content: space-between;
  width: 70%;
}
.input-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
}
.label {
  font-size: 13px;
  opacity: 0.7;
}
</style>