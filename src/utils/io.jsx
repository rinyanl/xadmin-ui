import io from 'socket.io-client';

const socket = io(':8000', {
    query: {
        id: 1
    },
    transports: ['websocket'],
    timeout: 5000,
});

socket.on('connect', (val) => console.log('connect: websocket 连接成功！', val))
socket.on('msg', (val) => console.log('connect: websocket 连接成功！', val))
socket.on('haha', (val) => console.log('connect: websocket 连接成功！', val))

export default socket
