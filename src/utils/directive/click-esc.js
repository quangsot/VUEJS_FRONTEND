export default {
	beforeMount(el, binding) {
		el._keydownCallback = (event) => {
			if (event.key === "esc") {
				// kiểm tra phím Ctrl + S
				event.preventDefault(); // Ngăn chặn việc lưu trang
				binding.value(); // Gọi hàm callback trong directive
			}
		};
		document.addEventListener("keydown", el._keydownCallback);
	},
	unmounted(el, binding) {
		document.removeEventListener("keydown", el._keydownCallback);
		delete el._keydownCallback;
	},
};
