const { Server } = require("socket.io");

const port = process.env.PORT || 3003;

const io = new Server(port, {
	cors: {
		origin: "*",
	}
});

io.on("connection", (socket) => {
	console.log(`Socket.io Server ${port} portunda AYAKTA`)

	socket.on("BM_ADDED", (newItem) => {
		socket.broadcast.emit("BM_ADD", newItem);
	});
	socket.on("BM_EDITED", (editedItem) => {
		socket.broadcast.emit("BM_EDIT", editedItem);
	});
	socket.on("BM_DELETED", (deletedItem) => {
		socket.broadcast.emit("BM_DELETE", deletedItem);
	});
});
