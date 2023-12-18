/*
 * author: Trương Mạnh Quang (15/07/2023)
 */

const VI = {
	ItemMenu: {
		overview: "Tổng quan",
		cash: "Nhân viên",
		deposits: "Tiền gửi",
		purchase: "Mua hàng",
		sell: "Bán hàng",
		invoiceManagement: "Quản lý hóa đơn",
		warehouse: "Kho",
		tools: "Công cụ dụng cụ",
		fixedAsset: "Tài sản cố định",
		tax: "Thuế",
		price: "Giá thành",
		synthetic: "Tổng hợp",
		budget: "Ngân sách",
		report: "Báo cáo",
		financialAnalysis: "Phân tích tài chính",
	},
	title: {
		web: "Nhân viên",
		app: "CÔNG TY TNHH SONG VIỆT - Misatest",
		user: "Trương Mạnh Quang",
		pageEmployeeTitle: "Nhân viên",
		popupAddEmployeeTitle: "Thêm thông tin nhân viên",
		popupEditEmployeeTitle: "Sửa thông tin nhân viên",
		popupCopyEmployeeTitle: "Nhân bản thông tin nhân viên",
		toastMsgSuccess: "Thành công",
		toastMsgFail: "Thất bại",
		dialog: "Thông báo",
	},
	feature: {
		addEmployee: "Thêm mới nhân viên",
		close: "Đóng",
		no: "Không",
		yes: "Có",
		duplicate: "Nhân bản",
		delete: "Xóa",
		stopUsing: "Ngừng sử dụng",
		cancel: "Hủy",
		save: "Cất",
		saveAndAdd: "Cất và Thêm",
		selected: "Đã chọn",
		unSelected: "Bỏ chọn",
		exit: "Thoát",
		guide: "Hướng dẫn",
		ctrlS: "Ctrl + S",
		ctrlShiftS: "Ctrl + Shift + S",
		exportExcel: "Xuất Excel",
		reload: "Tải lại dữ liệu",
	},
	notice: {
		toastMsgAddSuccess: "Lưu thành công",
		toastMsgAddFail: "Lưu thất bại",
		toastMsgEditSuccess: "Sửa thành công",
		toastMsgEditFail: "Sửa thất bại",
		toastMsgDeleteSuccess: "Xóa thành công",
		toastMsgDeleteFail: "Xóa thất bại",
		toastMsgNoChange: "Không có sự thay dổi thông tin",
		loadEmployeeFail: "Tải thông tin nhân viên thất bại!",
		deleteEmployee: {
			content: `<p class="fsize-16">Bạn có thực sự muốn xóa Nhân viên <strong class="fsize-18">&lt; code &gt;</strong> không?</p>`,
		},
		deleteEmployees: {
			fontContent: "Bạn có thực sự muốn xóa ",
			backContent: "nhân viên không?",
		},
		noticeSuccess: {
			icon: "successful-icon",
			color: "text-light-green",
			title: "Thành công",
		},
		noticeFail: {
			icon: "fail-icon",
			color: "text-red-500",
			title: "Thất bại",
		},
		noticeWarn: {
			icon: "warning-small-icon",
			color: "text-orange",
			title: "Cảnh báo",
		},
		notChangeData: "Dữ liệu đã thay đổi. Bạn có muốn cất không?",
	},
	actionStatus: {
		success: "success",
		fail: "fail",
		warn: "warn",
	},
	tableHeader: {
		employeeCode: "MÃ NHÂN VIÊN",
		employeeName: "TÊN NHÂN VIÊN",
		gender: "GIỚI TÍNH",
		dateOfBirth: "NGÀY SINH",
		citizenIdentification: "SỐ CMND",
		jobTitle: "CHỨC DANH",
		unitName: "TÊN ĐƠN VỊ",
		accountNumber: "SỐ TÀI KHOẢN",
		bankName: "TÊN NGÂN HÀNG",
		bankAddress: "CHI NHÁNH TK NGÂN HÀNG",
		feature: "CHỨC NĂNG",
		property: {
			employeeId: "EmployeeId",
			employeeCode: "EmployeeCode",
			fullName: "FullName",
			gender: "Gender",
			genderName: "GenderName",
			dateOfBirth: "DateOfBirth",
			address: "Address",
			phoneNumber: "PhoneNumber",
			landlinePhone: "LandlinePhone",
			email: "Email",
			identityNumber: "IdentityNumber",
			identityDate: "IdentityDate",
			identityPlace: "IdentityPlace",
			positionId: "PositionId",
			positionName: "PositionName",
			departmentName: "DepartmentName",
			departmentId: "DepartmentId",
			bankAccount: "BankAccount",
			bankName: "BankName",
			bankAddress: "BankAddress",
		},
	},
	titleForm: {
		code: "Mã",
		name: "Tên",
		dateOfBirth: "Ngày sinh",
		gender: "Giới tính",
		department: "Đơn vị",
		position: "Chức danh",
		identityNumber: "Số CMND",
		identityDate: "Ngày cấp",
		identityPlace: "Nơi Cấp",
		address: "Địa chỉ",
		phoneNumber: "ĐT di động",
		landlinePhone: "ĐT cố định",
		email: "Email",
		bankAccount: "Tài khoản ngân hàng",
		bankName: "Tên ngân hàng",
		bankAddress: "Chi nhánh",
	},
	explainTitle: {
		identityNumber: "Số Chứng minh nhân dân",
		phoneNumber: "Điện thoại di động",
		landlinePhone: "Điện thoại cố định",
		bankAddress: "Chi nhánh tài khoản ngân hàng",
	},
	cssColumnTable: {
		text: "text-left",
		date: "text-center",
	},
	placeholder: {
		searchByCodeAndNameEmployee: "Tìm theo mã, tên nhân viên, số điện thoại",
		identityNumber: "012345678910",
		identityPlace: "Hải Phòng",
		address: "Hà nội",
		phoneNumber: "0123456789",
		landlinePhone: "(123) 456-789",
		email: "abc123@example.com",
		bankAccount: "0123456",
		bankName: "Vietcombank",
		bankAddress: "chi nhánh 6",
	},
	// Các loại button
	typeButton: {
		main: "btn-green pointer text-white width-auto",
		extraButton: "btn-white bd-grey-400 width-80",
		deleteMulti: "btn-white bg-hover-grey-100 bd-red-400 text-red width-80",
		cancelButton: "btn-red text-white width-80",
		yesButton: "btn-green text-white width-80",
	},
	// phân trang
	numOfPage: {
		employeePage: ["10", "20", "50", "100"],
	},
	tooltip: {
		error: {
			errorCode: "Mã không được để trống",
			errorName: "Tên không được để trống",
			errorDepartment: "Phòng ban không được để trống",
			errorPosition: "Chức danh không được để trống",
			errorDateOfBirthGreaterNow: "Ngày sinh không được lớn hơn ngày hiện tại",
			errorIdentityDateGreaterNow: "Ngày cấp không được lớn hơn ngày hiện tại",
		},
		position: {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		},
		type: {
			error: "error",
			notice: "notice",
		},
	},
	errorApp: "Đã có lỗi xảy ra, vui lòng liên hệ Misa để được hỗ trợ!",
	errorInternet: "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối Internet của bạn.",
	tooltipFeatureHeader: {
		utilsAndSetting: "Các tiện ích và thiết lập",
		help: "Giúp đỡ",
		notice: "Thông báo",
	},
	length: {
		max: {
			name: 100,
			phoneNumber: 50,
			landlinePhone: 50,
			bankAccount: 16,
		},
	},
	excelFile: {
		name: "Danh_sach_nhan_vien",
	},
};

export default {
	VI,
};