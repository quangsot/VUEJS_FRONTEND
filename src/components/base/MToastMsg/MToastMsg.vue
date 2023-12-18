<template>
	<div class="toast-msg">
		<div class="left">
			<div
				class="left-icon"
				:class="notify.icon"
			></div>
			<p :class="notify.color">{{ notify.title }}</p>
			<span>{{ notify.content }}</span>
		</div>
		<div class="right">
			<div
				@click="closeToastMsg"
				class="right-icon cancel-small-icon"
			></div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps(["notify"]);
const emit = defineEmits(["closeToastMsg"]);
onMounted(() => {
	setTimeout(() => emit("closeToastMsg"), 3000);
});
/**
 * hàm đóng toastMsg
 * author: Trương Mạnh Quang (26/7/2023)
 */
const closeToastMsg = () => {
	emit("closeToastMsg");
};
</script>

<style scoped>
.toast-msg {
	height: 56px;
	position: fixed;
	top: -100px;
	left: 50%;
	transform: translateX(-50%);
	background-color: white;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 24px;
	border-radius: 4px;
	box-shadow: 0 0 16px rgba(23, 27, 42, 0.24);
	animation: slideDown 1s ease forwards;
	z-index: 7;
}
.left {
	max-width: 500px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.left-icon {
	margin-right: 10px;
}
.left p,
.left span {
	font-size: 14px;
	font-weight: 400;
}
.left p {
	margin-right: 10px;
}
.left span {
	margin-right: 10px;
}
.left .feature {
	font-size: 14px;
	font-weight: 500;
}
.left .feature a {
	margin: auto 0;
	text-decoration: underline;
}
.right-icon {
	cursor: pointer;
	margin: auto 0;
}
@keyframes slideDown {
	to {
		top: 20px;
	}
}
</style>
