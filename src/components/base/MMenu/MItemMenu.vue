<!-- author: Trương Mạnh Quang (16/7/2023) -->
<template>
	<div
		class="item-menu"
		:class="[{ active: isActive }]"
	>
		<div class="item-wrapper">
			<div :class="icon"></div>
			<div>{{ text }}</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["text", "icon", "isActive"]);
</script>

<style scoped>
.item-menu {
	min-width: 56px;
	height: 44px;
	border: none;
	border-radius: 6px;
	background-color: transparent;
	color: #fff;
	display: flex;
	justify-content: left;
	padding-right: 10px;
	align-items: center;
	gap: 45px;
	cursor: pointer;
	position: relative;
	margin-top: 8px;
}
.item-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 16px;
	gap: 12px;
}
.item-menu:hover {
	background-color: var(--color-grey-700);
}
.active {
	background-color: var(--color-grey-800);
}
</style>
