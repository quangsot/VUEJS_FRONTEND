/**
 * hàm trả về ngày tháng năm đã được định dạng
 * author: Trương Mạnh Quang (24/7/2023)
 * @param {*} datetime ví dụ: 2023-07-18T00:00:00
 * @returns dd/mm/yy
 */
function parseDMY(datetime) {
	if (!datetime) return "";
	var dateObj = new Date(datetime);

	var date = dateObj.getDate();
	var month = dateObj.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 nên cần cộng thêm 1
	var year = dateObj.getFullYear() % 10000; // Lấy 2 chữ số cuối của năm

	// Định dạng lại thành chuỗi "dd/mm/yy"
	var newDatetime = date.toString().padStart(2, "0") + "/" + month.toString().padStart(2, "0") + "/" + year.toString();

	return newDatetime;
}
function convertDateFormatInDB(inputDate) {
	const parts = inputDate.split("/");
	if (parts.length !== 3) {
		throw new Error("Please use dd/mm/yyyy.");
	}

	const day = parseInt(parts[0]);
	const month = parseInt(parts[1]);
	const year = parseInt(parts[2]);

	if (isNaN(day) || isNaN(month) || isNaN(year)) {
		throw new Error("Invalid date components.");
	}

	const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T00:00:00`;
	return formattedDate;
}

export { convertDateFormatInDB, parseDMY };
