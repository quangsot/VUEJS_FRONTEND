<!-- author: Trương Mạnh Quang (24/7/2023) -->
<template>
	<div class="table-container">
		<div class="sticky-table">
			<table>
				<thead>
					<tr>
						<th v-if="listTitle == undefined || isCheckbox">
							<input
								class="pointer"
								v-model="checkedAll"
								@change="handleCheckedAll"
								type="checkbox"
							/>
						</th>
						<th
							v-for="(item, index) in listTitle"
							:key="index"
							:class="item[2]"
						>
							<div class="title-header">
								{{ item[1] }}
								<div
									v-if="item[3]"
									class="wrapper-tooltip"
								>
									<Tooltip
										:content="item[3]"
										:position="_resources.tooltip.position.bottom"
									/>
								</div>
							</div>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-if="!isLoading && isLoaded">
					<tr
						v-for="(item, index) in listRow"
						:key="index"
						@mouseleave="() => (isShowListOrtherFeature = false)"
						class="hoverable-row"
						@dblclick="handleClickEdit(_, item)"
					>
						<td
							class="text-center"
							v-if="listTitle !== undefined && isCheckbox"
							@dblclick.stop
						>
							<input
								class="pointer"
								v-model="checkedRows[index]"
								type="checkbox"
							/>
						</td>
						<td
							v-for="(property, i) in listTitle"
							:class="property[2]"
						>
							{{ property[0] == "DateOfBirth" ? parseDMY(item[property[0]]) : item[property[0]] }}
						</td>
						<td>
							<div class="feature-wrapper">
								<div
									class="edit"
									@click="handleClickEdit(_, item)"
								>
									<div class="edit-icon"></div>
								</div>
								<div
									class="orther-feature"
									@click="handleToggleOtherFeature"
									@dblclick.stop
								>
									<div
										ref="listUl"
										class="three-dot-icon"
									></div>
									<ul
										v-if="isShowListOrtherFeature"
										class="list-feature"
										:class="listFeaturePosition"
									>
										<li @click="handleCopyEmployee(_, item)">{{ _resources.feature.duplicate }}</li>
										<li @click="handleDeleteEmployee(_, item.EmployeeId, item.EmployeeCode)">{{ _resources.feature.delete }}</li>
										<li>{{ _resources.feature.stopUsing }}</li>
									</ul>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
				<Loader
					class="loading"
					v-else-if="isLoading && isLoaded"
				/>
				<div
					class="load-error-wrapper"
					v-else
				>
					<div class="load-error">
						<div class="error-notify-icon"></div>
						<div class="load-error-content">{{ _resources.notice.loadEmployeeFail }}</div>
					</div>
				</div>
			</table>
		</div>
		<div class="table-footer">
			<div class="left-foot">
				<p>
					Tổng số: <strong>{{ store.getters.getTotalRecord }}</strong>
				</p>
			</div>
			<div class="right-foot">
				<div class="paging">
					<p>Số bản ghi/trang:</p>
					<div class="combobox">
						<Combobox
							:valueCombobox="listPageSize"
							typeValue="number"
							:display="listPageSize"
							:outoChoose="true"
							:readOnly="true"
							:showListTop="true"
							v-model="pageSize"
							@changeValueComboBox="handleChoosePageSize"
						/>
					</div>
				</div>
				<div class="num-page">
					<strong>{{ startIndex }}</strong> - <strong>{{ endIndex }}</strong> bản ghi
				</div>

				<div class="pagination-wrapper">
					<div class="pagination">
						<div
							@click="handleClickPrePage"
							class="direction-icon"
							:class="[pageNumber > 1 ? 'pointer active-direction' : 'not-allowed']"
						>
							<div
								v-if="pageNumber > 1"
								class="move-pre-icon pointer"
							></div>
							<div
								v-else
								class="not-move-pre-icon"
							></div>
						</div>
						<div
							class="num"
							v-for="(item, index) in listPagination"
							:key="index"
							v-on="item != '...' ? { click: () => handleGoToExactPage(_, item) } : {}"
							:class="[{ 'current-page': item == pageNumber }, [item != '...' ? 'active-direction' : 'default']]"
						>
							{{ item }}
						</div>
						<div
							@click="handleClickNextPage"
							class="direction-icon"
							:class="[pageNumber < store.getters.getTotalPage ? 'pointer active-direction' : 'not-allowed']"
						>
							<div
								v-if="pageNumber < store.getters.getTotalPage"
								class="move-next-icon"
							></div>
							<div
								v-else
								class="not-move-next-icon"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance, nextTick } from "vue";
import Loader from "@/components/base/MLoader/MLoader.vue";
import { useStore } from "vuex";
import { parseDMY } from "@/utils/helper/parse-datetime.js";
const app = getCurrentInstance();
const _resources = app.appContext.config.globalProperties._resources;
const _enum = app.appContext.config.globalProperties._enum;

const store = useStore();
const props = defineProps({
	modelValue: { type: Number, default: 0 },
	listTitle: { type: Array, default: [] },
	listRow: { type: Array, default: [] },
	listPageSize: { type: Array, default: [10, 20, 50, 100] },
	isCheckbox: { type: Boolean, default: false },
});

const emit = defineEmits(["clickEdit", "clickCopy", "clickDelete", "renderTableAgain", "deleteIds", "update:modelValue"]);

let isShowListOrtherFeature = ref(false);

// check trạng thái load dữ liệu
var isLoaded = ref(store.getters.getDataStatus);

let isLoading = computed(() => {
	return store.getters.getLoading;
});

let listFeaturePosition = ref("");
/**
 * hàm toggle other feature
 * author: Trương Mạnh Quang (7/9/2023)
 */
const handleToggleOtherFeature = (e) => {
	isShowListOrtherFeature.value = !isShowListOrtherFeature.value;
	const listRect = e.currentTarget.getBoundingClientRect();
	if (listRect.bottom + 100 > window.innerHeight - 60) {
		listFeaturePosition.value = "list-feature-top";
	} else {
		listFeaturePosition.value = "list-feature-bottom";
	}
};

// ========= Sửa ==========//
/**
 * hàm gửi sự kiện sửa row lên cpn cha
 * author: Trương Mạnh Quang (27/7/2023)
 * @param {*} _
 * @param {*} item thông tin của dòng được chọn
 */
const handleClickEdit = (_, item) => {
	let editItem = { ...item };
	emit("clickEdit", editItem);
};
//========== Copy =========//
/**
 * hàm gửi sự kiện copy row lên cpn cha
 * author: Trương Mạnh Quang (30/8/2023)
 */
const handleCopyEmployee = (_, item) => {
	debugger;
	let copyItem = { ...item };
	// delete item.EmployeeId;
	emit("clickCopy", copyItem);
};
//=========== Phân trang Employeee ===========//
// kích thước trang
let pageSize = computed({
	get() {
		return store.getters.getPageSize;
	},
	set(newVal) {
		store.commit("mutationSetPageSize", newVal);
	},
});
// tổng số bản ghi
// let totalPage = computed(() => Math.ceil(store.getters.getTotalRecord / pageSize.value));
let totalPage = computed(() => store.getters.getTotalPage);
// index của trang
let pageNumber = computed({
	get() {
		return Math.min(store.getters.getPageNumber, totalPage.value);
	},
	set(newVal) {
		store.commit("mutationSetPageNumber", newVal);
	},
});
// index bắt đầu trang = (pageSize * pageNumber) - (pageSize - 1)
let startIndex = computed(() => {
	return pageNumber.value > 0 ? pageNumber.value * pageSize.value - (pageSize.value - 1) : 1;
});
// index kết thúc trang = pageSize * pageNumber
let endIndex = computed(() => {
	return pageNumber.value >= totalPage ? store.getters.getTotalRecord : pageSize.value * pageNumber.value;
});

/**
 * hàm xử lý chọn trang tiếp theo
 * author: Trương Mạnh Quang (28/7/2023)
 */
const handleClickPrePage = () => {
	if (pageNumber.value > 1) {
		pageNumber.value--;
		emit("renderTableAgain");
	}
};
/**
 * hàm xử lý chọn quay lại trang trước đó
 * author: Trương Mạnh Quang (28/7/2023)
 */
const handleClickNextPage = () => {
	if (pageNumber.value < store.getters.getTotalPage) {
		pageNumber.value++;
		emit("renderTableAgain");
	}
};
/**
 * hàm chuyển đến trang chỉ định
 * author: Trương Mạnh Quang (25/8/2023)
 * @param {*} _
 * @param {*} page trang cần đến
 */
const handleGoToExactPage = (_, page) => {
	pageNumber.value = page;
	emit("renderTableAgain");
};

/**
 * hàm xử lý chọn kích thước trang mới
 * author: Trương Mạnh Quang (28/7/2023)
 */
const handleChoosePageSize = (newPageSize) => {
	store.commit("mutationSetPageSize", newPageSize);
	pageNumber.value = 1;
	emit("renderTableAgain");
};
/**
 * tính toán danh sách trang hiển thị
 * author: Trương Mạnh Quang (28/8/2023)
 */

let listPagination = computed(() => {
	let pages = [];
	let lenPages = 6;
	if (totalPage.value == 0) pages = [];
	else if (totalPage.value <= lenPages) {
		for (let i = 1; i <= totalPage.value; i++) {
			pages.push(i);
		}
	} else {
		let midIndex = Math.floor(lenPages / 2);
		pages[0] = 1;
		if (pageNumber.value >= 1 && pageNumber.value <= lenPages - midIndex + 1) {
			for (let i = 2; i <= lenPages - 1; i++) {
				pages.push(i);
			}
			pages.push("...");
		} else if (pageNumber.value > lenPages - midIndex + 1 && pageNumber.value <= totalPage.value - (lenPages - midIndex)) {
			pages[1] = "...";

			pages[midIndex] = pageNumber.value;
			// debugger;
			for (let i = 2; i < midIndex; i++) {
				pages[i] = pageNumber.value - (midIndex - i);
			}
			for (let i = midIndex; i <= lenPages - 2; i++) {
				pages[i] = pageNumber.value + (i - midIndex);
			}

			pages[lenPages - 1] = "...";
		} else {
			pages[1] = "...";
			for (let i = 2; i <= lenPages; i++) {
				pages[i] = totalPage.value - (lenPages - i);
			}
		}
		pages[lenPages] = totalPage.value;
	}
	return pages;
});

//========== Xóa =========//
/**
 * hàm gửi sự kiện xóa lên cpn cha
 * author: Trương Mạnh Quang (30/7/2023)
 * @param {*} _
 * @param {*} id mã định danh của nhân viên
 */
const handleDeleteEmployee = (_, id, code) => {
	emit("clickDelete", id, code);
};

//========= Xóa nhiều ==========//
let checkedAll = ref(false);
let IdsDelete = ref([]);
let checkedRows = ref(new Array(pageSize.value).fill(false));
// theo dõi danh sách hàng
watch(
	() => props.listRow,
	(newVal) => {
		checkedRows.value = new Array(newVal.length).fill(false);
		newVal.forEach((element, index) => {
			if (IdsDelete.value.includes(element.EmployeeId)) {
				checkedRows.value[index] = true;
			}
		});
	},
	{ deep: true }
);

// theo dõi sự kiện checked của các hàng
watch(
	checkedRows,
	(newVal) => {
		if (newVal.length > 0) {
			if (newVal.every((el) => el)) {
				checkedAll.value = true;
			}
			if (newVal.some((el) => !el)) {
				checkedAll.value = false;
			}
			if (newVal) {
				newVal.forEach((el, index) => {
					let id = props.listRow[index].EmployeeId;
					// nếu hàng được check và chưa tồn tại trong mảng thì thêm id vào ids
					if (el && !IdsDelete.value.includes(id)) {
						IdsDelete.value.push(id);
					}
					// nếu hàng không được chọn và đã tồn tại trong mảng thì xóa khỏi ids
					else if (!el) {
						let i = IdsDelete.value.indexOf(id);
						if (i > -1) {
							IdsDelete.value.splice(i, 1);
						}
					}
				});
			}
		}
	},
	{ deep: true }
);

/**
 * hàm chọn tất cả các hàng
 * author: Trương Mạnh Quang (14/8/2023)
 */
const handleCheckedAll = () => {
	// check tất cả
	if (checkedAll.value) {
		checkedRows.value.fill(true);
	} else {
		checkedRows.value.fill(false);
	}
};
/**
 * hàm xóa id đã được xóa khỏi ids
 * author: Trương Mạnh Quang (14/8/2023)
 */
const removeIdDeletedFromIds = (idDeleted) => {
	let i = IdsDelete.value.indexOf(idDeleted);
	if (i > -1) IdsDelete.value.splice(i, 1);
};
/**
 * hàm gửi sự kiện xóa nhiều lên cpn cha
 * author: Trương Mạnh Quang (14/8/2023)
 */
const deleteIds = () => {
	emit("deleteIds", IdsDelete.value);
};
/**
 * hàm reset danh sách ids
 * author: Trương Mạnh Quang (14/8/2023)
 */
const resetIdsDelete = () => {
	IdsDelete.value = [];
	checkedRows.value.fill(false);
};
/**
 * gửi độ dài của danh sách ids lên cpn cha
 * author: Trương Mạnh Quang (14/8/2023)
 */
watch(
	() => IdsDelete.value.length,
	(newVal) => {
		emit("update:modelValue", newVal);
	}
);
defineExpose({
	removeIdDeletedFromIds,
	deleteIds,
	resetIdsDelete,
});
</script>

<style scoped>
.load-error-wrapper {
	position: relative;
}
.load-error {
	white-space: nowrap;
	position: absolute;
	top: 50px;
	left: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
}
.load-error-content {
	font-size: 20px;
	font-weight: 700;
}
.direction-icon {
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 4px;
}
.active-direction:hover {
	background-color: var(--color-light-green-200);
}
.table-container {
	width: 100%;
	position: relative;
}
.sticky-table {
	position: relative;
	width: 100%;
	height: calc(100% - 56px);
	overflow: auto;
	white-space: nowrap;
}
input[type="checkbox"] {
	width: 18px;
	height: 18px;
	accent-color: #3ea52a;
	outline: none;
}
table {
	width: 100%;
	min-width: 1000px;
	border-collapse: collapse;
	position: relative;
}
thead tr {
	height: 48px;
	border: unset;
}
thead tr th {
	position: sticky;
	top: 0px;
	z-index: 1;
	background-color: #f5f5f5;
	width: fit-content;
	padding: 0 10px;
	border: unset;
	cursor: pointer;
}
tbody tr:hover td {
	background-color: var(--color-grey-200); /* Change to the desired gray color */
}
thead tr th:last-child {
	padding: 0;
	margin: 0;
	width: 0;
}
tbody tr td:last-child {
	padding: 0;
	margin: 0;
	width: 0;
	background-color: transparent;
}
tbody tr:hover td:last-child {
	background-color: var(--color-grey-200);
}

tbody td {
	padding: 0 10px;
	border-bottom: 1px solid #e0e0e0;
	cursor: pointer;
}
tbody tr:first-child {
	border-top: unset;
}
tbody tr:first-child td {
	border-top: unset;
}
/* thead tr th:first-child {
	width: 1px;
} */
tbody tr td:first-child,
thead tr th:first-child {
	border-left: none;
}
tbody tr td,
thead tr th {
	border-right: none;
	border-left: none;
}

tbody td {
	background-color: #fff;
	height: 48px;
}
tbody tr {
	position: relative;
}
/* tbody tr td:last-child {
	background-color: transparent;
} */
.title-header {
	position: relative;
}
.wrapper-tooltip {
	display: none;
	position: absolute;
	top: 33px;
	left: 20px;
	transform: translateX(-50%);
}
.title-header:hover .wrapper-tooltip {
	display: block;
}
.feature-wrapper {
	display: none;
	align-items: center;
	justify-content: center;
	gap: 18px;
	z-index: 2;
	overflow: visible;
	position: absolute;
	top: 5px;
	right: 20px;
	background-color: #ffffff00;
}
tbody tr:hover td:last-child {
	position: sticky;
	top: 0;
	right: 0;
	width: 1px;
	height: 1px;
	white-space: nowrap;
	z-index: 4;
}
tbody tr:hover td:last-child .feature-wrapper {
	display: flex;
}
.edit {
	/* margin: 0; */
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	width: 35px;
	height: 35px;
	border: none;
	border-radius: 100%;
}

.orther-feature {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: #ffffff;
	width: 35px;
	height: 35px;
	border: none;
	border-radius: 100%;
}
.edit:hover,
.orther-feature:hover {
	box-shadow: 0 0 6px 0 var(--color-grey-300);
}
.list-feature {
	display: block;
	/* position: absolute; */
	list-style: none;
	width: 150px;
	border: none;
	border-radius: 4px;
	box-shadow: 0 0 7px 0 var(--color-grey-200);
	background-color: #ffffff;
	position: absolute;
	padding: 8px 4px;
	z-index: 100;
}
.list-feature-bottom {
	top: 38px;
	right: 0px;
}
.list-feature-top {
	bottom: 38px;
	right: 0px;
}
.list-feature li {
	width: 100%;
	height: 32px;
	line-height: 32px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	padding-left: 4px;
}
.list-feature li:hover {
	background-color: var(--color-light-green-100);
}

.table-footer {
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	bottom: 0;
	left: 0;
}
.table-footer .right-foot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
}
.table-footer .right-foot .pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
}
.table-footer .right-foot .pagination div {
	font-size: 16px;
}
.table-footer .right-foot .paging {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
}
.table-footer .right-foot .paging .combobox {
	width: 84px;
}
.right-foot .pagination-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
}
.number-paging {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
}
.num {
	width: 24px;
	height: 24px;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 4px;
}
.current-page {
	background-color: var(--color-light-green-200);
}

.start-page,
.end-page {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
.first-page,
.last-page {
	min-width: fit-content;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 4px;
	border: none;
	border-radius: 4px;
	gap: 8px;
	cursor: pointer;
}
.first-page:hover,
.last-page:hover {
	background-color: var(--color-light-green-200);
}
.many-page {
	min-width: fit-content;
	margin-top: 8px;
	margin-right: 7px;
}
.unactive {
	color: var(--color-grey-500);
}
.loading {
	position: absolute;
	top: 200px;
	left: 50%;
}
</style>
