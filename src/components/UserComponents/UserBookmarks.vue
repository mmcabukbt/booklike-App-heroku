<script setup>
import { inject, watch, ref, onMounted } from 'vue';
import { useStore } from "vuex";
import watchItems from '../../composables/watchItems';
import BookmarkItem from "../BookmarkItem.vue";

const { getters } = useStore();
const AppAxios = inject('AppAxios');
const { selectedMenu } = defineProps({
	selectedMenu: Object
});
const bookmarkList = ref([]);

const fetchList = () => {
	const queryString = selectedMenu.id > -1 ?
		`/bookmarks?categoriesId=${selectedMenu.id}&usersId=${getters.getUser_.id}&_expand=users&_expand=categories`
		: `/bookmarks?usersId=${getters.getUser_.id}&_expand=users&_expand=categories`;
	AppAxios.get(queryString).then(bookmarks => {
		bookmarkList.value = bookmarks.data;
	});
}

watch(selectedMenu, () => { fetchList() });
onMounted(() => { fetchList() });
watchItems(selectedMenu, bookmarkList);
</script>

<template>
	<div class="p-2 flex flex-wrap gap-4">
		<BookmarkItem
			v-for="bookmarkItem in bookmarkList"
			:key="bookmarkItem.id"
			:bookmarkItem="bookmarkItem"
		/>
	</div>
</template>