/**
 * hàm xử lý những thông tin không cần thiết trong param
 * @param {*} url đường dẫn url
 * @returns đường dẫn url
 */
export function cleanUrlParams(url) {
	// tạo đối tượng url
	let urlObj = new URL(url);
	// lấy param từ url
	let params = new URLSearchParams(urlObj.search);
	// tạo đối tượng chứa các param của url;
	let objectParam = {};
	// lấy các param trong params chuyển sang objectParam
	for (let param of params) {
		let key = param[0];
		let value = param[1];
		objectParam[key] = value;
	}
	// duyệt mảng nếu có param rỗng thì xóa khỏi params
	for (let pro in objectParam) {
		if (!objectParam[pro] || objectParam[pro] == "null" || objectParam[pro] == "undefined") {
			params.delete(pro);
		}
	}
	// chuyển params từ object thành chuỗi
	urlObj.search = params.toString();
	return urlObj.toString();
}
