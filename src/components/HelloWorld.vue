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

      <div class="input-container flat">
      <label class="label" for="date-select">Дата</label>
      <dx-date-box v-model="selectedDate"
                   type="date"
                   :onOpened="onDateBoxDropDownOpen"
                   id="date-select"
                   :min="currentDate"
                   :width="110"
                   :showTodayButton="false"
                   :applyValueMode="'useButtons'"
                   :acceptCustomValue="false"
                   :onValueChanged="onDateChange"
      >
      </dx-date-box>
      </div>

      <div v-if="selectedFrequency === 'Регулярно'"
           class="input-container flat"
      >
        <label class="label" for="day-select">День недели</label>
        <dx-tag-box v-model="selectedDaysOfWeek"
                     :items="dayOfWeekOptions"
                     id="day-select"
                     placeholder=""
                     :showClearButton="true"
                     :acceptCustomValue="false"
                     :showSelectionControls="true"
                     :multiTag="true"
                     :valueExpr="'name'"
                     :displayExpr="'name'"
                     :max-displayed-tags="3"
                     :multiline="false"
                     :dropDownOptions="{minWidth: 150}"
                     :onValueChanged="onDayOfWeekChange"
                     :style="'min-width: 110px'"
        >
        </dx-tag-box>
      </div>


    </div>
    <div class="input-container flat">
      <label class="label" for="time-select">Время</label>
      <input type="time"
             class="time-input"
             v-model="selectedTime"
             id="time-select"
             placeholder="Выберите время"
             @onValueChanged="onTimeChange"
      >
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
import DxTagBox from "devextreme-vue/tag-box";
// import DxValidator, {
//   DxRequiredRule,
//   DxPatternRule
// } from 'devextreme-vue/validator';

export default {
  components: {
    DxSelectBox,
    DxDateBox,
    DxButton,
    DxTagBox
  },
  data() {
    return {
      selectedTeam: null,
      selectedFrequency: null,
      selectedDate: null,
      selectedDaysOfWeek: [],
      selectedTime: null,
      currentDate: new Date(),
      teamOptions: ['Analize', 'Vacuum'],
      frequencyOptions: ['Регулярно', 'Однократно'],
      dayOfWeekOptions: [
        { name: 'Понедельник'},
        { name: 'Вторник'},
        { name: 'Среда'},
        { name: 'Четверг'},
        { name: 'Пятница'},
        { name: 'Суббота'},
        { name: 'Воскресенье'}
      ]
    };
  },
  methods: {
    onDateChange(value) {
      if (value && this.selectedDayOfWeek) {
        this.selectedDayOfWeek = null;
      }
    },
    onDayOfWeekChange(event) {
      this.selectedDaysOfWeek = event.value
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
    },
    onDateBoxDropDownOpen() {
      const todayButtons = document.querySelectorAll('.dx-button-today')
      todayButtons.forEach(el => el.style.display = 'none')
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
.time-input {
  width: 68px;
  height: 25px;
}
.flat {
  flex-direction: row;
  align-items: center;
}
</style>