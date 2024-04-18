<template>
  <div>
    <form @submit="validateAndSave">
  <dx-form @initialized="onFormInit"
           @field-data-changed="formFieldDataChanged"
           :form-data="formDataObject"
  >
    <dx-simple-item editor-type="dxSelectBox"
                  :name="formItemsTitles.teamSelectTitle"
                  :data-field="formItemsTitles.teamSelectTitle"
                  :editor-options="teamSelectBoxOptions"
                  :is-required="true"
      >
      <dx-label :text="formItemsLexemes.teamSelectName" />
    </dx-simple-item>

    <dx-simple-item editor-type="dxSelectBox"
                  :name="formItemsTitles.regularitySelectTitle"
                  :data-field="formItemsTitles.regularitySelectTitle"
                  :editor-options="regularitySelectBoxOptions"
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

      <dx-button-item
                 :button-options="submitButtonOptions"
      />
      <dx-button-item @click="clear" :button-options="submitButtonOptions2" />

  </dx-form>
    </form>
    <FunctionTest/>
  </div>
</template>

<script>
import 'devextreme/dist/css/dx.light.css';
import { DxForm, DxSimpleItem, DxLabel, DxButtonItem } from 'devextreme-vue/form';
import FunctionTest from "@/components/FunctionTest.vue";

const formItemsLexemes = {
  teamSelectName: 'Выберите команду',
  regularitySelectName: 'Выберите частоту',
  dateSelectName: 'Дата',
  timeSelectName: 'Время',
  daySelectName: 'День'
}
const formItemsTitles = {
  teamSelectTitle: 'teamSelect',
  regularitySelectTitle: 'isRegular',
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
      value: false, name: 'Однократно'
    },
    {
      value: true, name: 'Регулярно'
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

const formDataObject = {}

export default {
  components: {
    FunctionTest,
    DxForm,
    DxSimpleItem,
    DxLabel,
    DxButtonItem
  },
  data() {
    return {
      isRegularly: false,
      formItemsLexemes,
      formItemsTitles,
      formData,
      formDataObject,
      formInst: null,
      teamSelectBoxOptions: {
        items: formData.teamSelectOptions,
        displayExpr: "name",
        valueExpr: "value",
        width: '50%'
      },
      submitButtonOptions: {
        text: "Submit the Form",
        useSubmitBehavior: true
      },
      submitButtonOptions2: {
        text: "Clear the Form",
        onClick: this.clear
      },
      regularitySelectBoxOptions: {
        items: formData.regularitySelectOptions,
        displayExpr: "name",
        valueExpr: 'value',
        width: '50%',
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
  methods: {
    centerDropDownContent(e) {
      const dropDownContent = e.component.content();
      dropDownContent.style.textAlign = 'center';
    },
    onFormInit({ component }) {
      // this.formInst = component;
      // this.formInst.updateData('a', 'b');
      console.log(component, this.formInst);
    },
    onDateBoxDropDownOpen() {
      const todayButtons = document.querySelectorAll('.dx-button-today');
      todayButtons.forEach(el => el.style.display = 'none');
    },
    formFieldDataChanged(event) {

      switch (event.dataField) {
        case 'regularitySelect': this.isRegularly = event.value
      }
      this.formDataObject = event.component.option("formData")
      console.log(this.formDataObject, 'formdata', this.foraaa);
    },
    validateAndSave(e) {
      e.preventDefault()
    },
    clear() {
      this.formDataObject = {}
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