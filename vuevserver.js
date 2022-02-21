const express = require('express')
const http = require('http');
const cors = require('cors');
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3003

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use(cors());

app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

io.on("connection", (socket) => {
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

server.listen(port, (err) => {
	if (err) console.error(err);
	console.log(`Vue3Vite App ve Socket.io ${port} portunda AYAKTA`)
});