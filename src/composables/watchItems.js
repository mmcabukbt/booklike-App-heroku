import { watch } from 'vue';
import store from '../store';

export default function watchItems(selectedMenu, list) {
	watch(
		() => store.getters.getNewBookmark_,
		(newItem) => {
			if (selectedMenu.id === -1 || selectedMenu.id === newItem.categoriesId) {
				list.value.push(newItem);
			}
		});
	watch(
		() => store.getters.getEditedBookmark_,
		(editedItem) => {
			if (selectedMenu.id === -1 || selectedMenu.id === editedItem.categoriesId) {
				list.value = list.value.map(item => item.id !== editedItem.id ? item : editedItem);
			}
		});
	watch(
		() => store.getters.getDeletedBookmark_,
		(deletedItem) => {
			if (selectedMenu.id === -1 || selectedMenu.id === deletedItem.categoriesId) {
				list.value = list.value.filter(item => item.id !== deletedItem.id);
			}
		});
}