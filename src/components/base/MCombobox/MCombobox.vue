<!-- author: Trương Mạnh Quang (17/7/2023) -->
<template>
	<div
		@keydown.down.exact.prevent="downKey"
		@keydown.up.exact.prevent="upKey"
		@keydown.enter.exact.prevent="handleEnterInput"
		class="combobox"
	>
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
		</div>
		<div class="wrapper">
			<Transition name="listItem">
				<ul
					v-if="isShowList"
					:class="showListTop ? 'show-list-top' : 'show-list-bottom'"
					class="list"
				>
					<li
						v-for="(item, index) in listToShow"
						:key="index"
						:class="{ 'active-item': focusIndex == index }"
						@mousedown="handleClickSelect($event, index)"
					>
						{{ item }}
						<div
							v-if="listToShow[index] == textValue"
							class="checked-active-icon check-icon"
						></div>
					</li>
				</ul>
			</Transition>
			<input
				ref="input"
				@mouseover="hanldeMouseOverInput"
				@mouseleave="hanldeMouseLeaveInput"
				v-outside="
					(e) => {
						if (isShowList && (e.target.className === 'icon pointer' || e.target.className === 'drop-icon')) {
							isShowList = false;
							e.stopPropagation();
						} else if (isShowList && (e.target.className !== 'icon pointer' || e.target.className !== 'drop-icon')) {
							isShowList = false;
						}
					}
				"
				@focusout="
					(e) => {
						if (e.relatedTarget?.tagName === 'INPUT') {
							isShowList = false;
							e.stopPropagation();
						}
					}
				"
				@focusin="handleShowList"
				:readonly="readOnly"
				:tabindex="isTabIndex && tabIndex"
				:class="error && errorMode ? 'bd-error' : 'bd-not-error'"
				v-model="textValue"
				type="text"
				:placeholder="placeholder"
			/>
			<div
				class="tootip-error"
				v-if="showError && error"
			>
				<Tooltip
					:content="errorText"
					position="bottom"
					type="error"
				/>
			</div>
			<div
				@click="handleToogleList"
				class="icon pointer"
			>
				<div class="drop-icon"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { clearCharacterVietnam } from "@/utils/helper/clear-character-vietnam.js";
const props = defineProps({
	modelValue: String,
	title: { type: String, default: "" },
	require: { type: Boolean, default: false },
	placeholder: { type: String, default: "" },
	valueCombobox: { type: Array },
	typeValue: { type: String }, // vd: number, guid, string, ...
	display: { type: Array },
	searchMode: { type: Boolean, default: false },
	errorMode: { type: Boolean },
	readOnly: { type: Boolean, default: false },
	tabIndex: { type: Number },
	showListTop: { type: Boolean, default: false },
	errorText: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "changeValueComboBox"]);

let textValue = ref("");
let isShowList = ref(false);
let error = ref(false);
let showError = ref(false);
let isTabIndex = ref(false);
let listChecked = ref(new Array(props.valueCombobox.length).fill(false));
isTabIndex = props.tabIndex ? true : false;
listChecked.value[0] = true;

let listToShow = ref(props.display);

// Hàm check input rỗng và auto complete trong combobox và binding lên cpn cha
watch(textValue, (newVal) => {
	if (!newVal) {
		error.value = true;
		listToShow.value = props.display;
		emit("update:modelValue", "");
	} else if (props.display.includes(textValue.value)) {
		let val = "";
		let i = props.display.findIndex((element) => element == newVal);
		if (i > -1) {
			val = props.valueCombobox[i];
		} else {
			val = props.valueCombobox[0];
		}
		emit("update:modelValue", val);
		error.value = false;
	} else {
		if (!props.readOnly) {
			// auto complete
			listToShow.value = props.display.filter((element) => {
				if (typeof element === "string") return clearCharacterVietnam(element).includes(clearCharacterVietnam(newVal));
				else return false;
			});
			let defaultValue;
			switch (props.typeValue) {
				case "number":
					defaultValue = 0;
				case "string":
					defaultValue = "";
				case "guid":
					defaultValue = "00000000-0000-0000-0000-000000000000";
					break;
				default:
					defaultValue = null;
					break;
			}
			emit("update:modelValue", defaultValue);
			error.value = false;
		}
	}
});

// binding từ ngoài vào
onMounted(() => {
	// bind vào
	autoChooseItem();
});

/**
 * hàm tự động chọn phần tử, bind từ ngoài vào
 * tmquang (18/7/2023)
 */
const autoChooseItem = () => {
	// nếu có model value từ ngoài chọn phần tử tương ứng
	// debugger;
	if (props.modelValue) {
		let index = props.valueCombobox.indexOf(props.modelValue);
		if (index > -1) {
			textValue.value = props.display[index];
		} else {
			textValue.value = props.display[0];
		}
	} else {
		textValue.value = props.display[0];
	}
};
let focusIndex = ref(0);
let selectedIndex = ref(0);
/**
 * hàm chọn phần tử
 * tmquang (18/7/2023)
 */
const handleClickSelect = (event, index) => {
	// gán input bằng giá trị được chọn của list
	if (textValue.value != event.target.innerText) {
		textValue.value = event.target.innerText;
		listChecked.value.fill(false);
		listChecked.value[index] = true;
		selectedIndex.value = index;
	}
	// gửi giá trị được chọn cho cpn cha
	if (textValue.value) {
		emit("changeValueComboBox", textValue.value);
	}

	// ẩn list
	if (isShowList.value) isShowList.value = false;
};

/**
 * hàm bắt sự kiện ấn down key để focus item trong list
 * author: Trương Mạnh Quang (15/8/2023)
 */
const downKey = () => {
	if (focusIndex.value < props.valueCombobox.length - 1) {
		listChecked.value[focusIndex.value] = false;
		listChecked.value[focusIndex.value + 1] = true;
		focusIndex.value += 1;
	} else {
		focusIndex.value = 0;
	}
};
/**
 * hàm bắt sự kiện ấn up key để focus item trong list
 * author: Trương Mạnh Quang (15/8/2023)
 */
const upKey = () => {
	if (focusIndex.value > 0) {
		listChecked.value[focusIndex.value] = false;
		listChecked.value[focusIndex.value - 1] = true;
		focusIndex.value -= 1;
	} else {
		focusIndex.value = listChecked.value.length - 1;
	}
};
/**
 * hàm chọn phần tử focus khi người dùng nhấn enter
 * author: Trương Mạnh Quang (15/8/2023)
 */
const handleEnterInput = () => {
	if (textValue.value != listToShow.value[focusIndex.value]) {
		textValue.value = listToShow.value[focusIndex.value];
		emit("changeValueComboBox", textValue.value);
		selectedIndex.value = focusIndex.value;
	}
	// ẩn list
	if (isShowList.value) isShowList.value = false;
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
 * hàm ẩn lỗi khi hover vào input
 * author: Trương Mạnh Quang (19/7/2023)
 */
const hanldeMouseLeaveInput = () => {
	showError.value = false;
};
/**
 * hiển thị list
 * tmquang (18/7/2023)
 */
const handleShowList = () => {
	if (!isShowList.value) {
		listToShow.value = props.display;
		focusIndex.value = selectedIndex.value;
		isShowList.value = true;
	}
};

const input = ref(null);

/**
 * hàm hiển thị list khi click drop icon
 * author: Trương Mạnh Quang (6/9/2023)
 */
const handleToogleList = () => {
	if (!isShowList.value) {
		listToShow.value = props.display;
		focusIndex.value = selectedIndex.value;
		isShowList.value = true;
		input.value.focus();
	} else {
		isShowList.value = false;
	}
};
</script>

<style scoped>
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
.isSelected:hover {
	background-color: var(--color-blue-100);
	border: none;
	border-radius: 4px;
}
.bd-not-error {
	border: 1px solid var(--color-grey-300);
}
.bd-not-error:focus {
	border: 1px var(--color-light-green-400) solid;
}
.bd-error {
	border: 1px red solid;
}
.combobox .title {
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 500;
	white-space: nowrap;
}
.combobox .wrapper {
	position: relative;
}
.combobox .wrapper input[type="text"] {
	height: 36px;
	padding-left: 12px;
	width: 100%;
	border-radius: 4px;
	outline: none;
}
.combobox .wrapper .icon {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35px;
	width: 36px;
	border-left: solid 1px var(--color-grey-300);
	position: absolute;
	top: 0px;
	right: 0px;
}
.combobox .wrapper .icon .drop-icon {
	transform: rotate(90deg);
	cursor: pointer;
}
.combobox .list {
	background-color: #fff;
	list-style: none;
	width: 100%;
	max-height: 300px;
	overflow-y: auto;
	padding: 4px;
	border-radius: 4px;
	box-shadow: 0 0 16px rgba(23, 27, 42, 0.24);
	z-index: 1;
}
.combobox .list li {
	text-align: left;
	padding: 12px;
	cursor: pointer;
	position: relative;
	margin: 4px 0;
}
.combobox .list li:hover {
	background-color: var(--color-light-green-100);
	border: none;
	border-radius: 4px;
}
.show-list-bottom {
	position: absolute;
	top: 40px;
	left: 0px;
}
.show-list-top {
	position: absolute;
	bottom: 40px;
	left: 0px;
}
.active-item {
	background-color: var(--color-light-green-100);
	border: none;
	border-radius: 4px;
}
.active-item:focus {
	box-shadow: 0 0 2px 7px var(--color-red);
}
.check-icon {
	position: absolute;
	top: 16px;
	right: 12px;
}
.listItem-enter-active,
.listItem-leave-active {
	transition: all 0.15s ease-in-out;
}

.listItem-enter-from,
.listItem-leave-to {
	opacity: 0;
	transform: translateY(-12px);
}
</style>
