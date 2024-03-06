import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux";
import { useFetchData } from "../../../hooks/useFethData";
import { useSocket } from "../../../hooks/useSocket";
import { FaSearch } from "react-icons/fa";
import "./UserList.scss";
import {
  getContactedDoctors,
  getContactedPatients,
} from "../../../../redux/actions/message-actions";
import { Doctor } from "../../../../redux/features/doctorSlice";
import { ChangeEvent, ReactNode, useState } from "react";
import { Patient } from "../../../../redux/features/patientSlice";
interface UserListProp {
  role: string;
  selectUser: (user: Patient | Doctor) => void;
}

const UserList: React.FC<UserListProp> = ({ role, selectUser }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const dispatch: AppDispatch = useDispatch();
  const userList = useSelector((state: RootState) => {
    if (role === "PATIENT") return state.message.contactedDoctors;
    else return state.message.contactedPatients;
  });
  // const [filterUserList, setFilterUserList] = useState<Doctor[] | Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const isFetched = useFetchData(() => {
    if (role === "PATIENT") {
      return Promise.all([dispatch(getContactedDoctors())]);
    } else if (role === "DOCTOR") {
      return Promise.all([dispatch(getContactedPatients())]);
    }
  });
  const handleClick = (user: Patient | Doctor) => {
    selectUser(user);
    const listItems = document.querySelectorAll("#user-list li");
    listItems.forEach((li) => li.classList.remove("active"));
    const selectedLi = document.getElementById(`${user.id}`);
    selectedLi?.classList.add("active");
  };
  const renderUserList: () => ReactNode = () => {
    if (userList.length === 0) {
      let content: string;
      if (role === "PATIENT") content = "Chưa có bác sĩ nào từng liên hệ";
      else content = "Chưa có bệnh nhân từng liên hệ";
      return <p className="no-user">{content}</p>;
    }
    return (
      <ul id="user-list">
        {userList
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => {
            return (
              <li
                key={user.id}
                id={user.id}
                className="chat-list-user-item"
                onClick={() => handleClick(user)}
              >
                {role === "PATIENT" ? (
                  <img src={(user as Doctor).image} />
                ) : (
                  <img src="https://res.cloudinary.com/ddiudyz6q/image/upload/v1705380139/hms/avatars/6yvpkj_d98mou.jpg" />
                )}
                <div className="chat-list-item-detail">
                  <p>{user.name}</p>
                </div>
              </li>
            );
          })}
      </ul>
    );
  };
  return (
    <div className="chat-list">
      <div className="chat-list-search">
        <span>
          <FaSearch />
        </span>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="chat-list-user">{isFetched && renderUserList()}</div>
    </div>
  );
};

export default UserList;
