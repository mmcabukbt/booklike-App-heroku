<script setup>
import { inject, watch, ref, onMounted } from 'vue';
import watchItems from '../composables/watchItems';
import BookmarkItem from './BookmarkItem.vue';

const AppAxios = inject('AppAxios');
const { selectedMenu } = defineProps({
	selectedMenu: Object
});

const bookmarkList = ref([]);

const fetchList = () => {
	const queryString = selectedMenu.id > -1 ?
		`/bookmarks?categoriesId=${selectedMenu.id}&_expand=users&_expand=categories`
		: `/bookmarks?_expand=users&_expand=categories`;
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
		<!-- <pre>selectedMenu: {{ selectedMenu }}</pre> -->
		<BookmarkItem
			v-for="bookmarkItem in bookmarkList"
			:key="bookmarkItem.id"
			:bookmarkItem="bookmarkItem"
		/>
	</div>
</template>