<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AuthMenu from '../AuthMenu.vue';
import UserDotMenu from '../UserComponents/UserDotMenu.vue';
import UserTopMenu from '../UserComponents/UserTopMenu.vue';
import NewBookmarkModal from '../Modals/NewBookmarkModal.vue';

const { getters, commit } = useStore();
const router = useRouter();

const newBookmarkClick = () => {
	if (!getters.isAuthenticated_) {
		return window.confirm("\n⛔ Bu işlemi gerçekleştirebilmek için Giriş yapmalısınız.\n\nGiriş sayfasına gitmek ister misiniz?") ?
			router.push({ name: "LoginPage" })
			: false;
	}
	commit('OPEN_NEWBOOKMARK_MODAL');
};

</script>

<template>
	<teleport to="#modal">
		<transition name="modal">
			<NewBookmarkModal v-if="getters.getNewBookmarkModal_" />
		</transition>
	</teleport>
	<teleport to="#modal">
		<transition name="modal">
			<EditBookmarkModal v-if="getters.getEditBookmarkModal_" />
		</transition>
	</teleport>
	<div class="header-container">
		<nav class="flex w-full px-2">
			<router-link :to="{ name: 'HomePage' }" class="flex text-xl items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current mr-2"
					height="36"
					viewBox="0 0 24 24"
					width="36"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 2v5l-1-.75L15 9V4h2zm3 12H8V4h5v9l3-2.25L19 13V4h1v12z"
					/>
				</svg>
				booklike
			</router-link>
			<div class="ml-auto flex items-center">
				<button
					@click="newBookmarkClick"
					class="flex bg-gray-700 hover:bg-black text-white px-3 py-1 rounded-sm text-sm items-center mr-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-current mr-1"
						height="16"
						viewBox="0 0 24 24"
						width="16"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</svg>
					Yeni Bookmark
				</button>
				<template v-if="getters.isAuthenticated_">
					{{ getters.getUser_.fullname }}
					<UserDotMenu />
					<UserTopMenu />
				</template>
				<AuthMenu v-else />
			</div>
		</nav>
	</div>
</template>
