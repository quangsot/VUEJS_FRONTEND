<!-- author: Trương Mạnh Quang (16/7/2023) -->
<template>
	<button
		ref="btn"
		:tabindex="tabIndex"
		class="m-icon-btn"
	>
		<div
			v-if="iconClass"
			:class="iconClass"
		></div>
		{{ text }}
	</button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["text", "iconClass", "tabIndex", "isFocus"]);

const btn = ref(null);
onMounted(() => {
	if (props.isFocus) btn.value.focus();
});

/**
 * hàm focus btn
 * author: Trương Mạnh Quang (6/9/2023)
 */
const handleFocusBtn = () => {
	btn.value.focus();
};
defineExpose({
	handleFocusBtn,
});
</script>

<style scoped>
.m-icon-btn {
	min-width: 40px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 4px;
	border: none;
	cursor: pointer;
}
.m-icon-btn:focus {
	outline: unset;
}
</style>
