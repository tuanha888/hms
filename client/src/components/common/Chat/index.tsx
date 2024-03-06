import { useSocket } from "../../hooks/useSocket";
import ChatBox from "./ChatBox";
import UserList from "./UserList"
import "./Chat.scss";
import { useState } from "react";
import { Patient } from "../../../redux/features/patientSlice";
import { Doctor } from "../../../redux/features/doctorSlice";

interface ChatProps {
    role: string;
}

const Chat: React.FC<ChatProps> = ({ role }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
    const sendMessage = useSocket(currentUser.id, role);
    const [selectedUser, setSelectedUser] = useState<Patient | Doctor | null>(null);
    return (
        <div className="chat">
            <UserList role={role} selectUser={setSelectedUser} />
            <div className="seperator-column"></div>
            <ChatBox selectedUser={selectedUser} role={role} sendMessage={sendMessage} />
        </div>
    )
}

export default Chat;