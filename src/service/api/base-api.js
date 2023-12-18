// author: Trương Mạnh Quang (24/7/2023)
import axios from "axios";
import _resource from "@/utils/helper/resource";
import { cleanUrlParams } from "@/utils/helper/clean-url-param.js";
import { clearObj } from "@/utils/helper/clean-obj.js";
const baseURL = "https://localhost:7062/v1/api/";
const configApi = {
	headers: {
		"Content-Type": "application/json; charset=utf-8",
		// "Access-Control-Allow-Origin": "*",
	},
};

//========== Interceptor =======//

/**
 * hàm xử lý lỗi api chung trước khi vào try catch
 * author: Trương Mạnh Quang (8/9/2023)
 */
const handleErrorApi = (err) => {
	if (!err.response) {
		err.response.data.UserMessage = [_resource.VI.errorInternet];
	} else if (err.response.status >= 500) {
		err.response.data.UserMessage = [_resource.VI.errorApp];
	}

	return Promise.reject(err);
};

axios.interceptors.response.use((res) => res, handleErrorApi);

//========== Employee ==========//
const urlEmployee = `${baseURL}Employees/`;

/**
 * hàm call api lấy mã mới cho nhân viên
 * author: Trương Mạnh Quang (9/8/2023)
 * @returns mã nhân viên mới
 */
const getNewCode = () => {
	const urlNewCode = `${urlEmployee}NewCode`;
	return axios.get(urlNewCode, configApi);
};
/**
 * hàm lấy mã mới dựa trên mã cũ
 * @param {string} oldCode mã cũ
 * @returns mã mới = mã cũ + 1
 * author: Trương Mạnh Quang (31/8/2023)
 */
const getNextCode = (oldCode) => {
	let urlNextCode = "";
	if (typeof oldCode === "string") urlNextCode = `${urlEmployee}NextCode?oldCode=${oldCode}`;
	return axios.get(urlNextCode, configApi);
};
/**
 * hàm call Api lấy danh sách thông tin nhân viên
 * author: Trương Mạnh Quang (24/7/2023)
 * @returns Promise response
 */
const getEmployees = () => {
	return axios.get(urlEmployee);
};

/**
 * hàm filter danh sách nhân viên
 * author: Trương Mạnh Quang (28/7/2023)
 * @param {*} pageSize kích thước trang
 * @param {*} pageNumber index của trang
 * @returns Promise response
 */
const getFilterEmployees = (searchKey, pageSize, pageNumber) => {
	const urlFilter = `${urlEmployee}filter?searchKey=${searchKey}&pageSize=${pageSize}&pageNum=${pageNumber}`;
	const urlFilterCleaned = cleanUrlParams(urlFilter);
	return axios.get(urlFilterCleaned, configApi);
};
/**
 * hàm call Api thêm nhân viên mới
 * author: Trương Mạnh Quang (27/7/2023)
 * @param {*} employee
 * @returns Promise response
 */
const insertEmployee = (employee) => {
	let employeeCleaned = clearObj(employee);
	return axios.post(urlEmployee, employeeCleaned, configApi);
};

/**
 * hàm call api sửa nhân viên
 * author: Trương Mạnh Quang (27/7/2023)
 * @param {*} employee nhân viên cần sửa
 * @returns Promise response
 */
const editEmployee = (employee) => {
	let id = employee.EmployeeId;
	let urlEditEmployee = `${urlEmployee}${id}`;
	let employeeCleaned = clearObj(employee);
	delete employeeCleaned.DepartmentName;
	delete employeeCleaned.PositionName;
	return axios.put(urlEditEmployee, employeeCleaned, configApi);
};
/**
 * hàm call api xóa nhân viên theo id
 * author: Trương Mạnh Quang (30/7/2023)
 * @param {*} employeeId mã định danh của nhân viên
 * @returns Promise response
 */
const deleteEmployee = (employeeId) => {
	let urlDeleteEmployee = `${urlEmployee}${employeeId}`;
	return axios.delete(urlDeleteEmployee, configApi);
};
/**
 * hàm call api xóa nhiều nhân viên theo id
 * @param {danh sách id nhân viên cần xóa} ids
 * @returns Promise response
 * author: Trương Mạnh Quang (30/7/2023)
 */
const deleteEmployees = (ids) => {
	return axios.delete(urlEmployee, { data: [...ids] }, configApi);
};

/**
 * hàm xuất file excel
 * @param {từ khóa tìm kiếm} searchKey
 * @returns Promise response
 * author: Trương Mạnh Quang (21/8/2023)
 */
const exportExcel = (searchKey) => {
	const urlExportExcel = `${urlEmployee}Excel`;
	return axios.get(urlExportExcel, { responseType: "arraybuffer" });
};

//========= Department ========//
const urlDepartment = `${baseURL}Department/`;

/**
 * hàm call api lấy thông tin phòng ban
 * author: Trương Mạnh Quang (9/8/2023)
 * @returns Promise response
 */
const getDepartments = () => {
	return axios.get(urlDepartment);
};

//========= Position ========//
const urlPosition = `${baseURL}Position/`;

/**
 * hàm call api lấy thông tin chức vụ
 * author: Trương Mạnh Quang (9/8/2023)
 * @returns Promise response
 */
const getPositions = () => {
	return axios.get(urlPosition);
};

export default {
	getNewCode,
	getNextCode,
	getEmployees,
	getFilterEmployees,
	insertEmployee,
	editEmployee,
	deleteEmployee,
	getDepartments,
	getPositions,
	deleteEmployees,
	exportExcel,
};
