import { createStore } from "vuex";
import baseApi from "@/service/api/base-api.js";
import { parseDMY } from "@/utils/helper/parse-datetime";
export default createStore({
	state: {
		isCloseSidebar: false,
		employees: [],
		department: [],
		position: [],
		isLoading: false,
		isLoadingExcel: false,
		dataStatus: true,
		filter: {
			totalPage: 0,
			totalRecord: 0,
			currentPage: 0,
			currentPageRecords: 0,
		},
		searchKey: "",
		pageSize: 10,
		pageNumber: 1,
	},
	getters: {
		/**
		 * hàm lấy danh sách phòng ban
		 * author: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 * @returns danh sách phòng ban
		 */
		getDepartment: (state) => state.department,
		/**
		 * hàm lấy danh sách chức vụ
		 * author: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 * @returns danh sách chức vu
		 */
		getPosition: (state) => state.position,
		/**
		 * hàm lấy tất cả nhân viên từ store để hiển thị.
		 * author: Trương Mạnh Quang (23/7/2023)
		 * @param {*} state
		 * @returns danh sách nhân viên
		 */
		getEmployeesToRender: (state) => {
			let listEmployeeNeeded = [];
			state.employees.forEach((element) => {
				listEmployeeNeeded.push(element);
			});
			return listEmployeeNeeded;
		},
		/**
		 * hàm lấy kích thước của trang hiện tại
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @returns kích thước của trang hiện tại
		 */
		getPageSize: (state) => state.pageSize,
		/**
		 * hàm trả về kích thước của trang hiện tại
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @returns index của trang hiện tại
		 */
		getPageNumber: (state) => state.pageNumber,
		/**
		 * hàm lấy tổng số trang
		 * author: Trương Mạnh Quang (29/7/2023)
		 * @param {*} state
		 * @returns tổng số trang của danh sách nhân viên
		 */
		getTotalPage: (state) => state.filter.totalPage,
		/**
		 * hàm lấy tổng số bản ghi
		 * author: Trương Mạnh Quang (29/7/2023)
		 * @param {*} state
		 * @returns tổng số bản ghi của danh sách nhân viên
		 */
		getTotalRecord: (state) => state.filter.totalRecord,
		/**
		 * hàm lấu số bản ghi hiện tại trên trang
		 * @param {*} state
		 * @returns số bản ghi hiện tại trên trang
		 * author: Trương Mạnh Quang (14/8/2023)
		 */
		getCurrentPageRecord: (state) => state.filter.currentPageRecords,
		/**
		 * hàm lấy giá trị của từ khóa tìm kiếm
		 * @param {*} state
		 * @returns giá trị của từ khóa tìm kiếm
		 */
		getSearchKey: (state) => state.searchKey,
		/**
		 * hàm lấy giá trị loading từ store.
		 * author: Trương Mạnh Quang (24/7/2023)
		 * @param {*} state
		 * @returns giá trị loading true or false
		 */
		getLoading: (state) => state.isLoading,
		/**
		 * hàm lấy trạng thái của dữ liệu
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @returns load data ? true : flase
		 */
		getDataStatus: (state) => state.dataStatus,
		/**
		 * lấy giá trị trạng thái của sidebar
		 * author: Trương Mạnh Quang (30/1/2023)
		 * @param {*} state
		 * @returns trạng thái của sidebar
		 */
		getIsCloseSidebar: (state) => state.isCloseSidebar,
	},
	mutations: {
		/**
		 * hàm set giá trị cho department
		 * author: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 * @param {Danh sách phòng} department
		 */
		mutationSetDepartment: (state, department) => {
			state.department = department;
		},
		/**
		 * hàm set giá trị cho position
		 * author: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 * @param {Danh sách chức vụ} position
		 */
		mutationSetPosition: (state, position) => {
			state.position = position;
		},
		/**
		 * hàm lưu danh sách nhân viên vào store.
		 * author: Trương Mạnh Quang(24/7/2023)
		 * @param {*} state
		 * @param {*} employees
		 */
		mutationSetEmployees: (state, employees) => {
			state.employees = employees;
		},
		/**
		 * hàm set giá trị cho các thuộc tính filter
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @param {*} objFilter đối tượng filter, chứa các thông tin cần cho phân trang
		 */
		mutationSetFilter: (state, objFilter) => {
			state.filter = objFilter;
		},
		/**
		 * hàm set giá trị của cho pageSize
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @param {*} size kích thước trang
		 */
		mutationSetPageSize: (state, size) => {
			state.pageSize = size;
		},
		/**
		 * hàm set giá trị cho pageNUmber
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @param {*} num index của trang
		 */
		mutationSetPageNumber: (state, num) => {
			state.pageNumber = num;
		},
		/**
		 * hàm set giá trị cho searchKey
		 * @param {*} state
		 * @param {*} searchKey từ khóa cần tìm kiếm
		 */
		mutationSetSearchKey: (state, key) => {
			state.searchKey = key;
		},
		/**
		 * hàm thay đổi trạng thái loading.
		 * author: Trương Mạnh Quang (24/7/2023)
		 * @param {*} state
		 * @param {*} status
		 */
		mutationLoading: (state, status) => {
			state.isLoading = status;
		},
		/**
		 * hàm set trạng thái của dữ liệu
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @param {*} status trạng thái của data
		 */
		mutationSetDataStatus: (state, status) => {
			state.dataStatus = status;
		},
		/**
		 * hàm set trạng thái cho sidebar
		 * @param {*} state
		 * @param {trạng thái của sidebar} status
		 */
		mutationSetIsCloseSidebar: (state, status) => {
			state.isCloseSidebar = status;
		},
	},
	actions: {
		/**
		 * hàm lấy tất cả nhân viên.
		 * author: Trương Mạnh Quang (23/1/2023)
		 * @param {*} state
		 * @returns {employees} danh sách nhân viên
		 */
		actionGetEmployees: async (state) => {
			try {
				state.commit("mutationLoading", true);
				const response = await baseApi.getEmployees();
				state.commit("mutationLoading", false);
				state.commit("mutationSetDataStatus", true);
				// set employee
				state.commit("mutationSetEmployees", response.data);
			} catch (error) {
				// lỗi không lấy được data
				state.commit("mutationSetDataStatus", false);
				console.log(error);
			}
		},
		/**
		 * hàm lọc danh sách nhân viên
		 * author: Trương Mạnh Quang (28/7/2023)
		 * @param {*} state
		 * @param {*} pageSize kích thước trang
		 * @param {*} pageNumber index của trang
		 */
		actionFilterEmployees: async (state) => {
			try {
				state.commit("mutationLoading", true);
				const response = await baseApi.getFilterEmployees(state.state.searchKey, state.state.pageSize, state.state.pageNumber);
				state.commit("mutationLoading", false);
				state.commit("mutationSetDataStatus", true);
				state.commit("mutationSetEmployees", response.data.Employees);
				// set filter obj
				state.commit("mutationSetFilter", {
					totalPage: response.data.TotalPages,
					totalRecord: response.data.TotalRecords,
					currentPage: response.data.CurrentPage,
					currentPageRecords: response.data.CurrentRecords,
				});
			} catch (error) {
				state.commit("mutationLoading", false);
				// lỗi không lấy được data
				state.commit("mutationSetDataStatus", false);
				console.log(error);
			}
		},
		/**
		 * hàm export file excel
		 * @param {*} state
		 * author: Trương Mạnh Quang (21/8/2023)
		 */
		actionExportExcel: async (state, fileName) => {
			try {
				state.state.isLoadingExcel = true;
				const response = await baseApi.exportExcel(state.state.searchKey);
				const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = `${fileName}.xlsx`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				state.state.isLoadingExcel = false;
			} catch (error) {
				// lỗi không lấy được data
				state.commit("mutationSetDataStatus", false);
				state.state.isLoadingExcel = false;
				console.log(error);
			}
		},

		/**
		 * hàm gọi api lấy danh sách phòng ban
		 * author: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 */
		actionGetDepartment: async (state) => {
			try {
				const response = await baseApi.getDepartments();
				state.commit("mutationSetDepartment", response.data);
			} catch (error) {
				// lỗi không lấy được data
				state.commit("mutationSetDataStatus", false);
				console.log(error);
			}
		},
		/**
		 * hàm gọi api lấy thông tin chức danh
		 * auhtor: Trương Mạnh Quang (9/8/2023)
		 * @param {*} state
		 */
		actionGetPosition: async (state) => {
			try {
				const response = await baseApi.getPositions();
				state.commit("mutationSetPosition", response.data);
			} catch (error) {
				// lỗi không lấy được data
				state.commit("mutationSetDataStatus", false);
				console.log(error);
			}
		},
	},
	modules: {},
});
