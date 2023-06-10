require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 6010;

const app = express();

app.use(cors(corsOptions));

const server = http.createServer(app);
// const io = new Server(server);
const io = require("socket.io")(server, {
	cors: {
		origins: ["http://localhost:3000"],
	},
});

app.get("/", (req, res) => {
	res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("init", (arg) => {
		console.log(arg);
	});
});

// io.on("init", (socket) => {
// 	socket.on("init", (arg) => {
// 		console.log(arg);
// 	});
// });

server.listen(PORT, () => {
	console.log(`Server running. Listening on port ${PORT}`);
});

// ###

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const server = require("http").Server(app);
// // const io = require('socket.io')(server, {origins:'domain.com:* http://domain.com:* http://www.domain.com:*'});
// const io = require("socket.io")(server, { origins: "http://localhost:3000" });
// // const uuid = require('node-uuid');

// const PORT = process.env.PORT || 6010;

// app.get("/", (req, res) => {
// 	res.send("<h1>Hello world</h1>");
// });

// io.on("init", (socket) => {
// 	console.log(`a user connected`);
// });

// server.listen(PORT, () => {
// 	console.log(`Server running. Listening on port ${PORT}`);
// });

// ###

// const express = require("express");
// const socket = require("socket.io");
// const app = express();

// const server = app.listen(6010, () => {
// 	console.log("Listening on port 6010");
// });

// const io = socket(server);

// io.on("init", (socket) => {
// 	socket.on("message", (msg) => {
// 		console.log("socket working at the backend", msg);
// 		io.sockets.emit("message", msg);
// 	});
// });
