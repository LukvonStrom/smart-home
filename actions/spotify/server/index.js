import * as socketio from 'socket.io'
import connectSocket from 'spotify-connect-ws'
import * as express from "express";

const app = express()
const server = app.listen(process.env.PORT || 3001)

const io = socketio(server)
io.of('connect').on('connection', connectSocket)