import { useSocket } from "../../hooks/useSocket";
import { Patient } from "../../../redux/features/patientSlice";
import { Doctor } from "../../../redux/features/doctorSlice";
import { FaTimes } from "react-icons/fa";
import ChatBox from "../Chat/ChatBox";
import "./ChatModal.scss";
import { useEffect, useState } from "react";

interface ChatModalProps {
    selectedUser: Patient | Doctor | null;
    closeChatBox: Function;
}

const ChatModal: React.FC<ChatModalProps> = ({ selectedUser, closeChatBox }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
    const [chosenUser, setChosenUser] = useState<Doctor | Patient | null>(null);
    useEffect(() => {
        setChosenUser(selectedUser);
        console.log(selectedUser);
        return () => {
            setChosenUser(null);
            console.log(chosenUser)
        }
    }, [])
    const sendMessage = useSocket(currentUser.id, currentUser.role);
    return (
        <div>
            <div className="modal-container">
                <div className="chat-modal">
                    <ChatBox role={currentUser.role} selectedUser={chosenUser} sendMessage={sendMessage} />
                    <FaTimes className="modal-close" onClick={closeChatBox} />
                </div>
            </div>
        </div>
    )
}

export default ChatModal;