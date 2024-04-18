/* eslint-disable */
<template>
  <dx-form id="vacuum-planing-form"
           @initialized="onFormInit"
           @field-data-changed="formFieldDataChanged"
  >
    <dx-group-item :col-count="1">
      <dx-simple-item
        :name="FORM_ITEM_NAMES.COMMAND_TYPE"
        :data-field="FORM_ITEM_NAMES.COMMAND_TYPE"
        editor-type="dxSelectBox"
        width="100%"
        :is-required="true"
        :editor-options="selectBoxOptionsCT"
      >
        <dx-label :text="lexemes.choiceCommand" />
      </dx-simple-item>
      <dx-simple-item
        :name="FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE"
        :data-field="FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE"
        editor-type="dxSelectBox"
        width="100%"
        :is-required="true"
        :editor-options="selectBoxOptionsLaunchDate"
      >
        <dx-label :text="lexemes.choiceData" />
      </dx-simple-item>
    </dx-group-item>
    <dx-group-item :name="FORM_ITEM_NAMES.TIME_DATE_GROUP" :col-count="2" :visible="true">
      <dx-simple-item
        :name="FORM_ITEM_NAMES.LAUNCH_DATE"
        :data-field="FORM_ITEM_NAMES.LAUNCH_DATE"
        editor-type="dxDateBox"
        :visible="true"
        :is-required="true"
        :accept-custom-value="true"
        :editor-options="dateBoxOptionsDate"
      >
        <dx-label location="left" :text="lexemes.date" />
      </dx-simple-item>
      <dx-simple-item
        :name="FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM"
        :data-field="FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM"
        editor-type="dxTextBox"
        :visible="false"
        :is-required="true"
        :editor-options="dateBoxOptionsDateCustom"
      >
        <dx-pattern-rule :pattern="dateRegexp" :message="lexemes.dateValidationMessage" />
        <dx-label location="left" :text="lexemes.date" />
      </dx-simple-item>
      <dx-simple-item
        :name="FORM_ITEM_NAMES.LAUNCH_WEEK"
        :data-field="FORM_ITEM_NAMES.LAUNCH_WEEK"
        editor-type="dxDropDownBox"
        :visible="false"
        :is-required="true"
        :editor-options="dropBoxOptionsLaunchWeek"
      >
        <dx-label location="left" :text="lexemes.weekDay" />
      </dx-simple-item>
      <dx-simple-item
        :name="FORM_ITEM_NAMES.LAUNCH_TIME"
        :data-field="FORM_ITEM_NAMES.LAUNCH_TIME"
        editor-type="dxDateBox"
        :is-required="true"
        :editor-options="selectBoxOptionsLaunchTime"
      >
        <dx-label location="left" :text="lexemes.time" />
      </dx-simple-item>
    </dx-group-item>
  </dx-form>
</template>

<script>
import { DxForm, DxGroupItem, DxLabel, DxPatternRule, DxSimpleItem } from "devextreme-vue/form";
import {
  dateRegexp,
  FORM_ITEM_NAMES,
  timeRegexp,
  COMMAND,
  VACUUM_COMMAND_LIST,
  VACUUM_LAUNCH,
  VACUUM_LAUNCH_LIST,
  WEEK_ANY_DAY,
} from "./constants";
import Vue from "vue";
import { WeekList } from "../../../../ui-kit";
import lexemes from "../../../../../lexemes/lexemes.json";
import { weekDays } from "../../../../ui-kit/WeekListTeplate/WeekList";
import { isEqual } from "lodash";
import { dateDestruction } from "./PopupFormService";

export default {
  name: "PopupForm",
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxPatternRule,
    DxLabel,
  },
  data() {
    return {
      weekListInst: null,
      formInst: null,
      dateRegexp,
      timeRegexp,
      lexemes: lexemes.monitoring.vacuum.popup,
      lexemesRuleText: lexemes.monitoring.ruleMessage,
      FORM_ITEM_NAMES,
      selectBoxOptionsCT: {
        items: VACUUM_COMMAND_LIST,
      },
      selectBoxOptionsLaunchDate: {
        items: VACUUM_LAUNCH_LIST,
      },
      dateBoxOptionsDate: {
        disabledDates: this.disabledDatesHandler,
        dateSerializationFormat: "yyyy-MM-dd",
        pickerType: "calendar",
        onOpened: this.onOpenedCalendar,
        applyValueMode: "useButtons",
        width: 103,
      },
      dateBoxOptionsDateCustom: {
        onValueChanged: this.changeDateText,
        width: 140,
      },
      dropBoxOptionsLaunchWeek: {
        elementAttr: {
          class: "custom-select-box custom-drop-down-box",
        },
        dropDownOptions: {
          wrapperAttr: { class: "weekDropDown" },
          onShowing: this.setSelectedWeek,
        },
        width: 100,
        items: [...weekDays, WEEK_ANY_DAY],
        displayExpr: "value",
        contentTemplate: this.dayListTemplate,
        displayValueFormatter: this.weekFormatter,
      },
      selectBoxOptionsLaunchTime: {
        width: 53,
        showDropDownButton: false,
        type: "time",
        elementAttr: {
          class: "custom-select-box",
        },
      },
    };
  },
  methods: {
    setSelectedWeek() {
      if (this.weekListInst) {
        const formWeekVal = this.getFormItemData(FORM_ITEM_NAMES.LAUNCH_WEEK);
        this.weekListInst.setSelectedItems(formWeekVal);
      } else console.debug("weekListInst not yet ready");
    },
    validateForm() {
      const { isValid } = this.formInst.validate();
      return isValid;
    },
    getSelectedCommandName() {
      return this.getFormItemData(FORM_ITEM_NAMES.COMMAND_TYPE);
    },
    resetFormVal() {
      this.formInst.resetValues();
    },
    changeDateText(event) {
      const parseDate = event.value.split(".");
      if (parseDate.length > 1) {
        parseDate.forEach((item, i) => {
          if (!isNaN(+item) && +item < 10) {
            parseDate[i] = "0" + +item;
          }
        });
        event.component.option("value", parseDate.join("."));
      }
    },
    weekFormatter(value) {
      return value.join(",");
    },
    onFormInit({ component }) {
      this.formInst = component;
      this.formInst.updateData(FORM_ITEM_NAMES.COMMAND_TYPE, COMMAND.ANALYZE);
    },
    onOpenedCalendar(e) {
      this.deleteTodayButton(e);
      this.addToolbarItemClass(e);
    },
    deleteTodayButton(e) {
      const filteredItems = e.component._popup
        .option("toolbarItems")
        .filter((item) => item.options.type !== "today");
      e.component._popup.option("toolbarItems", filteredItems);
    },
    addToolbarItemClass(e) {
      let toolbarItems = e.component._popup.option("toolbarItems");
      if (toolbarItems.length) {
        toolbarItems[0].options.elementAttr = { class: "confirm-button" };
        toolbarItems[1].options.elementAttr = { class: "cancel-button" };
        e.component._popup.option("toolbarItems", toolbarItems);
      } else console.debug("toolbarItems is empty");
    },
    disabledDatesHandler({ date }) {
      let referenceDate = new Date().setHours(0);
      referenceDate = new Date(referenceDate).setMinutes(0);
      referenceDate = new Date(referenceDate).setSeconds(0);
      let differDate = date.setHours(0);
      differDate = new Date(differDate).setMinutes(0);
      differDate = new Date(differDate).setSeconds(0);
      if (new Date(differDate).toLocaleString() === new Date(referenceDate).toLocaleString()) return false;
      else return differDate < referenceDate;
    },
    launchParamChanged(formComp, value) {
      if (value === VACUUM_LAUNCH.regular) {
        formComp.itemOption(FORM_ITEM_NAMES.TIME_DATE_GROUP, "colCount", 3);
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_WEEK}`,
          "visible",
          true,
        );
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM}`,
          "visible",
          true,
        );
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_DATE}`,
          "visible",
          false,
        );
      } else {
        formComp.itemOption(FORM_ITEM_NAMES.TIME_DATE_GROUP, "colCount", 2);
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_WEEK}`,
          "visible",
          false,
        );
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM}`,
          "visible",
          false,
        );
        formComp.itemOption(
          `${FORM_ITEM_NAMES.TIME_DATE_GROUP}.${FORM_ITEM_NAMES.LAUNCH_DATE}`,
          "visible",
          true,
        );
      }
    },
    onWeekChange(formComp) {
      const value = this.getFormItemData(FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM);
      if (value !== "*") {
        formComp.getEditor(FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM).option("value", "*");
      }
    },
    onCustomDateChange(formComp) {
      const weekValue = this.getFormItemData(FORM_ITEM_NAMES.LAUNCH_WEEK);
      const dateValue = this.getFormItemData(FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM);
      if (!weekValue || (!isEqual(weekValue[0], WEEK_ANY_DAY) && dateValue !== "*")) {
        formComp.getEditor(FORM_ITEM_NAMES.LAUNCH_WEEK).option("value", [WEEK_ANY_DAY]);
      }
    },
    formFieldDataChanged(event) {
      switch (event.dataField) {
        case FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE: {
          this.launchParamChanged(event.component, event.value);
          break;
        }
        case FORM_ITEM_NAMES.LAUNCH_WEEK: {
          this.onWeekChange(event.component);
          break;
        }
        case FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM: {
          this.onCustomDateChange(event.component);
          break;
        }
      }
    },
    getFormItemData(fieldName) {
      const formData = this.formInst.option("formData");
      if (fieldName) {
        return formData[fieldName];
      } else return formData;
    },
    getFinalFormData() {
      const formData = this.getFormItemData();
      return {
        [FORM_ITEM_NAMES.COMMAND_TYPE]: formData[FORM_ITEM_NAMES.COMMAND_TYPE].replaceAll(" ", "_"),
        [FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE]: formData[FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE],
        [FORM_ITEM_NAMES.LAUNCH_DATE]:
          formData[FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE] === VACUUM_LAUNCH.regular
            ? formData[FORM_ITEM_NAMES.LAUNCH_DATE_CUSTOM]
            : dateDestruction(formData[FORM_ITEM_NAMES.LAUNCH_DATE]),
        [FORM_ITEM_NAMES.LAUNCH_WEEK]:
          formData[FORM_ITEM_NAMES.LAUNCH_PARAMS_DATE] === VACUUM_LAUNCH.regular
            ? formData[FORM_ITEM_NAMES.LAUNCH_WEEK]
            : [],
        [FORM_ITEM_NAMES.LAUNCH_TIME]: formData[FORM_ITEM_NAMES.LAUNCH_TIME],
      };
    },
    dayListTemplate(event) {
      const WeekListClass = Vue.extend(WeekList);
      const dropDownComponent = event.component;
      const formWeekVal = this.getFormItemData(FORM_ITEM_NAMES.LAUNCH_WEEK);
      const weekListInstance = new WeekListClass({
        propsData: {
          selectedItems: formWeekVal,
          changeWeekDays: (selectedDays) => {
            dropDownComponent.option("value", selectedDays);
            dropDownComponent.close.call(dropDownComponent);
          },
          onClose: dropDownComponent.close.bind(dropDownComponent),
        },
      });
      this.weekListInst = weekListInstance;
      weekListInstance.$mount();
      return weekListInstance.$el;
    },
  },
};
</script>

<style>
.weekDropDown .dx-overlay-content.dx-popup-flex-height {
  width: 240px !important;
  height: 351px !important;
}
#vacuum-planing-form .dx-texteditor-container {
  background-color: #ffffff;
}
#vacuum-planing-form .dx-texteditor.dx-state-focused::before {
  border-bottom: none !important;
}

#vacuum-planing-form .dx-invalid.dx-texteditor.dx-editor-filled {
  border-color: #d9534f;
}
</style>
