const PORT = '3000';
const express = require('express');
let app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

let nombreMorts = 0;

app.get('/ajouterMort', (req,res)=>{
    res.sendFile(__dirname + '/html/ajouterMort.html');
});
app.get('/enleverMort', (req,res)=>{
    res.sendFile(__dirname + '/html/enleverMort.html');
});
app.get('/recapMort', (req,res)=>{
    res.sendFile(__dirname + '/html/recapMort.html');
});

io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
    socket.on('mort', (mort) => {
        console.log('une mort en plus ! ' + nombreMorts);
        nombreMorts = nombreMorts + mort;
        if(nombreMorts < 0) nombreMorts = 0;
        socket.broadcast.emit('nombreMorts', nombreMorts);
    });
});

server.listen(PORT, () => {
    console.log('listen on :'+PORT);
})