const { Socket } = require('socket.io')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let countUserOnline = 0

io.on('connection', socket => {
    socket.on ('join', param => {
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        console.log('user send message')
        io.emit('message', param)
    })
    socket.on('disconnect', param => {
        console.log('user left')
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline)
    })
})

server.listen(3000)