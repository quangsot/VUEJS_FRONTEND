/*
 * author: Trương Mạnh Quang (15/07/2023)
 */
import { createRouter, createWebHistory } from "vue-router";
import EmployeeView from "../view/employee-page/EmployeeView.vue";
import Overview from "../view/OverviewView.vue";

const routes = [
	{
		path: "/employee",
		name: "empolyee",
		component: EmployeeView,
	},
	{
		path: "/",
		name: "ovreview",
		component: Overview,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
