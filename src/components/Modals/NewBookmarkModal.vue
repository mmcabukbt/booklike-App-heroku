<script setup>
import { inject } from 'vue';
import { useStore } from 'vuex';

const { getters, commit } = useStore();
const AppAxios = inject('AppAxios');
const socket = inject('socket');
const userData = {
	title: null,
	url: "http://localhost:3000/",
	categoriesId: "",
	description: null,
};
let isSubmitted = false;

const saveData = () => {
	if (isSubmitted) return
	isSubmitted = true
	const userSaveData = {
		usersId: getters.getUser_.id,
		...userData,
		likes: [],
		favorites: [],
		added_at: Date.now()
	}
	AppAxios.post("/bookmarks", userSaveData).then(response => {
		const newItem = {
			...response.data,
			users: { fullname: getters.getUser_.fullname },
			categories: { name_: getters.getCategories_[userData.categoriesId].name_ }
		}
		socket.emit("BM_ADDED", newItem);
		commit("ADD_NEW_BOOKMARKITEM", newItem);
	});
	commit('CLOSE_NEWBOOKMARK_MODAL')
};

</script>

<template>
	<div class="modal-mask modal">
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="text-3xl text-center mb-10">Yeni bookmark ekle</div>

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
							@click="commit('CLOSE_NEWBOOKMARK_MODAL')"
							class="secondary-button w-20"
						>İptal</button>
						<button type="submit" class="default-button w-28 disabled:bg-slate-400">Kaydet</button>
					</div>
				</form>
				<!-- <pre>{{ userData }}</pre> -->
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