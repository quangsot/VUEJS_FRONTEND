<!-- author: Trương Mạnh Quang (15/7/2023) -->
<template>
	<div
		:class="store.getters.getIsCloseSidebar ? 'compact' : 'full'"
		class="body"
	>
		<router-view></router-view>
	</div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<style scoped>
.body {
	height: calc(100vh - 56px);
	min-width: 900px;
}
.compact {
	width: calc(100vw - 56px);
}
.full {
	width: calc(100vw - 200px);
}
</style>
