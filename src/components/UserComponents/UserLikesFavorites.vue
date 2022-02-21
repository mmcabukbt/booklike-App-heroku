<script setup>
import { inject, watch, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import watchItems from '../../composables/watchItems';
import BookmarkItem from "../BookmarkItem.vue";

const { getters } = useStore();
const router = useRouter();
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
		switch (router.currentRoute.value.meta.cId) {
			case 3: bookmarkList.value = bookmarks.data.filter(item => item.likes.includes(getters.getUser_?.id)); break;
			default: bookmarkList.value = bookmarks.data.filter(item => item.favorites.includes(getters.getUser_?.id)); break;
		}
	});
}

watch(selectedMenu, () => { fetchList() });
watch(router.currentRoute, () => { fetchList() });
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