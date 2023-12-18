import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MResources from "@/utils/helper/resource.js";
import MEnum from "@/utils/helper/enum.js";
// component
import MBaseButton from "@/components/base/MButton/MBaseButton.vue";
import MTextInput from "@/components/base/MInput/MTextInput.vue";
import MCombobox from "@/components/base/MCombobox/MCombobox.vue";
import MCheckbox from "@/components/base/MCheckbox/MCheckbox.vue";
import MRadioButton from "@/components/base/MRadioButton/MRadioButton.vue";
import MTable from "@/components/base/MTable/MTable.vue";
import MTooltip from "@/components/base/MTooltip/MTooltip.vue";
import MDialog from "@/components/base/MDialog/MDialog.vue";
import MDatePicker from "@/components/base/MDatePicker/MDatePicker.vue";
import MToastMsg from "@/components/base/MToastMsg/MToastMsg.vue";
import MLoadButton from "@/components/base/MButton/MLoadButton.vue";

// helper
import emitter from "tiny-emitter/instance";
// directive
import clickOutSide from "@/utils/directive/click-out-side";
import ctrlS from "./utils/directive/ctrl-s";
import ctrlShiftS from "./utils/directive/ctrl-shift-s";
import ctrlN from "./utils/directive/ctrl-n";

const app = createApp(App);

// sử dụng các component cho toàn dự án
app.component("BaseButton", MBaseButton)
	.component("TextInput", MTextInput)
	.component("Combobox", MCombobox)
	.component("Checkbox", MCheckbox)
	.component("RadioButton", MRadioButton)
	.component("MTable", MTable)
	.component("Tooltip", MTooltip)
	.component("Dialog", MDialog)
	.component("DatePicker", MDatePicker)
	.component("ToastMsg", MToastMsg)
	.component("LoadButton", MLoadButton);

// Khai báo các directive
app.directive("outside", clickOutSide).directive("ctrl-s", ctrlS).directive("ctrl-shift-s", ctrlShiftS).directive("ctrl-n", ctrlN);

// sử dụng file _resources cho toàn bộ dự án
var lang = "VI"; // app sử dụng ngôn ngữ tiếng việt
app.config.globalProperties._resources = MResources[lang];
app.config.globalProperties._enum = MEnum;
app.config.globalProperties._emitter = emitter;

app.use(store).use(router);

app.mount("#app");
