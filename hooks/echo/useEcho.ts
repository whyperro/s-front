import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
const useEcho = (): Echo | null => {
    const [echoInstance, setEchoInstance] = useState<Echo | null>(null)
    useEffect(() => {
        // Check if window is available to avoid SSR issues
        if (typeof window !== 'undefined') {
            window.Pusher = Pusher
            const echo = new Echo({
                broadcaster: 'reverb',
                key: process.env.NEXT_PUBLIC_REVERB_APP_KEY as string,
                authorizer: (channel: any) => {
                    return {
                        authorize: (
                            socketId: string,
                            callback: (error: boolean, data?: any) => void
                        ) => {
                            axiosInstance
                                .post('/broadcasting/auth', {
                                    socket_id: socketId,
                                    channel_name: channel.name,
                                })
                                .then((response) => {
                                    callback(false, response.data)
                                })
                                .catch((error) => {
                                    callback(true, error)
                                })
                        },
                    }
                },
                wsHost: process.env.NEXT_PUBLIC_REVERB_HOST as string,
                wsPort: 443, //8080
                wssPort: 443, //8080
                forceTLS:
                (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
            })
            setEchoInstance(echo)
        }
    }, [])
    return echoInstance
}
export default useEcho
