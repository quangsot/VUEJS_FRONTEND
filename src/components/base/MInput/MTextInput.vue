<!-- author: Trương Mạnh Quang (17/7/2023) -->
<template>
	<div class="wrapper">
		<div
			v-if="title"
			class="title"
		>
			{{ title }}
			<span
				v-if="require"
				class="text-red"
				>*</span
			>

			<div
				class="wraper-tooltip"
				v-if="title && explainTitle"
			>
				<Tooltip
					:content="explainTitle"
					position="top"
				/>
			</div>
		</div>
		<input
			@keyup.enter="emit('enter')"
			@mouseover="hanldeMouseOverInput"
			@mouseleave="hanldeMouseLeaveInput"
			ref="input"
			:tabindex="tabIndex"
			:[attribute]="true"
			:value="modelValue"
			:type="type"
			:maxlength="maxLen"
			:placeholder="placeholder"
			:class="error && errorMode ? 'bd-error' : 'bd-not-error'"
			@blur="handleBlurInput"
			@input="($event) => emit('update:modelValue', $event.target.value)"
			@focus="handleSelectAll($event)"
		/>
		<div
			class="icon pointer"
			v-if="iconClass"
			:class="iconClass"
			@click="emit('clickIcon')"
		></div>
		<div
			ref="toolTipError"
			class="tootip-error"
			v-if="showError"
		>
			<Tooltip
				:content="errorText"
				position="bottom"
				type="error"
			/>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";

const props = defineProps({
	modelValue: {
		type: [String, Number], // Thay đổi kiểu dữ liệu tùy theo yêu cầu
		default: null, // Giá trị mặc định cho prop
	},
	errorMode: {
		type: String,
		default: null,
	},
	errorText: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		default: "",
	},
	iconClass: {
		type: String,
		default: "",
	},
	require: {
		type: Boolean,
		default: false,
	},
	tabIndex: {
		type: Number,
		default: 0,
	},
	isFocus: {
		type: Boolean,
		default: false,
	},
	explainTitle: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	type: {
		type: String, // Thêm type prop
		default: "text", // Giá trị mặc định cho type prop
	},
	maxLen: {
		type: Number,
		default: 100,
	},
});

const emit = defineEmits(["update:modelValue", "enter", "clickIcon"]);

const input = ref(null);
let error = ref(false);
let showError = ref(false);
let toolTipError = ref(null);
let isFirstWatch = true; // đánh dấu watch chạy lần đầu tiên

// theo dõi biến textVal
watch(props.modelValue, (newVal) => {
	if (!isFirstWatch) {
		if (!newVal.value) {
			error.value = true;
		} else {
			error.value = false;
			showError.value = false;
		}
	} else {
		isFirstWatch = false; // đã chạy lần đầu tiên
	}
});

/**
 * hàm set focus cho input
 * author: Trương Mạnh Quang (28/8/2023)
 */
const handleFocusInput = () => {
	// set auto focus
	if (props.isFocus) {
		input.value.focus();
	}
};

onMounted(() => {
	handleFocusInput();
});

const handleSelectAll = (event) => {
	event.target.select();
};

/**
 * Xử lý forcus ra ngoài
 * TMQuang(17/7/2023)
 */
const handleBlurInput = () => {
	if (!props.modelValue) {
		error.value = true;
	} else {
		error.value = false;
		showError.value = false;
	}
};
/**
 * hàm hiện lỗi khi hover vào input
 * author: Trương Mạnh Quang (19/7/2023)
 */
const hanldeMouseOverInput = () => {
	if (props.errorMode && error.value && props.errorText) {
		showError.value = true;
	}
};
/**
 * hàm ẩn lỗi khi out hover vào input
 * author: Trương Mạnh Quang (19/7/2023)
 */
const hanldeMouseLeaveInput = () => {
	showError.value = false;
};
defineExpose({
	handleFocusInput,
});
</script>

<style scoped>
.bd-not-error {
	border: 1px solid var(--color-grey-300);
}
.bd-not-error:focus {
	border: 1px var(--color-light-green-400) solid;
}
.bd-error {
	border: 1px red solid;
}
.wrapper {
	position: relative;
	font-weight: 500;
	font-size: 14px;
}

.title {
	font-size: 14px;
	font-weight: 500;
	padding-bottom: 8px;
	position: relative;
	width: fit-content;
	cursor: pointer;
}
.wraper-tooltip {
	display: none;
	position: absolute;
	top: -36px;
	left: 8px;
	transform: translateX(-50%);
}
.title:hover .wraper-tooltip {
	display: block;
}
input[type="text"],
input[type="number"] {
	min-width: 150px;
	width: 100%;
	height: 36px;
	line-height: 18px;
	font-size: 14px;
	font-weight: 400;
	border-radius: 4px;
	padding-left: 12px;
	outline: none;
}
input[type="text"]::placeholder,
input[type="number"]::placeholder {
	color: rgb(193, 193, 193);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.require-icon {
	color: red;
}
.icon {
	position: absolute;
	top: 10px;
	right: 8px;
}
.tootip-error {
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: -36px;
	left: 0;
	z-index: 5;
}
</style>
