const action = {
	Add: "Add",
	Edit: "Edit",
	Delete: "Delete",
	Copy: "Copy",
};
const gender = {
	Male: 0,
	Female: 1,
	Orther: 2,
};
const genderName = ["Nam", "Nữ", "Khác"];
const typeTooltip = {
	error: "error",
	notice: "notice",
};
const typeDialog = {
	notice: "notice",
	confirm: "confirm",
	notice_confirm: "notice-confirm",
};
const typeInput = {
	text: "text",
	number: "number",
	date: "date",
};
const tabIndex = {
	code: 1,
	fullName: 2,
	department: 3,
	position: 4,
	dateOfBirth: 5,
	gender: [6, 7, 8],
	identityNumber: 9,
	identityDate: 10,
	identityPlace: 11,
	address: 12,
	phoneNumber: 13,
	landlinePhone: 14,
	email: 15,
	bankAccount: 16,
	bankName: 17,
	bankAddress: 18,
};
export default {
	action,
	typeTooltip,
	gender,
	genderName,
	typeDialog,
	typeInput,
	tabIndex,
};
