<!-- author: Trương Mạnh Quang (18/7/2023) -->
<template>
	<div class="CheckboxCpn">
		<p>
			{{ title }}
			<span
				v-if="require"
				class="text-red"
				>*</span
			>
		</p>
		<div class="wrapper">
			<div
				v-for="(content, index) in contents"
				:key="index"
				class="checkbox"
			>
				<input
					@input="onInput"
					v-model="checkList[index]"
					@keydown.enter.prevent="handleChecked($event, index)"
					class="checked"
					type="checkbox"
					:tabindex="isTabIndex && tabIndex[index]"
				/><span>{{ content }}</span>
			</div>
		</div>
		<div v-if="error">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue";
const props = defineProps({
	modelValue: { type: String },
	title: { type: String, default: "" },
	require: { type: Boolean, default: false },
	contents: { type: Array, default: [] },
	tabIndex: { type: Array, default: [] },
	autoChoose: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

let checkList = ref([]);

let isTabIndex = ref(false);
isTabIndex = props.tabIndex ? true : false;

let len = props.contents.length;
// gán giá trị ban đầu cho mảng
checkList.value = Array(len).fill(false);

nextTick(() => {
	// bind vào
	bindCheckList(props.modelValue);
});

// bind ra
watch(
	() => checkList,
	(newVal) => {
		bindModelValue(newVal.value);
	},
	{ deep: true }
);

// check xem các checkbox đã được checked chưa thông qua checkList
let error = computed(() => {
	if (
		checkList.value.some((item) => {
			return item == true;
		})
	) {
		return false;
	} else {
		return true;
	}
});

/**
 * bind ra
 * Trương Mạnh Quang (18/7/2023)
 */
const onInput = () => {
	bindModelValue(checkList.value);
};
/**
 * hàm checked khi nhấn enter
 * Trương Mạnh Quang (18/7/2023)
 */
const handleChecked = ($event, index) => {
	checkList.value[index] = !checkList.value[index];
};
/**
 * bind ra
 * Trương Mạnh Quang (18/7/2023)
 */
const bindModelValue = (list) => {
	// debugger
	let value = "";
	list.forEach((item, index) => {
		if (item) {
			value += (index + 1).toString();
		}
	});
	emit("update:modelValue", value);
};
/**
 * bind vào
 * Trương Mạnh Quang (18/7/2023)
 */
const bindCheckList = (val) => {
	// debugger
	// nếu có model value từ ngoài thì gán giá trị tương ứng cho checkList
	if (val) {
		let arrObj = val.split("");
		arrObj.forEach((item) => {
			let i = parseInt(item) - 1;
			checkList.value[i] = true;
		});
	} else {
		// nếu ở trạng thái tự động chọn giá trị chọn giá trị đầu tiên
		if (props.autoChoose) checkList.value[0] = true;
	}
};
</script>

<style scoped>
p {
	margin-bottom: 8px;
}
.require-icon {
	color: red;
}
.wrapper {
	display: flex;
	justify-content: start;
	align-items: start;
	gap: 12px;
}
.checkbox {
	display: flex;
	height: 36px;
	align-items: center;
	justify-content: start;
}
.checkbox input {
	width: 20px;
	height: 20px;
	margin-right: 4px;
	cursor: pointer;
}
/* .wrapper-input{
    position: relative;
}
.checked:focus::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 22px;
    height: 22px;
    background-color: aqua;
    opacity: 0.5;
    z-index: -1;
} */
.checked:focus-visible {
	outline: none;
	/* accent-color: var(--color-blue-400); */
	box-shadow: 0px 0px 3px 2px var(--color-blue-300) inset;
	/* border: solid 2px var(--color-blue-400); */
	/* border: none!important; */
}
</style>
