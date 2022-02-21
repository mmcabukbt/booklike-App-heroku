<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const { commit, getters } = useStore()
const router = useRouter();

const myBookmarksClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-bookmarks` });
}
const myLikesClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-likes` });
}
const myFavoritesClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-favorites` });
}
const accountClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/account` });
}
const logoutClick = () => {
	commit('LOGOUT');
	router.push({ name: "HomePage" });
}
</script>

<template>
	<div class="relative group">
		<button
			class="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-500 hover:bg-gray-200 group-focus-within:bg-gray-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 0 24 24"
				class="fill-current"
				width="24"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
				/>
			</svg>
		</button>
		<nav
			class="bg-white !z-10 rounded-md shadow-md p-2 w-56 flex flex-col absolute group-focus-within:visible top-full right-0 invisible"
		>
			<button @click="myBookmarksClick" class="menu-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current mr-1"
					height="24"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"
					/>
				</svg>
				Bookmarklarım
			</button>
			<button @click="myLikesClick" class="menu-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current mr-1"
					viewBox="0 0 24 24"
					height="24"
					width="24"
				>
					<path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
					<path
						d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"
					/>
				</svg>
				Beğendiklerim
			</button>
			<button @click="myFavoritesClick" class="menu-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current mr-1"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<rect fill="none" />
					<path
						d="M17,11v6.97l-5-2.14l-5,2.14V5h6V3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V11H17z M21,7h-2v2h-2V7h-2V5h2V3h2v2h2V7z"
					/>
				</svg>
				Favorilerim
			</button>
			<button @click="accountClick" class="menu-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					class="fill-current mr-1"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
					/>
				</svg>
				Hesap Profile
			</button>
			<button @click="logoutClick" class="menu-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					class="fill-current mr-1"
					height="24"
					viewBox="0 0 24 24"
					width="24"
				>
					<g>
						<path d="M0,0h24v24H0V0z" fill="none" />
					</g>
					<g>
						<path
							d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"
						/>
					</g>
				</svg>
				Çıkış Yap
			</button>
		</nav>
	</div>
</template>