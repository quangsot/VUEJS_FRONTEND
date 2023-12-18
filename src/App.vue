<!-- author: Trương Mạnh Quang (15/07/2023) -->

<template>
	<div class="main-page">
		<TheSideBar></TheSideBar>
		<div>
			<TheHeader></TheHeader>
			<TheBody></TheBody>
		</div>
	</div>
</template>
<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheBody from "./components/layout/TheBody.vue";
import TheSideBar from "./components/layout/TheSideBar.vue";
</script>
<style scoped>
.main-page {
	display: flex;
	width: 100%;
	height: 100%;
}
</style>
<style>
@import url(./css/main.css);
</style>
