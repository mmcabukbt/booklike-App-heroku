<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import BookmarkItems from "../components/BookmarkItems.vue";

const { getters } = useStore();
const AppAxios = inject('AppAxios');
const bookmarkList = ref([]);
const selectedMenu = reactive({});

watch(selectedMenu,
	({ id }) => {
		const queryString = id > -1 ?
			`/bookmarks?categoriesId=${id}&_expand=users&_expand=categories`
			: `/bookmarks?_expand=users&_expand=categories`;
		AppAxios.get(queryString).then(bookmarks => {
			bookmarkList.value = bookmarks.data;
		});
	});

watch(
	() => getters.getNewBookmark_,
	(newItem) => {
		if (selectedMenu.id === -1 || selectedMenu.id === newItem.categoriesId) {
			bookmarkList.value.push(newItem);
		}
	});
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
			<div class="p-2 flex flex-wrap gap-4">
				<!-- <pre>sidebarList.value: {{ sidebarList }}</pre> -->
				<BookmarkItems :selectedMenu="selectedMenu" />
			</div>
		</div>
	</div>
</template>