import { io } from "socket.io-client";

const port = 3003;

export default function (store) {
	const socket = io();
	// const socket = io(`http://localhost:${port}`);

	socket.on("BM_ADD", (newItem) => {
		store.commit("ADD_NEW_BOOKMARKITEM", newItem);
	})
	socket.on("BM_EDIT", (editedItem) => {
		store.commit("EDIT_BOOKMARKITEM", editedItem);
	})
	socket.on("BM_DELETE", (deletedItem) => {
		store.commit("DELETE_BOOKMARKITEM", deletedItem);
	})

	return socket;
};
