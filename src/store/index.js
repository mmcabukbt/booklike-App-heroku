import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import { axiosBase } from "../services/axios";

var ls = new SecureLS({ isCompression: false });
const store = createStore({
	state: {
		user: null,
		showNewBookmarkModal: false,
		showEditBookmarkModal: false,
		newBookmarkItem: null,
		editingBookmarkItem: null,
		editedBookmarkItem: null,
		deletedBookmarkItem: null,
		userMenuItems: [
			{
				"name_": "my_bookmarks",
				"id": 0
			},
			{
				"name_": "favorites",
				"id": 1
			},
			{
				"name_": "likes",
				"id": 2
			},
			{
				"name_": "account",
				"id": 3
			}
		],
		categories: [],
	},

	mutations: {
		SET_CATEGORIES(state, categories) { state.categories = categories },
		LOGIN_USER(state, logineduser) { state.user = logineduser },
		LOGOUT(state) { state.user = null },

		OPEN_NEWBOOKMARK_MODAL(state) { state.showNewBookmarkModal = true },
		CLOSE_NEWBOOKMARK_MODAL(state) { state.showNewBookmarkModal = false },
		OPEN_EDITBOOKMARK_MODAL(state, editingItem) {
			state.editingBookmarkItem = editingItem;
			state.showEditBookmarkModal = true;
		},
		CLOSE_EDITBOOKMARK_MODAL(state) {
			state.showEditBookmarkModal = false;
			state.editingBookmarkItem = null;
		},

		ADD_NEW_BOOKMARKITEM(state, newItem) { state.newBookmarkItem = newItem },
		EDIT_BOOKMARKITEM(state, editedItem) { state.editedBookmarkItem = editedItem },
		DELETE_BOOKMARKITEM(state, deletedItem) { state.deletedBookmarkItem = deletedItem },
	},

	actions: {
		fetchCategories({ commit }) {
			axiosBase.get("/categories").then(response => {
				commit("SET_CATEGORIES", response.data);
			}).catch(e => console.error("Hata: ", e))
		}
	},

	getters: {
		isAuthenticated_(state) { return Boolean(state.user) },
		getUser_(state) { return state.user },
		getUserId_(state) { return state.user?.userId },
		getCategories_(state) { return state.categories },
		getNewBookmarkModal_(state) { return state.showNewBookmarkModal },
		getEditBookmarkModal_(state) { return state.showEditBookmarkModal },
		getEditingBookmark_(state) { return state.editingBookmarkItem },
		getNewBookmark_(state) { return state.newBookmarkItem },
		getEditedBookmark_(state) { return state.editedBookmarkItem },
		getDeletedBookmark_(state) { return state.deletedBookmarkItem },
	},

	plugins: [
		createPersistedState({
			storage: {
				getItem: (key) => ls.get(key),
				setItem: (key, value) => ls.set(key, value),
				removeItem: (key) => ls.remove(key),
			},
		}),
	],
})

export default store;