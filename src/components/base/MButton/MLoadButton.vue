<template>
	<div class="button">
		<div class="loading"></div>
	</div>
</template>

<style scoped>
.button {
	min-width: 40px;
	width: 80px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 4px;
	border: 1px solid var(--color-grey-400);
	cursor: pointer;
}
.loading {
	border: 4px solid #f3f3f3;
	border-top: 4px solid var(--color-light-green-400);
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 2s linear infinite;
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
