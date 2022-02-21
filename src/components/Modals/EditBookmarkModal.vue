<script setup>
import { inject } from 'vue';
import { useStore } from 'vuex';

const AppAxios = inject('AppAxios');
const { state, getters, commit } = useStore();

const userData = {
	title: getters.getEditingBookmark_.title,
	url: getters.getEditingBookmark_.url,
	categoriesId: getters.getEditingBookmark_.categoriesId,
	description: getters.getEditingBookmark_.description,
};
let isSubmitted = false;

const saveData = () => {
	if (isSubmitted) return
	isSubmitted = true
	AppAxios.patch(`/bookmarks/${getters.getEditingBookmark_.id}`, userData).then(response => {
		// const editedItem = {
		// 	...getters.getEditingBookmark_,
		// 	...userData
		// }
		const editedItem = {
			...response.data,
			users: state.user,
			categories: state.categories[userData.categoriesId]
		}
		commit("EDIT_BOOKMARKITEM", editedItem);
	});
	commit('CLOSE_EDITBOOKMARK_MODAL')
};
</script>

<template>
	<div class="modal-mask modal">
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="text-3xl text-center mb-10">Bookmarkınızı Düzenleyin</div>
				<form @submit.prevent="saveData" class="flex flex-col">
					<input
						type="text"
						v-model="userData.title"
						placeholder="Başlık"
						required
						minlength="3"
						class="input mb-3"
					/>
					<input
						type="url"
						autocomplete="url"
						v-model="userData.url"
						required
						placeholder="URL"
						class="input mb-3"
					/>
					<select v-model="userData.categoriesId" required class="input mb-3">
						<option disabled selected value>Bir kategori seçin</option>
						<option
							v-for="category in getters.getCategories_"
							:key="category.id"
							:value="category.id"
						>{{ category.name_ }}</option>
					</select>
					<textarea
						v-model="userData.description"
						required
						placeholder="Açıklama"
						class="input mb-3"
						cols="30"
						rows="10"
						maxlength="255"
					></textarea>
					<div class="flex items-center justify-end gap-x-1">
						<button
							type="button"
							@click="commit('CLOSE_EDITBOOKMARK_MODAL')"
							class="secondary-button w-20"
						>İptal</button>
						<button type="submit" class="default-button w-28 disabled:bg-slate-400">Değiştir</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	display: table;
}
.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}
.modal-container {
	width: 500px;
	margin: 0px auto;
	padding: 30px 30px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 12px 28px rgba(0, 0, 0, 0.66);
	font-family: Helvetica, Arial, sans-serif;
}
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}
</style>