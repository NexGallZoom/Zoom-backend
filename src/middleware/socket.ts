import { Server } from 'http';
import websocket from 'socket.io';

import { ChatEvent } from '../types/chat';

const messageList: string[] = [];
let socket: websocket.Server;

export const initWebSocket = (server: Server): void => {
  socket = new websocket.Server(server, {
    path: '/chat',
    serveClient: false,
    allowEIO3: true,
    cors: { origin: true, credentials: true },
  });
  socket.on(ChatEvent.CONNECTION, (client: websocket.Socket) => {
    console.log('connected', client.id);
    client.join('zoom');
    client.on(ChatEvent.NEW_MESSAGE, (message: string) => {
      messageList.push(message);
      console.log(messageList);
      socket.to('zoom').emit(ChatEvent.GET_MESSAGE, message);
    });
    console.log(messageList);
    client.emit(ChatEvent.GET_ALL_MESSAGE, messageList);
  });
  socket.on(ChatEvent.DISCONNECT, () => {
    console.log('closed');
  });
};
