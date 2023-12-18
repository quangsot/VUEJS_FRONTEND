<!-- author: Trương Mạnh Quang (18/7/2023) -->
<template>
	<section class="radio-section">
		<div class="title">{{ title }}</div>
		<div class="radio-list">
			<div
				class="radio-item"
				v-for="(item, index) in listItem"
				:key="index"
			>
				<input
					:tabindex="tabIndex[index]"
					:value="index"
					v-model="picked"
					type="radio"
				/>
				<lable>{{ item }}</lable>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
	modelValue: { type: Number },
	title: { type: String },
	listItem: [],
	tabIndex: [],
});
const emit = defineEmits(["update:modelValue"]);
const picked = ref(0);
// const isTabIndex = ref(false);
//isTabIndex.value = props.tabIndex ? true : false;
// nếu có model value từ bên ngoài
if (props.modelValue) {
	picked.value = props.modelValue;
} else {
	// mặc định chọn phần tử đầu tiên
	picked.value = 0;
	emit("update:modelValue", picked.value);
}
watch(picked, (newVal) => {
	// binding lên cpn cha
	emit("update:modelValue", newVal); // binding vị trí của phần tử được chọn
});
</script>

<style scoped>
/* .radio-section {
	margin-bottom: 16px;
} */
.title {
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 8px;
}
.radio-list {
	display: flex;
	align-items: center;
	gap: 36px;
	height: 36px;
}
.radio-item {
	display: flex;
	align-items: center;
	gap: 6px;
}
input[type="radio"] {
	width: 20px;
	height: 20px;
	accent-color: #3ea52a;
	outline: none;
}
input[type="radio"]:focus::before {
	content: "";
	display: block;
	width: fill-available;
	height: fill-available;
	border: #3ea52a solid 1px;
	border-radius: 100%;
	box-shadow: 0 0 5px 1px #3ea52a;
}
</style>
