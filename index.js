const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')


app.use(cors())

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server= http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET','POST']
    }
})

io.on("connection", (socket)=>{
    console.log('User Connected', socket.id)

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`Socket with ID ${socket.id} joined Room ${data}`);
    })
    
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })



    socket.on("disconnect", ()=>{
        console.log('User disconnected', socket.id);
    })
})

server.listen(PORT, ()=>{
    console.log('SERVER RUNNING');
});

