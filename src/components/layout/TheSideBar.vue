<!-- author: Trương Mạnh Quang (15/7/2023) -->
<template>
	<div
		v-if="!store.getters.getIsCloseSidebar"
		class="sidebar full"
	>
		<div class="top-sidebar">
			<div class="pointer toggle-icon"></div>
			<img
				class="pointer"
				src="../../assets/Logo_App.svg"
				alt="logo"
			/>
		</div>
		<div class="content-sidebar">
			<!-- overview -->
			<RouterLink to="/">
				<ItemMenu
					:text="_resources.ItemMenu.overview"
					icon="overview-icon"
					:isActive="$route.fullPath.includes('overview')"
				/>
			</RouterLink>
			<!-- overview -->
			<RouterLink to="/employee">
				<ItemMenu
					:text="_resources.ItemMenu.cash"
					icon="money-bag-icon"
					:isActive="$route.fullPath.includes('employee')"
				/>
			</RouterLink>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.deposits"
				icon="bank-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.purchase"
				icon="hand-bag-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.sell"
				icon="cart-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.invoiceManagement"
				icon="bill-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.warehouse"
				icon="warehouse-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.tools"
				icon="tools-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.fixedAsset"
				icon="fixed-assets-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.tax"
				icon="tax-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.price"
				icon="price-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.synthetic"
				icon="synthetic-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.budget"
				icon="budget-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.report"
				icon="finance-report-icon"
			/>
			<!-- overview -->
			<ItemMenu
				:text="_resources.ItemMenu.financialAnalysis"
				icon="finance-analysis-icon"
			/>
		</div>
	</div>
	<div
		v-if="store.getters.getIsCloseSidebar"
		class="sidebar compact"
	>
		<div class="top-sidebar">
			<div
				@click="() => store.commit('mutationSetIsCloseSidebar', false)"
				class="pointer collapse-black-icon"
			></div>
		</div>
		<div class="content-sidebar">
			<!-- overview -->
			<RouterLink to="/overview">
				<ItemMenu
					icon="overview-icon"
					:isActive="$route.fullPath.includes('overview')"
				/>
			</RouterLink>
			<!-- overview -->
			<RouterLink to="/employee">
				<ItemMenu
					icon="money-bag-icon"
					:isActive="$route.fullPath.includes('employee')"
				/>
			</RouterLink>
			<!-- overview -->
			<ItemMenu icon="bank-icon" />
			<!-- overview -->
			<ItemMenu icon="hand-bag-icon" />
			<!-- overview -->
			<ItemMenu icon="cart-icon" />
			<!-- overview -->
			<ItemMenu icon="bill-icon" />
			<!-- overview -->
			<ItemMenu icon="warehouse-icon" />
			<!-- overview -->
			<ItemMenu icon="tools-icon" />
			<!-- overview -->
			<ItemMenu icon="fixed-assets-icon" />
			<!-- overview -->
			<ItemMenu icon="tax-icon" />
			<!-- overview -->
			<ItemMenu icon="price-icon" />
			<!-- overview -->
			<ItemMenu icon="synthetic-icon" />
			<!-- overview -->
			<ItemMenu icon="budget-icon" />
			<!-- overview -->
			<ItemMenu icon="finance-report-icon" />
			<!-- overview -->
			<ItemMenu icon="finance-analysis-icon" />
		</div>
	</div>
</template>

<script setup>
import ItemMenu from "@/components/base/MMenu/MItemMenu.vue";
import { useStore } from "vuex";

const store = useStore();
</script>
<style scoped>
.compact {
	padding-top: 12px;
	width: 56px;
	overflow-x: hidden;
}
.full {
	min-width: 200px;
	white-space: nowrap;
}
.sidebar {
	background-color: var(--color-grey-900);
	height: 100vh;
	overflow-y: auto;
}
.top-sidebar {
	background-color: var(--color-grey-900);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	padding: 8px 0;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 1;
}
.sidebar .top-sidebar img {
	height: 32px;
}
.content-sidebar {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
