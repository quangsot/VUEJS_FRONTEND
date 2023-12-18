<!-- author: Trương Mạnh Quang (19/7/2023) -->
<template>
	<div
		class="tooltip-wrapper"
		:class="objStyle"
	>
		<div class="content">{{ content }}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	content: { type: String, default: "Content" },
	position: { type: String, default: "bottom" },
	type: { type: String, default: "notice" },
});

let objStyle = [props.position, props.type];
</script>

<style scoped>
.content {
	width: auto;
	white-space: nowrap;
}
.tooltip-wrapper {
	position: relative;
	padding: 6px;
	color: #fff;
	display: inline-block;
	border-radius: 5px;
	z-index: 1;
}
.tooltip-wrapper::before {
	content: "";
	display: block;
	height: 0;
	width: 0;
	border: solid 8px transparent;
}
.right::before {
	position: absolute;
	top: 25%;
	right: -16px;
	transform: translateY(-50%) rotate(-90deg);
}
.left::before {
	position: absolute;
	top: 24%;
	left: -15px;
	transform: translateY(-50%) rotate(90deg);
}
.bottom::before {
	position: absolute;
	top: -15px;
	left: 50%;
	transform: translateX(-50%) rotate(180deg);
}
.top::before {
	position: absolute;
	top: 100%;
	right: 50%;
	transform: translateX(50%);
}
.error {
	background-color: var(--color-red-300);
}
.error::before {
	border-top: solid 8px var(--color-red-300);
}
.notice {
	background-color: #090909ff;
}
.notice::before {
	border-top: solid 8px #090909ff;
}
</style>
