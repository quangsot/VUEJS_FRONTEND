<!-- author: Trương Mạnh Quang (18/7/2023) -->
<template>
	<Dialog
		v-if="isShowDialog"
		:title="_resources.title.dialog"
		:contentDialog="customHtml"
		:type="typeDialog"
		@closeDialogPopup="handleCloseDialog"
		@answerYes="handleAnswerYes"
		@answerNo="closePopup"
		@answerCancel="
			() => {
				isShowDialog = false;
				handleFocusAgain();
			}
		"
	/>
	<div
		:key="resetKey"
		class="container-popup"
		v-ctrl-s="handleSave"
		v-ctrl-shift-s="handleSaveAndAdd"
		@keydown.esc="checkChange"
	>
		<div class="popup">
			<div class="header-popup">
				<div class="title">
					<p>
						{{
							modeOfForm == addForm
								? _resources.title.popupAddEmployeeTitle
								: modeOfForm == editForm
								? _resources.title.popupEditEmployeeTitle
								: _resources.title.popupCopyEmployeeTitle
						}}
					</p>
					<div class="checkbox">
						<Checkbox
							:contents="['Là Khách hàng', 'Là Nhà cung cấp']"
							:require="false"
							:autoChoose="false"
						/>
					</div>
				</div>
				<div class="icon-feature">
					<div class="wrapper-of-icon-question">
						<div class="question-grey-icon"></div>
						<div class="wrapper-tooltip-question">
							<Tooltip
								:content="_resources.feature.guide"
								:position="_resources.tooltip.position.top"
							/>
						</div>
					</div>
					<div
						@click="checkChange"
						class="wrapper-of-icon-cancel"
					>
						<div class="cancel-big-icon"></div>
						<div class="wrapper-tooltip-cancel">
							<Tooltip
								:content="_resources.feature.exit"
								:position="_resources.tooltip.position.top"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="top-body-popup">
				<div class="top-body-left">
					<div class="code-name-input">
						<div class="code">
							<TextInput
								ref="codeInput"
								:isFocus="true"
								:tabIndex="_enum.tabIndex.code"
								:title="_resources.titleForm.code"
								:require="true"
								:errorMode="true"
								:errorText="_resources.tooltip.error.errorCode"
								v-model="employee.EmployeeCode"
							/>
						</div>
						<div class="name">
							<TextInput
								:tabIndex="_enum.tabIndex.fullName"
								:maxLen="_enum.typeInput.name"
								:title="_resources.titleForm.name"
								:require="true"
								:errorMode="true"
								:errorText="_resources.tooltip.error.errorName"
								v-model="employee.FullName"
							/>
						</div>
					</div>
					<div class="unit">
						<Combobox
							:tabIndex="_enum.tabIndex.department"
							:title="_resources.titleForm.department"
							:require="true"
							:display="department.name"
							:valueCombobox="department.id"
							typeValue="guid"
							:readOnly="false"
							:errorMode="true"
							:errorText="_resources.tooltip.error.errorDepartment"
							v-model="employee.DepartmentId"
						/>
					</div>
					<div class="job-title">
						<Combobox
							:tabIndex="_enum.tabIndex.position"
							:title="_resources.titleForm.position"
							:require="true"
							:display="position.name"
							:valueCombobox="position.id"
							typeValue="guid"
							:readOnly="false"
							:errorMode="true"
							:errorText="_resources.tooltip.error.errorPosition"
							v-model="employee.PositionId"
						/>
					</div>
				</div>
				<div class="top-body-right">
					<div class="birthday-gender">
						<div class="date-of-birth">
							<DatePicker
								:tabIndex="_enum.tabIndex.dateOfBirth"
								:title="_resources.titleForm.dateOfBirth"
								:require="false"
								v-model="employee.DateOfBirth"
							/>
						</div>
						<div class="gender">
							<RadioButton
								:title="_resources.titleForm.gender"
								:listItem="_enum.genderName"
								v-model="employee.Gender"
								:tabIndex="_enum.tabIndex.gender"
							/>
						</div>
					</div>
					<div class="citizen-identification">
						<div class="identification">
							<TextInput
								:tabIndex="_enum.tabIndex.identityNumber"
								:type="_enum.typeInput.number"
								:title="_resources.titleForm.identityNumber"
								:explainTitle="_resources.explainTitle.identityNumber"
								:require="false"
								:placeholder="_resources.placeholder.identityNumber"
								v-model="employee.IdentityNumber"
							/>
						</div>
						<div class="date-provider">
							<DatePicker
								:tabIndex="_enum.tabIndex.identityDate"
								:title="_resources.titleForm.identityDate"
								:require="false"
								v-model="employee.IdentityDate"
							/>
						</div>
					</div>
					<div class="provider">
						<div class="place-provider">
							<TextInput
								:tabIndex="_enum.tabIndex.identityPlace"
								:title="_resources.titleForm.identityPlace"
								:placeholder="_resources.placeholder.identityPlace"
								v-model="employee.IdentityPlace"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom-body-popup">
				<div class="address">
					<TextInput
						:tabIndex="_enum.tabIndex.address"
						:title="_resources.titleForm.address"
						:require="false"
						:placeholder="_resources.placeholder.address"
						v-model="employee.Address"
					/>
				</div>
				<div class="other-info">
					<div class="phone">
						<TextInput
							:tabIndex="_enum.tabIndex.phoneNumber"
							:type="_enum.typeInput.number"
							:maxLen="_resources.length.max.phoneNumber"
							:title="_resources.titleForm.phoneNumber"
							:explainTitle="_resources.explainTitle.phoneNumber"
							:placeholder="_resources.placeholder.phoneNumber"
							:require="false"
							v-model="employee.PhoneNumber"
						/>
						<TextInput
							:tabIndex="_enum.tabIndex.landlinePhone"
							:type="_enum.typeInput.number"
							:maxLen="_resources.length.max.landlinePhone"
							:title="_resources.titleForm.landlinePhone"
							:explainTitle="_resources.explainTitle.landlinePhone"
							:placeholder="_resources.placeholder.landlinePhone"
							:require="false"
							v-model="employee.LandlinePhone"
						/>
						<TextInput
							:tabIndex="_enum.tabIndex.email"
							:title="_resources.titleForm.email"
							:placeholder="_resources.placeholder.email"
							:require="false"
							v-model="employee.Email"
						/>
					</div>
					<div class="bank">
						<TextInput
							:tabIndex="_enum.tabIndex.bankAccount"
							:type="_enum.typeInput.number"
							:maxLen="_resources.length.max.bankAccount"
							:title="_resources.titleForm.bankAccount"
							:placeholder="_resources.placeholder.bankAccount"
							:require="false"
							v-model="employee.BankAccount"
						/>
						<TextInput
							:tabIndex="_enum.tabIndex.bankName"
							:title="_resources.titleForm.bankName"
							:placeholder="_resources.placeholder.bankName"
							:require="false"
							v-model="employee.BankName"
						/>
						<TextInput
							:tabIndex="_enum.tabIndex.bankAddress"
							:title="_resources.titleForm.bankAddress"
							:placeholder="_resources.placeholder.bankAddress"
							:require="false"
							v-model="employee.BankAddress"
						/>
					</div>
				</div>
			</div>
			<div class="footer-popup">
				<div class="left-footer">
					<BaseButton
						:tabIndex="21"
						@click="closePopup"
						:text="_resources.feature.cancel"
						:class="_resources.typeButton.extraButton"
						@keydown.tab.prevent="handleFocusAgain"
					/>
				</div>
				<div class="right-footer">
					<div class="save-btn">
						<LoadButton v-if="isSaving" />
						<!-- @click="handleSave" -->
						<BaseButton
							v-if="!isSaving"
							:tabIndex="20"
							@click="handleSave"
							@keydown.enter.exact.prevent="handleSave"
							:text="_resources.feature.save"
							:class="_resources.typeButton.extraButton"
						/>
						<!-- v-if="isSaving" -->
						<div class="tooltip-save">
							<Tooltip
								:content="_resources.feature.ctrlS"
								:position="_resources.tooltip.position.top"
							/>
						</div>
					</div>
					<div class="save-add-btn">
						<LoadButton v-if="isSaveAndAdding" />
						<BaseButton
							v-if="!isSaveAndAdding"
							:tabIndex="19"
							@click="handleSaveAndAdd"
							@keydown.enter.exact.prevent="handleSaveAndAdd"
							:text="_resources.feature.saveAndAdd"
							:class="_resources.typeButton.main"
						/>
						<div class="tooltip-save-add">
							<Tooltip
								:content="_resources.feature.ctrlShiftS"
								:position="_resources.tooltip.position.top"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watch, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import baseApi from "@/service/api/base-api";
import { HttpStatusCode } from "axios";
import { getCurrentInstance } from "vue";
import deepCompare from "@/utils/helper/deep-compare.js";
// lấy biến global
const app = getCurrentInstance();
const _resources = app.appContext.config.globalProperties._resources;
const _enum = app.appContext.config.globalProperties._enum;

const store = useStore();
const emit = defineEmits(["closePopup", "renderTableAgain", "showToastMsg"]);
const props = defineProps(["modelValue", "formMode"]);
// các loại form
const editForm = _enum.action.Edit;
const addForm = _enum.action.Add;
const copyForm = _enum.action.Copy;
// trạng thái của form: thêm, sửa, nhân bản
let modeOfForm = ref(props.formMode);
let employee = reactive({});

const codeInput = ref(null);
/**
 * hàm focus lại
 * author: Trương Mạnh Quang (28/8/2023)
 */
const handleFocusAgain = () => {
	return codeInput.value.handleFocusInput();
};
// thông tin của phòng ban
var department = reactive({
	id: [],
	name: [],
});

// thông tin của chức danh
var position = reactive({
	id: [],
	name: [],
});
// lưu lại thông tin nhân viên cũ
let oldEmployee = {};
//=== created ===//
const created = async () => {
	// debugger;
	// gán giá trị của modelValue cho employee
	if (props.modelValue) {
		employee = reactive({ ...props.modelValue });
		console.log(employee);
	}
	// lấy thông tin phòng ban
	let dep = store.getters.getDepartment;
	dep.forEach((element) => {
		department.id.push(element.DepartmentId);
		department.name.push(element.DepartmentName);
	});
	// lấy thông tin chức danh
	let pos = store.getters.getPosition;
	pos.forEach((element) => {
		position.id.push(element.PositionId);
		position.name.push(element.PositionName);
	});
};
created();
/**
 * hàm lấy mã mới
 * author: Trương Mạnh Quang (23/8/2023)
 */
const getNewCode = async () => {
	// lấy mã mới
	let uniqueCode = await baseApi.getNewCode();
	employee["EmployeeCode"] = uniqueCode.data;
};
const getNextCode = async () => {
	// lấy mã mới cho nhân viên được copy
	let nextCode = await baseApi.getNextCode(employee["EmployeeCode"]);
	employee["EmployeeCode"] = nextCode.data;
};
onBeforeMount(async () => {
	try {
		if (modeOfForm.value == addForm) {
			await getNewCode();
		} else if (modeOfForm.value == copyForm) {
			await getNextCode();
		}
	} catch (error) {
		// để người dùng tự nhập
		employee["EmployeeCode"] = "";
		let userMsg = error.response?.data?.UserMessage || _resources.errorApp;
		if (typeof userMsg === "string") errorList.value = [userMsg];
		else errorList.value = [...userMsg];
		// hiển thị dialog error
		showDialog(errorList.value, _enum.typeDialog.notice);
	}

	// copy lại nhân viên ban đầu
	if (modeOfForm.value == addForm || modeOfForm.value == editForm) oldEmployee = { ...employee };
});

let errorList = ref([]); // biến chứa danh sách lỗi của user

let isShowDialog = ref(false);
let customHtml = ref("");
let typeDialog = ref("");
/**
 * hàm đóng popup
 * author: Trương Mạnh Quang (19/7/2023)
 */
const closePopup = () => {
	if (numEmployeeAdded > 0) emit("renderTableAgain"); // render lại table trước khi đóng popup nếu thực hiện cất và thêm
	emit("closePopup");
};
/**
 * hàm kiểm tra thay đổi trước khi đóng form
 * author: Trương Mạnh Quang (30/8/2023)
 */
const checkChange = () => {
	if (!deepCompare(oldEmployee, employee)) {
		errorList.value = [_resources.notice.notChangeData];
		showDialog(errorList.value, _enum.typeDialog.notice_confirm);
		errorList.value = [];
	} else {
		if (numEmployeeAdded > 0) emit("renderTableAgain"); // render lại table trước khi đóng popup nếu thực hiện cất và thêm
		emit("closePopup");
	}
};
/**
 * hàm sử lý xác nhận yes của người dùng
 * author: Trương Mạnh Quang (29/8/2023)
 */
const handleAnswerYes = () => {
	handleCloseDialog();
	handleSave();
};
/**
 * hàm hiển thị dialog lỗi
 * author: Trương Mạnh Quang (21/7/2023)
 * sửa lại thông báo: thêm param html và type
 * editer: Trương Mạnh Quang (24/7/2023)
 *
 * @param {*} html danh sách thông báo
 * @param {*} type kiểu thông báo
 */
const showDialog = (html, type) => {
	if (html.length > 0) {
		let htmlText = "";
		html.forEach((el) => {
			htmlText += `<p>${el}</p>`;
		});
		typeDialog.value = type;
		isShowDialog.value = true;
		customHtml.value = htmlText;
	}
	errorList.value = [];
};
/**
 * hàm đóng dialog lỗi
 * author: Trương Mạnh Quang (21/7/2023)
 */
const handleCloseDialog = () => {
	isShowDialog.value = false;
	errorList.value = [];
	customHtml.value = "";
};

let resetKey = ref(0); // biến reset form

/**
 * hàm xử lý lỗi nhập liệu
 * author: Trương Mạnh Quang (21/7/2023)
 */
const handleErrorBeforeCallApi = () => {
	errorList.value = [];
	if (!employee.EmployeeCode) errorList.value.push(_resources.tooltip.error.errorCode);
	if (!employee.FullName) errorList.value.push(_resources.tooltip.error.errorName);
	if (!employee.DepartmentId) errorList.value.push(_resources.tooltip.error.errorDepartment);
	if (!employee.PositionId) errorList.value.push(_resources.tooltip.error.errorPosition);

	/**
	 * hàm kiểm tra ngày lớn hơn ngày hiện tại không
	 * author: Trương Mạnh Quang (9/9/2023)
	 */
	const isDateGreaterNow = (date) => {
		const enteredDate = new Date(date);
		const currentDate = new Date();
		return enteredDate > currentDate;
	};

	if (isDateGreaterNow(employee.DateOfBirth)) errorList.value.push(_resources.tooltip.error.errorDateOfBirthGreaterNow);
	if (isDateGreaterNow(employee.IdentityDate)) errorList.value.push(_resources.tooltip.error.errorIdentityDateGreaterNow);
};
/**
 * hàm xử lý khi api bị lỗi
 * @param {*} error đối tượng lỗi
 */
const handleErrorAfterCallApi = (error) => {
	let userMsg = error.response?.data?.UserMessage || [_resources.errorApp];
	errorList.value = [...userMsg];
	// hiển thị dialog error
	showDialog(errorList.value, _enum.typeDialog.notice);
	errorList.value = [];
	// show toast msg
	if (modeOfForm.value == addForm || modeOfForm.value == copyForm) {
		emit("showToastMsg", addForm, _resources.actionStatus.fail);
	} else if (modeOfForm.value == editForm) {
		emit("showToastMsg", editForm, _resources.actionStatus.fail);
	}
};

let isSaving = ref(false);
/**
 * hàm thực hiện lưu nhân viên
 * author: Trương Mạnh Quang (21/7/2023)
 */
const handleSave = async () => {
	try {
		// debugger;
		isSaving.value = true;
		//check lỗi bỏ trống
		handleErrorBeforeCallApi();
		if (errorList.value.length > 0) {
			if (isShowDialog.value) isShowDialog.value = false;
			showDialog(errorList.value, _enum.typeDialog.notice);
			errorList.value = [];
			isSaving.value = false;
			return;
		}
		if (!deepCompare(employee, oldEmployee)) {
			//thực hiện lưu
			if (modeOfForm.value == addForm || modeOfForm.value == copyForm) {
				// call api lưu nhân viên
				debugger;
				await baseApi.insertEmployee(employee);
				// show toast msg
				emit("showToastMsg", addForm, _resources.actionStatus.success);
			} else if (modeOfForm.value == editForm) {
				// call api sửa nhân viên
				await baseApi.editEmployee(employee);
				emit("showToastMsg", editForm, _resources.actionStatus.success);
			}
			isSaving.value = false;
			// render lại bảng
			emit("renderTableAgain");
			//đóng popup
			emit("closePopup");
		} else {
			isSaving.value = false;
			// show toast cảnh báo
			emit("showToastMsg", editForm, _resources.actionStatus.warn);
			return;
		}
	} catch (error) {
		isSaving.value = false;
		// xử lý lỗi
		console.log(error);
		handleErrorAfterCallApi(error);
	}
};

let numEmployeeAdded = 0; // số lượng nhân viên được lưu sau khi cất và thêm
let isSaveAndAdding = ref(false);
/**
 * hàm thực hiên lưu và thêm nhân viên
 * author: Trương Mạnh Quang (26/7/2023)
 */
const handleSaveAndAdd = async () => {
	// thực hiện lưu và thêm
	try {
		isSaveAndAdding.value = true;
		// check lỗi bỏ trống
		handleErrorBeforeCallApi();
		if (errorList.value.length > 0) {
			if (isShowDialog.value) isShowDialog.value = false;
			showDialog(errorList.value, _enum.typeDialog.notice);
			errorList.value = [];
			isSaveAndAdding.value = false;
			return;
		}
		if (!deepCompare(employee, oldEmployee)) {
			// call Api
			if (modeOfForm.value == addForm || modeOfForm.value == copyForm) {
				// call api lưu nhân viên
				await baseApi.insertEmployee(employee);
				// show toast msg
				emit("showToastMsg", addForm, _resources.actionStatus.success);
			} else if (modeOfForm.value == editForm) {
				// call api sửa nhân viên
				await baseApi.editEmployee(employee);
				// show toast msg
				emit("showToastMsg", editForm, _resources.actionStatus.success);
			}
			// tăng số lượng nhân viên vừa lưu
			numEmployeeAdded++;
			// reset form
			modeOfForm.value = addForm;
			resetKey.value++;
			employee = reactive({});
			// lấy mã mới
			await getNewCode();
			isSaveAndAdding.value = false;
		} else {
			isSaveAndAdding.value = false;
			// show toast cảnh báo
			emit("showToastMsg", editForm, _resources.actionStatus.warn);
			return;
		}
	} catch (error) {
		isSaveAndAdding.value = false;
		console.log(error);
		// xử lý lỗi
		handleErrorAfterCallApi(error);
	}
};
</script>

<style scoped>
.container-popup {
	background-color: #00000054;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
}
.popup {
	border: none;
	border-radius: 4px;
	background-color: #fff;
	padding: 24px;
	width: 900px;
	height: auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
/* ===== Head ===== */
.popup .header-popup {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px;
}
.popup .header-popup .title {
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 12px;
}
.popup .header-popup .title p {
	font-weight: 700;
	font-size: 24px;
	color: var(--color-text-title);
}
.popup .header-popup .icon-feature {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
	position: relative;
	top: -20px;
	left: 0;
}
.popup .header-popup .icon-feature .wrapper-of-icon-question,
.popup .header-popup .icon-feature .wrapper-of-icon-cancel {
	position: relative;
	cursor: pointer;
}
.popup .header-popup .icon-feature .wrapper-of-icon-cancel .wrapper-tooltip-cancel {
	display: none;
	position: absolute;
	top: -40px;
	left: -15px;
}
.popup .header-popup .icon-feature .wrapper-of-icon-cancel:hover .wrapper-tooltip-cancel {
	display: block;
}
.popup .header-popup .icon-feature .wrapper-of-icon-question .wrapper-tooltip-question {
	display: none;
	position: absolute;
	top: -41px;
	left: -30px;
}
.popup .header-popup .icon-feature .wrapper-of-icon-question:hover .wrapper-tooltip-question {
	display: block;
}
/* ===== Body ===== */
.popup .top-body-popup {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	margin-bottom: 36px;
}
.top-body-popup .top-body-left,
.top-body-popup .top-body-right {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
}
/* .top-body-popup .top-body-right {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8px;
} */
.top-body-left .code-name-input {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 8px;
}
.top-body-left .code-name-input .code {
	flex: 1;
}
.top-body-left .code-name-input .name {
	flex: 2;
}
.top-body-right .birthday-gender {
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 16px;
}
.top-body-right .citizen-identification {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}
.top-body-right .citizen-identification .identification {
	flex: 3;
}
.top-body-right .citizen-identification .date-provider {
	flex: 2;
}
.top-body-right .provider {
	display: flex;
	justify-content: start;
	align-items: center;
}
.top-body-right .provider .place-provider {
	width: 100%;
}
.bottom-body-popup {
	margin-bottom: 32px;
}
.bottom-body-popup .address {
	margin-bottom: 8px;
}
.other-info .phone {
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 8px;
	margin-bottom: 8px;
}
.other-info .bank {
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 8px;
}
.footer-popup {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.footer-popup .right-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	position: relative;
}

.footer-popup .right-footer .tooltip-save-add {
	position: absolute;
	bottom: 46px;
	right: 5px;
	display: none;
}
.footer-popup .right-footer .tooltip-save {
	position: absolute;
	bottom: 46px;
	left: 12px;
	display: none;
}
.footer-popup .right-footer .save-btn:hover .tooltip-save {
	display: block;
}
.footer-popup .right-footer .save-add-btn:hover .tooltip-save-add {
	display: block;
}
.loader {
	border: 4px solid #f3f3f3;
	border-top: 4px solid var(--color-light-green-400);
	border-radius: 50%;
	width: 34px;
	height: 34px;
	animation: spin 2s linear infinite;
	margin-right: 8px;
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
