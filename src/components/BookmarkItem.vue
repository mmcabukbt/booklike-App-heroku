<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const { getters, commit } = useStore();
const router = useRouter();
const AppAxios = inject('AppAxios');
const socket = inject('socket');
const yerel_options = { weekday: 'short', month: 'long', day: 'numeric' };
const props = defineProps({
	bookmarkItem: Object,
})

const likesClick = () => {
	if (!getters.isAuthenticated_) {
		return window.confirm("\n⛔ Bu işlemi gerçekleştirebilmek için Giriş yapmalısınız.\n\nGiriş sayfasına gitmek ister misiniz?") ?
			router.push({ name: "LoginPage" })
			: false;
	}
	const likesCount = props.bookmarkItem.likes.length;
	props.bookmarkItem.likes = props.bookmarkItem.likes.filter(likeId => likeId !== getters.getUser_?.id);
	if (likesCount === props.bookmarkItem.likes.length) { props.bookmarkItem.likes.push(getters.getUser_?.id) };
	AppAxios.patch(`/bookmarks/${props.bookmarkItem.id}`, { likes: props.bookmarkItem.likes }).then(response => {
		socket.emit("BM_EDITED", props.bookmarkItem);
		commit("EDIT_BOOKMARKITEM", props.bookmarkItem);
	});
}

const favoritesClick = () => {
	if (!getters.isAuthenticated_) {
		return window.confirm("\n⛔ Bu işlemi gerçekleştirebilmek için Giriş yapmalısınız.\n\nGiriş sayfasına gitmek ister misiniz?") ?
			router.push({ name: "LoginPage" })
			: false;
	}
	const favoritesCount = props.bookmarkItem.favorites.length;
	props.bookmarkItem.favorites = props.bookmarkItem.favorites.filter(favoriteId => favoriteId !== getters.getUser_?.id);
	if (favoritesCount === props.bookmarkItem.favorites.length) { props.bookmarkItem.favorites.push(getters.getUser_?.id) };
	AppAxios.patch(`/bookmarks/${props.bookmarkItem.id}`, { favorites: props.bookmarkItem.favorites }).then(response => {
		socket.emit("BM_EDITED", props.bookmarkItem);
		commit("EDIT_BOOKMARKITEM", props.bookmarkItem);
	});
}
const editBookmarkClick = () => {
	commit('OPEN_EDITBOOKMARK_MODAL', props.bookmarkItem);
}

const deleteBookmarkClick = () => {
	if (!window.confirm(`⚠ Lütfen Silme İşlemini Onaylayın ⚠

${props.bookmarkItem.title} başlıklı Bookmarkı silmek istediğinize emin misiniz?`)) return
	AppAxios.delete(`/bookmarks/${props.bookmarkItem.id}`).then(b => {
		socket.emit("BM_DELETED", props.bookmarkItem);
		commit('DELETE_BOOKMARKITEM', props.bookmarkItem)
	});
}
</script>

<template>
	<div class="relative grow bg-white rounded-md shadow-md">
		<!-- User's Menu -->
		<div v-if="getters.getUser_?.id === bookmarkItem.usersId" class="absolute group right-0 !z-30">
			<button
				class="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-500 hover:bg-gray-200 group-focus-within:bg-gray-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current"
					viewBox="0 0 24 24"
					height="20"
					width="20"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
					/>
				</svg>
			</button>
			<nav
				class="bg-white !z-10 rounded-md shadow-md p-2 flex flex-col absolute group-focus-within:visible top-full right-0 invisible"
			>
				<button @click="editBookmarkClick" class="usermenu-item">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-current mr-1"
						viewBox="0 0 24 24"
						height="20"
						width="20"
					>
						<path
							d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
						/>
					</svg>
					Düzenle
				</button>

				<button @click="deleteBookmarkClick" class="usermenu-item">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-current mr-1"
						viewBox="0 0 24 24"
						height="20"
						width="20"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path
							d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
						/>
					</svg>
					Sil
				</button>
			</nav>
		</div>
		<!-- User's Menu -->
		<div class="relative p-3 basis-10">
			<div
				class="absolute max-h-12 w-11/12 text-ellipsis overflow-hidden hover:whitespace-normal hover:overflow-visible hover:!z-[51]"
			>
				<a
					:href="bookmarkItem.url"
					class="font-bold mb-1 bg-white text-gray-600 hover:text-black"
					target="_blank"
				>{{ bookmarkItem.title }}</a>
			</div>
			<div class="flex flex-col mt-14">
				<div class="flex mt-auto justify-center gap-x-1">
					<button
						@click="likesClick"
						:class="bookmarkItem.likes.includes(getters.getUser_?.id) ? 'like-active' : ''"
						class="like-btn group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="fill-current group-hover:text-white"
							height="24"
							viewBox="0 0 24 24"
							width="24"
						>
							<path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
							<path
								d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"
							/>
						</svg>
					</button>
					<button
						@click="favoritesClick"
						:class="bookmarkItem.favorites.includes(getters.getUser_?.id) ? 'bookmark-active' : ''"
						class="bookmark-btn group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="fill-current group-hover:text-white"
							enable-background="new 0 0 24 24"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<rect fill="none" />
							<path
								d="M17,11v6.97l-5-2.14l-5,2.14V5h6V3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V11H17z M21,7h-2v2h-2V7h-2V5h2V3h2v2h2V7z"
							/>
						</svg>
					</button>
					<div class="relative group">
						<button class="details-btn !-z-[1] group">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="fill-current group-hover:text-gray-700"
								height="24"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path
									d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zM6 12h2v2H6zm0-3h2v2H6zm0-3h2v2H6zm4 6h5v2h-5zm0-3h8v2h-8zm0-3h8v2h-8z"
								/>
							</svg>
							<p class="details-container">{{ bookmarkItem.description }}</p>
						</button>
					</div>
				</div>
				<div class="text-xs text-gray-500 flex justify-center">
					<span>{{ bookmarkItem.likes.length }} beğeni · {{ bookmarkItem.favorites.length }} favori</span>
				</div>
				<div class="text-xs text-gray-400 mt-1 flex justify-between">
					<a href="#" class="hover:text-black">{{ bookmarkItem.users.fullname }}</a>
					<span>{{ new Date(bookmarkItem.added_at).toLocaleString(_, yerel_options) }}</span>
				</div>
			</div>
		</div>
		<div class="bg-red-200 p-1 text-red-900 text-center text-sm">{{ bookmarkItem.categories.name_ }}</div>
	</div>
</template>