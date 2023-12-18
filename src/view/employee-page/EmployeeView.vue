<!-- author: Trương Mạnh Quang (15/07/2023) -->

<template>
	<Dialog
		ref="dialog"
		v-if="isShowDialog"
		:type="typeDialog"
		:title="_resources.title.dialog"
		:contentDialog="customHtml"
		@closeDialogPopup="() => (isShowDialog = false)"
		@answerYes="handleConfirm"
		@answerNo="isShowDialog = false"
		@answerCancel="isShowDialog = false"
	/>
	<ToastMsg
		v-if="isShowToast"
		:notify="notify"
		@closeToastMsg="handleCloseToastMsg"
	/>
	<MPopupForEmployee
		v-if="isShowForm"
		:formMode="action"
		v-model="employeeForForm"
		@closePopup="closePopupEmployee"
		@renderTableAgain="handleRenderTableAgain"
		@showToastMsg="showToast"
	/>
	<div class="container">
		<div class="title">
			<p>{{ _resources.title.pageEmployeeTitle }}</p>
			<div class="btn-add">
				<BaseButton
					@click="() => (isShowForm = true)"
					:text="_resources.feature.addEmployee"
					:class="_resources.typeButton.main"
				/>
			</div>
		</div>
		<div class="content-table">
			<div class="head-table">
				<div class="left-feature">
					<div
						v-if="lengthIds > 0"
						class="wrapper-left-feature"
					>
						<p>
							{{ _resources.feature.selected }} <strong>{{ lengthIds }}</strong>
						</p>
						<p
							@click="tableEmployee.resetIdsDelete()"
							class="text-red pointer hover-underline"
						>
							{{ _resources.feature.unSelected }}
						</p>
						<div class="delete-feature">
							<BaseButton
								@click="handleClickDeleteIds"
								:text="_resources.feature.delete"
								:class="_resources.typeButton.deleteMulti"
							/>
						</div>
					</div>
				</div>
				<div class="right-feature">
					<div class="search-box">
						<TextInput
							:placeholder="_resources.placeholder.searchByCodeAndNameEmployee"
							:errorMode="false"
							iconClass="search-grey-icon"
							:require="false"
							:isFocus="false"
							class="width-320"
							v-model="searchKey"
							@enter="handleSearch"
							@clickIcon="handleSearch"
						/>
						<div
							@click="handleCancelSearch"
							v-if="isCancelSearch"
							class="cancel-search"
						>
							<div class="cancel-small-icon"></div>
						</div>
					</div>
					<div
						@click="getEmployees()"
						class="reload"
					>
						<div class="reload-icon"></div>
						<div class="tooltip-reload-wrapper">
							<Tooltip
								:content="_resources.feature.reload"
								:position="_resources.tooltip.position.bottom"
							/>
						</div>
					</div>
					<div class="excel-wrapper">
						<div
							v-if="!store.state.isLoadingExcel"
							@click="handleExportExcel"
							class="excel-icon pointer"
						></div>
						<div v-if="store.state.isLoadingExcel">
							<div class="loading" />
						</div>
						<div class="tooltip-excel-wrapper">
							<Tooltip
								:content="_resources.feature.exportExcel"
								:position="_resources.tooltip.position.bottom"
							/>
						</div>
					</div>
				</div>
			</div>
			<MTable
				ref="tableEmployee"
				:isCheckbox="true"
				:listTitle="listHeadTable"
				:listRow="listEmployee"
				:pageSize="[10, 20, 30, 50, 100]"
				v-model="lengthIds"
				@clickEdit="handleClickEditRow"
				@clickCopy="handleClickCopyRow"
				@clickDelete="handleClickDeleteRow"
				@renderTableAgain="getEmployees()"
				@deleteIds="handleDeleteIds"
			/>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, reactive, getCurrentInstance, computed, watch, h } from "vue";
import MPopupForEmployee from "@/view/employee-page/MPopupForEmployee.vue";
import Loader from "@/components/base/MLoader/MLoader.vue";
import { useStore } from "vuex";
import baseApi from "@/service/api/base-api.js";

// lấy biến global
const app = getCurrentInstance();
const _resources = app.appContext.config.globalProperties._resources;
const _enum = app.appContext.config.globalProperties._enum;

const store = useStore();
let isShowForm = ref(false);
let isShowToast = ref(false);
let notify = reactive({});

let statusSuccess = _resources.actionStatus.success;
let statusFail = _resources.actionStatus.fail;
let statusWarn = _resources.actionStatus.warn;
let actionAdd = _enum.action.Add;
let actionEdit = _enum.action.Edit;
let actionDelete = _enum.action.Delete;
let listHeadTable = [
	// [<Object property>,<Header Name>,<style css>, <text tooltip explace>, <callback format>]
	[_resources.tableHeader.property.employeeCode, _resources.tableHeader.employeeCode, `${_resources.cssColumnTable.text} min-w-120`],
	[_resources.tableHeader.property.fullName, _resources.tableHeader.employeeName, `${_resources.cssColumnTable.text} min-w-150 width-fitcontent`],
	[_resources.tableHeader.property.genderName, _resources.tableHeader.gender, `${_resources.cssColumnTable.text} min-w-100`],
	[_resources.tableHeader.property.dateOfBirth, _resources.tableHeader.dateOfBirth, `${_resources.cssColumnTable.date} min-w-100`],
	[
		_resources.tableHeader.property.identityNumber,
		_resources.tableHeader.citizenIdentification,
		`${_resources.cssColumnTable.text} min-w-100`,
		_resources.explainTitle.identityNumber,
	],
	[_resources.tableHeader.property.positionName, _resources.tableHeader.jobTitle, `${_resources.cssColumnTable.text} min-w-120`],
	[_resources.tableHeader.property.departmentName, _resources.tableHeader.unitName, `${_resources.cssColumnTable.text} min-w-120`],
	[_resources.tableHeader.property.bankAccount, _resources.tableHeader.accountNumber, `${_resources.cssColumnTable.text} min-w-120`],
	[_resources.tableHeader.property.bankName, _resources.tableHeader.bankName, `${_resources.cssColumnTable.text} min-w-120`],
	[
		_resources.tableHeader.property.bankAddress,
		_resources.tableHeader.bankAddress,
		`${_resources.cssColumnTable.text} min-w-180`,
		_resources.explainTitle.bankAddress,
	],
];
let listEmployee = ref([]);
let action = ref(_enum.action.Add); // kiểu form, mặc định kiểu form thêm mới
let employeeForForm = reactive({});
let isShowDialog = ref(false);

let customHtml = ref("");
let typeDialog = ref("");

watch(
	() => store.getters.getDataStatus,
	(newVal) => {
		if (!newVal) {
			// show dialog lỗi
			typeDialog.value = _enum.typeDialog.error;
			customHtml.value = `<p>${_resources.errorApp}</p>`;
			isShowDialog.value = true;
		}
	}
);

/**
 * hàm lấy danh sách nhân viên từ store
 * author: Trương Mạnh Quang (24/7/2023)
 */
const getEmployees = async () => {
	await store.dispatch("actionFilterEmployees");
	listEmployee.value = store.getters.getEmployeesToRender;
};
getEmployees();

/**
 * hàm load thông tin phòng ban và chức vụ
 * author: Trương Mạnh Quang (9/8/2023)
 */
const loadDataDepartmetnAndPosition = async () => {
	// load thông tin phòng ban
	await store.dispatch("actionGetDepartment");
	// load thông tin chức danh
	await store.dispatch("actionGetPosition");
};
loadDataDepartmetnAndPosition();
/**
 * hàm đóng popup nhập liệu
 * author: Trương Mạnh Quang (19/7/2023)
 */
const closePopupEmployee = () => {
	// reset type form
	action.value = _enum.action.Add;
	// reset nhân viên cần sửa
	employeeForForm = reactive({});
	isShowForm.value = false;
};

/**
 * hàm render lại bảng nhân viên
 * author: Trương Mạnh Quang (25/7/2023)
 */
const handleRenderTableAgain = () => {
	getEmployees();
};

/**
 * hàm hiển thị toast msg
 * author: Trương Mạnh Quang (26/7/2023)
 * @param {*} action hành động : add, edit, delete, warn
 * @param {*} type loại thông báo: success, fail
 */
const showToast = (action, type) => {
	let notice = {};
	switch (type) {
		case statusSuccess:
			notice = { ..._resources.notice.noticeSuccess };
			if (action == actionAdd) {
				notice["content"] = _resources.notice.toastMsgAddSuccess;
			} else if (action == actionEdit) {
				notice["content"] = _resources.notice.toastMsgEditSuccess;
			} else if (action == actionDelete) {
				notice["content"] = _resources.notice.toastMsgDeleteSuccess;
			}
			break;
		case statusFail:
			notice = { ..._resources.notice.noticeFail };
			if (action == actionAdd) {
				notice["content"] = _resources.notice.toastMsgAddFail;
			} else if (action == actionEdit) {
				notice["content"] = _resources.notice.toastMsgEditFail;
			} else if (action == actionDelete) {
				notice["content"] = _resources.notice.toastMsgDeleteFail;
			}
			break;
		case statusWarn:
			notice = { ..._resources.notice.noticeWarn };
			notice["content"] = _resources.notice.toastMsgNoChange;
		default:
			break;
	}
	// nếu có đủ các thành phần của thông báo thì show toast msg
	if (Object.keys(notice).length > 0) {
		notify = notice;
		isShowToast.value = true;
	}
};

/**
 * đóng toast msg
 * author: Trương Mạnh Quang (26/7/2023)
 */
const handleCloseToastMsg = () => {
	isShowToast.value = false;
};

//========== Sửa thông tin nhân viên ==========//
/**
 * hàm xử lý click edit row table
 * author: Trương Mạnh Quang (27/7/2023)
 * @param {*} emp thông tin nhân viên cần edit
 */
const handleClickEditRow = (emp) => {
	// lấy thông tin nhân viên cần edit để bind vào form
	employeeForForm = reactive(JSON.parse(JSON.stringify(emp)));
	console.log(employeeForForm);
	// set editForm
	action.value = _enum.action.Edit;
	// show form
	isShowForm.value = true;
};
//========= Copy thông tin nhân viên =========//
/**
 * hàm copy nhân viên
 * @param {employee} emp nhân viên
 * author: Trương Mạnh Quang (30/8/2023)
 */
const handleClickCopyRow = (emp) => {
	employeeForForm = reactive({ ...emp });
	// set editForm
	action.value = _enum.action.Copy;
	// show form
	isShowForm.value = true;
};
//========== Tìm kiếm ==========//
let isCancelSearch = ref(false);
// từ khóa tìm kiếm
let searchKey = ref("");
/**
 * hàm xử lý hủy tìm kiếm
 * author: Trương Mạnh Quang (11/8/2023)
 */
const handleCancelSearch = () => {
	searchKey.value = null;
	isCancelSearch = false;
	store.commit("mutationSetSearchKey", searchKey.value);
	// load lại dữ liệu
	getEmployees();
};
// watch theo dõi searchKey nếu có giá trị hiển thị icon cancel search
watch(searchKey, (newVal) => {
	if (newVal) isCancelSearch = true;
	else isCancelSearch = false;
});
/**
 * hàm xử lý tìm kiếm
 * author: Trương Mạnh Quang (29/7/2023)
 */
const handleSearch = () => {
	store.commit("mutationSetSearchKey", searchKey.value);
	if (searchKey.value) getEmployees();
	if (!searchKey.value && !store.getters.getTotalRecord) {
		// load lại dữ liệu
		getEmployees();
	}
};
//========== Xóa 1 nhân viên ==========//

let idDeleted = ref("");
let codeDeleted = ref("");
let handleConfirm = ref(() => {});
/**
 * hàm thực hiện xóa 1 nhân viên
 * author: Trương Mạnh Quang (14/8/2023)
 */
const handleDeleteEmployee = async () => {
	try {
		// call api delete
		const res = await baseApi.deleteEmployee(idDeleted.value);
		// xóa id vừa xóa khỏi danh sach các id cần xóa
		tableEmployee.value.removeIdDeletedFromIds(idDeleted.value);
		// show toast msg
		showToast(actionDelete, statusSuccess);
		// reder lại bảng
		getEmployees();
	} catch (error) {
		// check error
		console.log(error);
		showToast(actionDelete, statusFail);
	}
	// đóng dialog
	isShowDialog.value = false;
};
/**
 * hàm thực hiện click xóa nhân viên
 * author: Trương Mạnh Quang (30/7/2023)
 * @param {*} id id nhân viên
 * @param {*} code mã nhân viên
 */
const handleClickDeleteRow = async (id, code) => {
	idDeleted.value = id;
	codeDeleted.value = code;
	// truyền các giá trị đầu vào cho dialog
	typeDialog.value = _enum.typeDialog.confirm;
	let text = `${_resources.notice.deleteEmployee.content}`;
	customHtml.value = text.replace("code", code);
	handleConfirm.value = handleDeleteEmployee;
	isShowDialog.value = true;
};
//

//========= Xóa nhiều ==========//
const tableEmployee = ref(null);
let lengthIds = ref(0);
let listIdDelete = ref([]);
const handleDeleteEmployees = async () => {
	try {
		// call api delete
		const res = await baseApi.deleteEmployees(listIdDelete.value);
		// xóa id vừa xóa khỏi danh sach các id cần xóa
		tableEmployee.value.resetIdsDelete();
		// show toast msg
		showToast(actionDelete, statusSuccess);
		// nếu xóa trang cuối cùng thì chuyển đến trang trước đó
		if (store.getters.getPageNumber == store.getters.getTotalPage && listIdDelete.value.length == store.getters.getCurrentPageRecord) {
			store.commit("mutationSetPageNumber", store.getters.getPageNumber - 1);
		}
		// reder lại bảng
		getEmployees();
	} catch (error) {
		// check error
		console.log(error);
		showToast(actionDelete, statusFail);
	}
	// đóng dialog
	isShowDialog.value = false;
};
/**
 * hàm xóa danh sách ids
 * author: Trương Mạnh Quang (14/8/2023)
 * @param {*} ids danh sách id cần xóa
 */
const handleDeleteIds = async (ids) => {
	listIdDelete.value = ids;
	// chuyền giá trị vào cho dialog
	typeDialog.value = _enum.typeDialog.confirm;
	customHtml.value = `<p>${_resources.notice.deleteEmployees.fontContent} <strong>${ids.length}</strong> ${_resources.notice.deleteEmployees.backContent}</p>`;
	handleConfirm.value = handleDeleteEmployees;
	isShowDialog.value = true;
};
/**
 * hàm click chọn xóa nhiều
 * author: Trương Mạnh Quang (14/8/2023)
 */
const handleClickDeleteIds = () => {
	tableEmployee.value.deleteIds();
};

//========== Export Excel ==========//
/**
 * hàm export file excel
 * author: Trương Mạnh Quang (21/8/2023)
 */
const handleExportExcel = () => {
	let fileName = _resources.excelFile.name;
	store.dispatch("actionExportExcel", fileName);
};
</script>

<style scoped>
.container {
	min-width: 900px;
	width: 100%;
	height: 100%;
	background-color: var(--color-grey-200);
	padding: 16px 16px 0 16px;
}
.title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
}
.title p {
	font-weight: bolder;
	font-size: 20px;
}
.content-table {
	width: 100%;
	height: calc(100% - 68px);
	background-color: #fff;
	border: none;
	border-radius: 4px;
	padding: 0 12px;
	position: relative;
	box-shadow: 0 0 7px 0 var(--color-grey-400);
}
.head-table {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
}
.head-table .left-feature,
.head-table .right-feature {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.head-table .left-feature {
	gap: 16px;
}
.head-table .left-feature .wrapper-left-feature {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
.head-table .right-feature {
	gap: 12px;
}
.head-table .right-feature .search-box {
	position: relative;
	margin: 12px 0;
}
.head-table .right-feature .search-box input {
	height: 36px;
	width: 260px;
	border: solid 1px var(--color-grey-200);
	border-radius: 4px;
	padding-left: 8px;
}
.head-table .right-feature .search-box input:hover {
	outline: none;
	border: solid 1px var(--color-light-green-400);
}
.head-table .right-feature .search-box input:focus-visible {
	outline: none;
	border: solid 1px var(--color-light-green-400);
}
.head-table .right-feature .search-box .icon {
	position: absolute;
	top: 10px;
	right: 8px;
	cursor: pointer;
}
.head-table .right-feature .reload {
	width: 36px;
	height: 36px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 4px;
	position: relative;
}
.head-table .right-feature .reload:hover {
	background-color: var(--color-light-green-200);
}
.head-table .right-feature .reload .tooltip-reload-wrapper {
	display: none;
	position: absolute;
	top: 46px;
	left: -27px;
	z-index: 2;
}
.head-table .right-feature .reload:hover .tooltip-reload-wrapper {
	display: block;
}
.head-table .right-feature .excel-wrapper {
	position: relative;
}
.head-table .right-feature .excel-wrapper .tooltip-excel-wrapper {
	display: none;
	position: absolute;
	top: 46px;
	left: -20px;
	z-index: 2;
}
.head-table .right-feature .excel-wrapper:hover .tooltip-excel-wrapper {
	display: block;
}
/* ============================= */
.table-container {
	width: 100%;
	height: calc(100% - 60px);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
}

.cancel-search {
	width: 16px;
	height: 16px;
	cursor: pointer;
	position: absolute;
	top: 10px;
	right: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.loading {
	border: 6px solid #f3f3f3;
	border-top: 6px solid var(--color-light-green-400);
	border-radius: 50%;
	width: 34px;
	height: 34px;
	animation: spin 2s linear infinite;
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
