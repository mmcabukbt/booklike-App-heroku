import { createRouter, createWebHashHistory } from "vue-router";
import BookmarkItems from "../components/BookmarkItems.vue";
import store from "../store";

const routes = [
	{
		name: "HomePage",
		path: "/",
		meta: { requiresUnAuth: true },
		component: () => import("../views/Home.vue")
	},
	{
		name: "LoginPage",
		path: "/login",
		meta: { requiresUnAuth: true },
		component: () => import("../views/Login.vue")
	},
	{
		name: "RegisterPage",
		path: "/register",
		meta: { requiresUnAuth: true },
		component: () => import("../views/Register.vue")
	},
	{
		name: "UserHomePage",
		path: '/users/:userId',
		component: () => import("../views/UserHome.vue"),
		meta: { requiresAuth: true },
		children: [
			{ path: '', meta: { cId: 1 }, component: BookmarkItems, },
			{ path: 'my-bookmarks', meta: { cId: 2 }, component: () => import("../components/UserComponents/UserBookmarks.vue"), },
			{ path: 'my-likes', meta: { cId: 3 }, component: () => import("../components/UserComponents/UserLikesFavorites.vue"), },
			{ path: 'my-favorites', meta: { cId: 4 }, component: () => import("../components/UserComponents/UserLikesFavorites.vue"), },
			{ path: 'account', meta: { cId: 5 }, component: () => import("../components/UserComponents/UserAccount.vue") },
		],
	},
	{
		name: "NotFoundPage",
		path: "/:pathMatch(.*)*",
		component: () => import("../views/NotFound.vue")
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

router.beforeEach((to, from) => {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated_) {
		if (to.params.userId !== store.getters.getUserId_) {
			return { name: "LoginPage" }
		}
		return {
			name: "LoginPage",
			query: { redirect: to.fullPath },
		}
	}
	if ((to.params.userId && to.params.userId !== store.getters.getUserId_) || (to.meta.requiresUnAuth && store.getters.isAuthenticated_)) {
		return {
			path: `/users/${store.getters.getUserId_}`
		}
	}

})

export default router;