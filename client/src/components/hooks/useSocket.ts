import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react"
import SockJS from "sockjs-client";
import { HOST_URL } from "../../redux/actions/config";
import { Message, addMessage } from "../../redux/features/messageSlice";
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { getContactedDoctors, getContactedPatients } from "../../redux/actions/message-actions";


export const useSocket = (user: string, role: string) => {
    const url = `${HOST_URL}/ws`;
    const [stompClient, setStompClient] = useState<CompatClient | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [sendMessage, setSendMessage] = useState<Function | null>(null);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const tmpStompCLient = Stomp.over(() => new SockJS(url));
        setStompClient(tmpStompCLient);
        console.log("connecting...");
        return () => {
            stompClient?.unsubscribe(`/user/${user}/queue/messages`);
            tmpStompCLient.disconnect(() => {
                console.log("Disconnect ...");
            })
            setStompClient(null);
        }
    }, [user])

    const onMessageReceive = (payload: any) => {
        try {
            const messageReceived = JSON.parse(payload.body) as Message;
            dispatch(addMessage(messageReceived));
            if (role === "PATIENT") dispatch(getContactedDoctors());
            else dispatch(getContactedPatients());
        }
        catch (error) {
            console.log("error");
            console.error(error);
        }
    }
    const onConnected = () => {
        if (stompClient) {
            stompClient.subscribe(`/user/${user}/queue/messages`, onMessageReceive);
            console.log("connected");
            setIsConnected(true);
        }
    }
    const onError = () => {
        console.log("Connecting Error");
    }
    useEffect(() => {
        if (stompClient) {
            stompClient?.connect({}, onConnected, onError);
        }
    }, [stompClient])

    useEffect(() => {
        if (isConnected && stompClient) {
            const onSendMessage = (message: Message) => {
                stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
                console.log(JSON.stringify(message))
                dispatch(addMessage(message));
            }
            setSendMessage(prev => onSendMessage);
        } else {
            setSendMessage(null);
        }
    }, [isConnected])
    return sendMessage;
}
