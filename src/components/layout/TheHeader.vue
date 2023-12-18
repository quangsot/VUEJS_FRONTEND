<!-- author: Trương Mạnh Quang (15/7/2023) -->
<template>
	<div class="header">
		<div class="left-header">
			<div
				v-if="!store.getters.getIsCloseSidebar"
				@click="handleCloseSidebar"
				class="collapse-black-icon pointer"
			></div>
			<p class="pointer">{{ _resources.title.app }}</p>
			<div class="left-icon drop-icon pointer"></div>
		</div>
		<div class="right-header">
			<div class="feature-header">
				<div
					@mouseover="handleMouseOverSetting"
					@mouseleave="handleMouseLeaveSetting"
					class="setting pointer"
				>
					<div :class="checkHoverSetting ? 'setting-white-icon' : 'setting-grey-icon'"></div>
					<div class="wrapper-tooltip-setting">
						<Tooltip
							:content="_resources.tooltipFeatureHeader.utilsAndSetting"
							:positoin="_resources.tooltip.position.bottom"
						/>
					</div>
				</div>
				<div
					@mouseover="handleMouseOverQuestion"
					@mouseleave="handleMouseLeaveQuestion"
					class="question pointer"
				>
					<div :class="checkHoverQuestion ? 'question-white-icon' : 'question-grey-icon'"></div>
					<div class="wrapper-tooltip-question">
						<Tooltip
							:content="_resources.tooltipFeatureHeader.help"
							:positoin="_resources.tooltip.position.bottom"
						/>
					</div>
				</div>
				<div
					@mouseover="handleMouseOverBell"
					@mouseleave="handleMouseLeaveBell"
					class="bell pointer"
				>
					<div :class="checkHoverBell ? 'bell-white-icon' : 'bell-black-icon'"></div>
					<div class="wrapper-tooltip-notice">
						<Tooltip
							:content="_resources.tooltipFeatureHeader.notice"
							:positoin="_resources.tooltip.position.bottom"
						/>
					</div>
				</div>
			</div>
			<div class="user pointer">
				<img
					src="../../assets/img//default-avatar.jpg"
					alt="avatar"
				/>
				<p class="username">{{ _resources.title.user }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const handleCloseSidebar = () => {
	store.commit("mutationSetIsCloseSidebar", true);
};

// check hover setting icon
// TMQuang (15/7/2023)
let checkHoverSetting = ref(false);
const handleMouseOverSetting = () => {
	checkHoverSetting.value = true;
};
const handleMouseLeaveSetting = () => {
	checkHoverSetting.value = false;
};

// check hover question icon
// TMQuang (15/7/2023)
let checkHoverQuestion = ref(false);

const handleMouseOverQuestion = () => {
	checkHoverQuestion.value = true;
};
const handleMouseLeaveQuestion = () => {
	checkHoverQuestion.value = false;
};

// check hover bell icon
// TMQuang (15/7/2023)
let checkHoverBell = ref(false);

const handleMouseOverBell = () => {
	checkHoverBell.value = true;
};
const handleMouseLeaveBell = () => {
	checkHoverBell.value = false;
};
</script>

<style scoped>
.header {
	height: 56px;
	width: 100%;
	padding: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.left-header {
	display: flex;
	align-items: center;
	gap: 16px;
}
.left-header .left-icon {
	transform: rotate(90deg);
}
.right-header {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 36px;
}
.right-header .feature-header {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 14px;
}
.right-header .user {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
}
.user img {
	width: 32px;
	height: 32px;
	border: 1px solid var(--color-grey-400);
	border-radius: 100rem;
}
.setting {
	width: 40px;
	height: 36px;
	border: none;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.setting:hover {
	background-color: #000000;
}
.wrapper-tooltip-setting {
	display: none;
	position: absolute;
	top: 45px;
	left: -59px;
}
.setting:hover .wrapper-tooltip-setting {
	display: block;
}
.question {
	width: 40px;
	height: 36px;
	border: none;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.question:hover {
	background-color: #000000;
}
.wrapper-tooltip-question {
	display: none;
	position: absolute;
	top: 45px;
	left: -11px;
}
.question:hover .wrapper-tooltip-question {
	display: block;
}
.bell {
	width: 40px;
	height: 36px;
	border: none;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.bell:hover {
	background-color: #000000;
}
.wrapper-tooltip-notice {
	display: none;
	position: absolute;
	top: 45px;
	left: -20px;
}
.bell:hover .wrapper-tooltip-notice {
	display: block;
}
</style>
