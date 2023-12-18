<template>
	<div class="date-picker-container">
		<div class="title">
			{{ title
			}}<span
				v-if="require"
				class="require"
				>*</span
			>
		</div>
		<div class="date-picker">
			<input
				:tabindex="isTabIndex && tabIndex"
				v-model="datePicked"
				type="date"
				@input="handleBlurInput"
			/>
			<!-- @input="handleOnInput" -->
		</div>
	</div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
const props = defineProps({
	modelValue: { type: String, default: "" },
	title: { type: String, default: "" },
	require: { type: Boolean, default: false },
	tabIndex: { type: Number, default: 1 },
});

const emit = defineEmits(["update:modelValue"]);

let datePicked = ref("");
let isTabIndex = ref(props.tabIndex ? true : false);
// bind từ ngoài vào
watch(props.modelValue, (newVal) => {
	if (newVal) datePicked.value = tranferTimestampToDate(newVal);
});
onMounted(() => {
	// bind vào lần đầu
	if (props.modelValue) datePicked.value = tranferTimestampToDate(props.modelValue);
});
// const handleOnInput = () => {

// };

// bind ra bên ngoài
const handleBlurInput = () => {
	emit("update:modelValue", tranferDateToTimestamp(datePicked.value));
};
/**
 * hàm truyển đổi định kiểu datepicker sang timestamp
 * @param {định dạng năm tháng ngày} datepicker yyyy-mm-dd
 * author: Trương Mạnh Quang (10/8/2023)
 */
const tranferDateToTimestamp = (datepicker) => {
	const dateObject = new Date(datepicker);
	// Kiểm tra xem giá trị ngày có hợp lệ không
	if (isNaN(dateObject)) {
		return "";
	}

	const timestampFormatted = dateObject.toISOString();
	return timestampFormatted;
};

/**
 * hàm chuyển đổi kiểu timestamp sang datepicker
 * @param {*} datePicker
 * author: Trương Mạnh Quang (21/8/2023)
 */
const tranferTimestampToDate = (timestamp) => {
	const timestampVal = new Date(timestamp);
	const year = timestampVal.getUTCFullYear();
	const month = ("0" + (timestampVal.getUTCMonth() + 1)).slice(-2);
	const day = ("0" + timestampVal.getUTCDate()).slice(-2);
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
};
</script>
<style scoped>
/* .date-picker-container {
} */
.title {
	margin-bottom: 8px;
	font-weight: 500;
	font-size: 14px;
}
.require {
	color: var(--color-red-500);
}
.date-picker input {
	height: 36px;
	width: 100%;
	padding: 0 12px;
	border: 1px solid var(--color-grey-300);
	border-radius: 4px;
	cursor: text;
	outline: none;
}
.date-picker input:focus {
	border-color: var(--color-light-green-400);
}
input[type="date"]::-webkit-calendar-picker-indicator {
	/* filter: invert(1); Đảo ngược màu sắc của ảnh */
	cursor: pointer;
}
</style>
