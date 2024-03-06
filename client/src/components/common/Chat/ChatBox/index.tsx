import { Doctor } from "../../../../redux/features/doctorSlice";
import { Patient } from "../../../../redux/features/patientSlice";
import { VscSend } from "react-icons/vsc";
import "./ChatBox.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux";
import { useFetchData } from "../../../hooks/useFethData";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getMessages } from "../../../../redux/actions/message-actions";
import { Message } from "../../../../redux/features/messageSlice";
import { IoSend } from "react-icons/io5";
interface ChatBoxProps {
  role: string;
  selectedUser: Patient | Doctor | null;
  sendMessage: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedUser,
  role,
  sendMessage,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector((state: RootState) => {
    return state.message.messages;
  });
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getMessages())]);
  });
  const [content, setContent] = useState<string>("");
  const handledChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content !== "") {
      const message: Message = {
        id: uuidv4(),
        senderId: currentUser.id,
        receiverId: selectedUser!.id,
        time: new Date(),
        content: content,
      };
      sendMessage(message);
      setContent((prev) => "");
      // e.currentTarget.reset();
    }
  };
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log("SCROLLABLE");
    // console.log(selectedUser);
    // console.log(scrollableContainerRef.current);
    if (selectedUser && scrollableContainerRef.current) {
      // console.log("begin to scroll");
      const scrollableContainer = scrollableContainerRef.current;
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  }, [selectedUser, messages]);
  const renderMessages = () => {
    return (
      <ul>
        {messages!
          .filter(
            (message) =>
              message.senderId === selectedUser?.id ||
              message.receiverId === selectedUser?.id
          )
          .map((message) => {
            let classes: string;
            if (message.senderId === currentUser.id) {
              classes = "sender";
            } else {
              classes = "receiver";
            }
            return (
              <li key={message.id} className={classes}>
                <p>{message.content}</p>
              </li>
            );
          })}
      </ul>
    );
  };
  return (
    <>
      {!selectedUser && (
        <div className="non-selected">
          Chọn người dùng để hiển thị khung chat
        </div>
      )}
      {selectedUser && (
        <div className="chat-box">
          <div className="chat-box-header">
            {role === "PATIENT" ? (
              <img src={(selectedUser as Doctor).image} />
            ) : (
              <img src="https://res.cloudinary.com/ddiudyz6q/image/upload/v1705380139/hms/avatars/6yvpkj_d98mou.jpg" />
            )}
            <div className="chat-box-header-detail">
              <p>{selectedUser.name}</p>
              {/* <p>{selectedUser.id}</p> */}
            </div>
          </div>
          <div className="seperator-row"></div>
          <div className="chat-box-display">
            <div className="chat-box-messages" ref={scrollableContainerRef}>
              {isFetched && renderMessages()}
            </div>
            <form className="chat-box-input" onSubmit={handledSubmit}>
              <input
                type="text"
                placeholder="Nhập tin nhắn của bạn..."
                onChange={handledChange}
                value={content}
              />
              <button className="chat-button">
                <IoSend className="send-icon" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
