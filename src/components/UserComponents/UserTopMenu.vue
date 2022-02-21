<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const { getters } = useStore()
const router = useRouter();

const homeClick = () => {
	router.push({ path: `/users/${getters.getUserId_}` });
}
const myBookmarksClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-bookmarks` });
}
const myLikesClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-likes` });
}
const myFavoritesClick = () => {
	router.push({ path: `/users/${getters.getUserId_}/my-favorites` });
}
</script>

<template>
	<div class="group">
		<nav class="bg-white !z-50 w-100 flex absolute bottom-0 left-56">
			<button
				@click="homeClick"
				:class="router.currentRoute.value.meta.cId === 1 ? `topmenu-active` : ``"
				class="topmenu-item"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current"
					viewBox="0 0 24 24"
					height="24"
					width="24"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
				</svg>
				Ana Sayfam
			</button>
			<button
				@click="myBookmarksClick"
				:class="router.currentRoute.value.meta.cId === 2 ? `topmenu-active` : ``"
				class="topmenu-item"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current"
					viewBox="0 0 24 24"
					height="24"
					width="24"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path
						d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"
					/>
				</svg>
				Bookmarklarım
			</button>
			<button
				@click="myLikesClick"
				:class="router.currentRoute.value.meta.cId === 3 ? `topmenu-active` : ``"
				class="topmenu-item"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current"
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
			<button
				@click="myFavoritesClick"
				:class="router.currentRoute.value.meta.cId === 4 ? `topmenu-active` : ``"
				class="topmenu-item"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fill-current"
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
		</nav>
	</div>
</template>