const mongoose = require('mongoose');
const Msg = require('./models/messages');
const User = require('./models/users');
var express = require('express');
var app = express();
var server = app.listen(3000);

var io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const mongoDB = 'mongodb+srv://richmond:password123.@cluster0.gymvd.mongodb.net/message-database?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('connected')
}).catch(err => console.log(err));
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const http = require('http').createServer(app);

// const io = require('socket.io')(http, {
//     cors: {
//         origin: '*'
//     }
// });

app.get('/', (req, res) => {
    res.send('Heello world');
})

let userList = new Map();
let userName = "";
io.on('connection', (socket) => {
    io.sockets.sockets.forEach((socketId) => {
        const socket2 = io.sockets.sockets[socketId];
      })
    // console.log(Array.from(io.sockets.adapter.rooms))
    User.find().then((users)=>{
    socket.emit('list-users',users.map(x=> x.userName));
    })

    socket.on('join', function(data){
        //joining
        socket.join(data.room);
  
        console.log(data.userName + 'joined the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('new user joined', {id: data.id, userName:data.userName, message:'has joined this room.',joined: true});
      });
  
  
      socket.on('leave', function(data){
      
        console.log(data.userName + 'left the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('left room', {id: data.id, userName:data.userName, message:'has left this room.', joined: true});
  
        socket.leave(data.room);
      });
  
      socket.on('message',function(data){
        socket.to(data.room).emit('new message', {id: data.id, userName:data.userName, message:data.message, joined: false});
      })
      socket.on('set-username', (name) => {
            userName = name;
            io.sockets.emit('new-connection', userName);
        //   removeUser(userName, socket.id);
      })
      socket.on('disconnect', (reason) => {
          console.log(userName)
        io.sockets.emit('remove-connection', userName);
        //   removeUser(userName, socket.id);
      })
      socket.on('login',(data)=>{
          User.countDocuments({userName: data.userName}).then(x => {   
              if(x<1){
                const user = new User({userName: data.userName, password: data.password, id: data.userid, room: []});
                user.save().then(()=>{
                    User.find().then((users)=>{
                        userName = data.userName;
                        console.log("in")
                        io.sockets.emit('list-users',users.map(x=> x.userName));
                    })
                })
            }
            else{
                console.log("already exists")
            }})
      })
    // let userName = socket.handshake.query.userName;
    // addUser(userName, socket.id);

    // socket.broadcast.emit('user-list', [...userList.keys()]);
    // socket.emit('user-list', [...userList.keys()]);

    // socket.on('message', (msg, room) => {
    //     if(room === ""){
    //     socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    //     } else {
    //         socket.to(room).emit('message-broadcast', {message: msg, userName: userName});
    //     }
    // })
    // socket.on('join-room', (room, cb) => {
    //     socket.join(room);
    //     cb(`joined ${room}`);
    // })
    // socket.on('disconnect', (reason) => {
    //     removeUser(userName, socket.id);
    // })
});

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        if (userIds.size == 0) {
            userList.delete(userName);
        }
    }
}

// http.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running ${process.env.PORT || 3000}`);
// });
