<template>
  <div>
  <dx-form @initialized="onFormInit"
           @field-data-changed="formFieldDataChanged"
  >
    <dx-simple-item editor-type="dxSelectBox"
                  :name="formItemsTitles.teamSelectTitle"
                  :data-field="formItemsTitles.teamSelectTitle"
                  :editor-options="teamSelectBoxOptions"
      >
      <dx-label :text="formItemsLexemes.teamSelectName" />
    </dx-simple-item>

    <dx-simple-item editor-type="dxSelectBox"
                  :name="formItemsTitles.regularitySelectTitle"
                  :data-field="formItemsTitles.regularitySelectTitle"
                  :editor-options="regularitySelectBoxOptions"
                  :is-required="true"
    >
      <dx-label :text="formItemsLexemes.regularitySelectName" />
    </dx-simple-item>

    <dx-simple-item
      :name="formItemsTitles.dateSelectTitle"
      :data-field="formItemsTitles.dateSelectTitle"
      editor-type="dxDateBox"
      :is-required="true"
      :editor-options="dateBoxOptionsDate"
    >
      <dx-label location="left" :text="formItemsLexemes.dateSelectName" />
    </dx-simple-item>

    <dx-simple-item
      v-if="this.isRegularly"
      :name="formItemsTitles.daySelectTitle"
      :data-field="formItemsTitles.daySelectTitle"
      editor-type="dxSelectBox"
      :is-required="true"
      :editor-options="dayBoxOptions"
    >
      <dx-label location="left" :text="formItemsLexemes.daySelectName" />
    </dx-simple-item>

    <dx-simple-item
      :name="formItemsTitles.timeSelectTitle"
      :data-field="formItemsTitles.timeSelectTitle"
      editor-type="dxDateBox"
      :visible="true"
      :is-required="true"
      :accept-custom-value="true"
      :editor-options="dateBoxOptionsTime"
    >
      <dx-label location="left" :text="formItemsLexemes.timeSelectName" />
    </dx-simple-item>

<!--    <DxSimpleItem data-field="selectedFrequency"-->
<!--                  editor-type="dxSelectBox"-->
<!--                  :editor-options="frequencyEditorOptions"-->
<!--    />-->
<!--    <DxSimpleItem data-field="selectedDate" editor-type="dxDateBox" :editor-options="dateEditorOptions" />-->
<!--    <DxSimpleItem data-field="selectedDaysOfWeek" editor-type="dxTagBox" :editor-options="dayOfWeekEditorOptions" />-->
<!--    <DxSimpleItem data-field="selectedTime" editor-type="dxDateBox" :editor-options="timeEditorOptions" />-->
    <div>
      <dx-simple-item text="Сохранить" editor-type="dxButton" type="submit" @click="validateAndSave" />
      <dx-simple-item text="Отмена" @click="clearForm" />
    </div>
  </dx-form>
    <FunctionTest/>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import { DxForm, DxSimpleItem, DxLabel } from 'devextreme-vue/form';
import FunctionTest from "@/components/FunctionTest.vue";
// import DxButton from "devextreme-vue/button";

const formItemsLexemes = {
  teamSelectName: 'Выберите команду',
  regularitySelectName: 'Выберите частоту',
  dateSelectName: 'Дата',
  timeSelectName: 'Время',
  daySelectName: 'День'
}
const formItemsTitles = {
  teamSelectTitle: 'teamSelect',
  regularitySelectTitle: 'regularitySelect',
  dateSelectTitle: 'dateSelect',
  timeSelectTitle: 'timeSelect',
  daySelectTitle: 'daySelect'
}
const formData = {
  teamSelectOptions: [
    {
    value: 'vacuum', name: 'Vacuum'
    },
    {
      value: 'analize', name: 'Analize'
    }
  ],
  regularitySelectOptions: [
    {
      value: 'single', name: 'Однократно'
    },
    {
      value: 'regular', name: 'Регулярно'
    }
  ],
  daysSelectOptions: [
    { name: 'Понедельник', value: 'mon'},
    { name: 'Вторник', value: 'tue'},
    { name: 'Среда', value: 'wed'},
    { name: 'Четверг', value: 'thu'},
    { name: 'Пятница', value: 'fri'},
    { name: 'Суббота', value: 'sat'},
    { name: 'Воскресенье', value: 'sun'},
  ]
}


export default {
  components: {
    FunctionTest,
    DxForm,
    DxSimpleItem,
    DxLabel,
    // DxButton
  },
  data() {
    return {
      formItemsLexemes,
      formItemsTitles,
      formData,
      formInst: null,
      teamSelectBoxOptions: {
        items: formData.teamSelectOptions,
        displayExpr: "name",
        width: '50%'
      },
      regularitySelectBoxOptions: {
        items: formData.regularitySelectOptions,
        displayExpr: "name",
        valueExpr: 'value',
        width: '50%'
      },
      dateBoxOptionsDate: {
        width: '50%',
        min: new Date(),
        applyValueMode: "useButtons",
        acceptCustomValue: false,
        onOpened: this.onDateBoxDropDownOpen
      },
      dateBoxOptionsTime: {
        type: "time",
        width: '50%',
        applyValueMode: "useButtons",
        acceptCustomValue: false,
        elementAttr: {
          id: 'dateInput',
        },
        dropDownOptions: {
          width: 180,
          position: {
            my: 'top right',
            at: 'bottom right',
            of: '#dateInput'
          },
          onShown: this.centerDropDownContent
        }
      },
      dayBoxOptions: {
        items: formData.daysSelectOptions,
        displayExpr: "name",
        valueExpr: 'value',
        width: '50%',
        applyValueMode: "useButtons",
        acceptCustomValue: "false",
        showSelectionControls: "true",
      },
    };
  },
  // computed: {
  //   teamEditorOptions() {
  //     return { items: this.teamOptions };
  //   },
  //   frequencyEditorOptions() {
  //     return { items: this.frequencyOptions.map(option => option.name) };
  //   },
  //   dayOfWeekEditorOptions() {
  //     return {
  //       items: this.dayOfWeekOptions.map(option => option.name),
  //       showClearButton: true,
  //       acceptCustomValue: false,
  //       showSelectionControls: true,
  //       multiTag: true,
  //       valueExpr: 'name',
  //       displayExpr: 'name',
  //       maxDisplayedTags: 3,
  //       isValid: this.formData.selectedDaysOfWeek.length || this.isFieldsValid,
  //       multiline: false,
  //       applyValueMode: 'useButtons',
  //       dropDownOptions: { minWidth: 250 },
  //       style: 'min-width: 110px'
  //     };
  //   },
  //   dateEditorOptions() {
  //     return {
  //       type: 'date',
  //       onOpened: this.onDateBoxDropDownOpen,
  //       min: new Date(),
  //       width: 110,
  //       isValid: this.isFieldsValid || this.formData.selectedDate,
  //       showTodayButton: false,
  //       applyValueMode: 'useButtons',
  //       acceptCustomValue: false,
  //       onValueChanged: this.onDateChange
  //     };
  //   },
  //   timeEditorOptions() {
  //     return {
  //       type: 'time',
  //       class: 'time-input',
  //       isValid: this.formData.selectedTime || this.isFieldsValid,
  //       acceptCustomValue: false,
  //       onValueChanged: this.onTimeChange
  //     };
  //   }
  // },
  methods: {
    onDateChange(value) {
      if (value && this.formData.selectedDaysOfWeek.length) {
        this.formData.selectedDaysOfWeek = [];
      }
    },
    centerDropDownContent(e) {
      const dropDownContent = e.component.content();
      dropDownContent.style.textAlign = 'center';
    },
    onFormInit({ component }) {
      this.formInst = component;
      this.formInst.updateData('a', 'b');
      console.log(component, this.formInst);
    },
    onDateBoxDropDownOpen() {
      const todayButtons = document.querySelectorAll('.dx-button-today');
      todayButtons.forEach(el => el.style.display = 'none');
    },
    formFieldDataChanged(event) {
      console.log('formFieldChanged ' + event.dataField);
    },
    validateAndSave() {
      // Логика для сохранения данных формы
    },
    clearForm() {
      // Логика для очистки данных формы
    }
  }
};
</script>

<style scoped>
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
  width: 100px;
  height: 35px;
}

.flat {
  flex-direction: row;
  align-items: center;
}

.red-star {
  color: red;
}
</style>