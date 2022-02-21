<script setup>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";

const { getters } = useStore();
const selectedMenu = reactive({});
const sidebarList = computed(() => {
	return [{ name_: "Tümünü göster", id: -1 }, ...getters.getCategories_]
}
)
onMounted(() => {
	// dispatch("fetchCategories");
	selectedMenu.id = -1
})
</script>

<template>
	<AppHeader />
	<div class="layout">
		<AppSidebar :menuItems="sidebarList" :selectedMenu="selectedMenu" />
		<div class="content">
			<router-view :selectedMenu="selectedMenu"></router-view>
		</div>
	</div>
</template>