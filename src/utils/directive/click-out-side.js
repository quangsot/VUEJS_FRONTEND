/**
 * Hàm bắt sự kiện click outside
 * author: Trương Mạnh Quang (18/7/2023)
 */
const clickOutSide = {
	beforeMount: (el, binding) => {
		el.clickOutSideEvent = (event) => {
			if (!(el == event.target || el.contains(event.target))) {
				binding.value(event);
				// binding.value(event, event.target);
			}
		};
		document.addEventListener("click", el.clickOutSideEvent, true);
	},
	unmounted: (el) => {
		document.removeEventListener("click", el.clickOutSideEvent, true);
	},
};
export default clickOutSide;
