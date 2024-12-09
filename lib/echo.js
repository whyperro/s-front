import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST, // Sin esquema
    wsPort: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https' ? 443 : 80, // HTTPS usa 443
    wssPort: 8080, // Puerto seguro explícito
    forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
    disableStats: true,
    enabledTransports: ['ws', 'wss'], // Solo WebSocket y Secure WebSocket
    authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios
                    .post('/api/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name,
                    })
                    .then((response) => {
                        callback(false, response.data);
                    })
                    .catch((error) => {
                        callback(true, error);
                    });
            },
        };
    },
});
