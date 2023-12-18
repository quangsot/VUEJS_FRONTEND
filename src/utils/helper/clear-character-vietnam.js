/**
 * hàm xóa các kí tự đặc biệt của tiếng việt
 * @param {string} input chuỗi cần sửa
 * @returns chuỗi kí tự latinh
 * author: Trương Mạnh Quang (29/8/2023)
 */
function clearCharacterVietnam(input) {
	return input
		.toLowerCase() // Chuyển toàn bộ chuỗi thành kí tự thường
		.normalize("NFD") // Tách kí tự đặc biệt thành cơ sở và kí tự đặc biệt riêng lẻ
		.replace(/[\u0300-\u036f]/g, "") // Loại bỏ kí tự đặc biệt riêng lẻ
		.replace(/đ/g, "d")
		.replace(/\s+/g, " ") // Chuẩn hóa khoảng trắng
		.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
}
export { clearCharacterVietnam };
