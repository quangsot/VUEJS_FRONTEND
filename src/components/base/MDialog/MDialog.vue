<!-- Trương Mạnh Quang (21/7/2023) -->
<template>
	<div class="dialog-wrapper">
		<div class="dialog-container">
			<div>
				<div class="header">
					<div class="title">{{ title }}</div>
					<div
						@click="closeDialogPopup"
						class="cancel-medium-icon"
					></div>
				</div>
				<div class="content">
					<div
						v-if="type == 'notice'"
						class="error-notify-icon"
					></div>
					<div
						v-if="type == 'confirm'"
						class="warning-big-icon"
					></div>
					<div class="html">
						<div v-html="contentDialog"></div>
					</div>
				</div>
			</div>

			<div class="footer">
				<div
					v-if="type != 'notice'"
					:class="[type != 'confirm' ? 'not-confirm' : 'confirm']"
				>
					<BaseButton
						ref="yesBtn"
						:isFocus="true"
						@click="confirmAnswer(_, true)"
						:text="_resources.feature.yes"
						:class="_resources.typeButton.yesButton"
					/>
					<BaseButton
						@click="confirmAnswer(_, false)"
						:text="_resources.feature.no"
						:class="_resources.typeButton.cancelButton"
					/>
				</div>
				<div
					v-if="type != 'confirm'"
					class="notice"
				>
					<BaseButton
						:isFocus="type == 'notice'"
						@click="handleCancel"
						@keydown.tab.prevent="handleFocusAgain"
						:text="_resources.feature.close"
						:class="_resources.typeButton.cancelButton"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
	title: { type: String, default: "" },
	type: { type: String, default: "notice" }, // notice: Thông báo (Có nút Đóng), confirm: Xác nhận (Có nút Có và Không), notice-confirm: Thông báo và xác nhận (có cả 3 nút)
	contentDialog: { type: String, default: "" },
	// handleConfirm: { type: Function },
	// handleReject: { type: Function },
	// handleCancel: { type: Function },
});

const emit = defineEmits(["closeDialogPopup", "answerYes", "answerNo", "answerCancel"]);
const yesBtn = ref(null);
/**
 * hàm focus lại ở nút cancel
 * author: Trương Mạnh Quang (7/9/2023)
 */
const handleFocusAgain = () => {
	if (props.type == "notice-confirm") yesBtn.value.handleFocusBtn();
};

/**
 * hàm đóng dailog
 * author: Trương Mạnh Quang (21/7/2023)
 */
const closeDialogPopup = () => {
	emit("closeDialogPopup");
};
/**
 * hàm xác nhận
 * author: Trương Mạnh Quang (30/7/2023)
 */
const confirmAnswer = (_, answer) => {
	if (answer) {
		emit("answerYes");
	} else {
		emit("answerNo");
	}
};
/**
 * hàm chọn nút Đóng
 * author: Trương Mạnh Quang (28/8/2023)
 */
const handleCancel = () => {
	emit("answerCancel");
};
</script>

<style scoped>
.dialog-wrapper {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(128, 128, 128, 0.308);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 6;
}
.dialog-container {
	padding: 20px;
	width: 500px;
	min-height: 180px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 4px;
	border: none;
}
.header {
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
}
.title {
	font-size: 20px;
	font-weight: 700;
}
.content {
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 8px;
}
.html {
	margin-left: 8px;
}
.cancel-medium-icon {
	cursor: pointer;
}
.footer {
	margin-top: 32px;
	display: flex;
	justify-content: end;
	gap: 213px;
	flex-direction: row-reverse;
}
.notice {
	display: flex;
	justify-content: right;
}
.not-confirm {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 8px;
	flex-direction: row-reverse;
}
.confirm {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
}
</style>
