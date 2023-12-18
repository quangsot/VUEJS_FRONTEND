/**
 * hàm xóa tất cả các thuộc tính bị null hoặc rỗng ra khỏi đối tượng
 * @param {} obj đối tượng cần clear
 * @returns đối tượng đã được clear
 * author: Trương Mạnh Quang (29/8/2023)
 */
function clearObj(obj) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			if (value === null || value === "") {
				delete obj[key];
			}
		}
	}
	return obj;
}
export { clearObj };
