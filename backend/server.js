const express = require('express');
const { board } = require('./board');
const app = express();
const cors = require("cors");
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(cors({
    origin: ["http://127.0.0.1:3001", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
io.on('connection', (socket) => {
    socket.on('start', (start) => {
        socket.broadcast.emit('start', start);
    });

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data.start, data.end, data.color);
    });
});

app.use('/', board);
server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
