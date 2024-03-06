import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFethData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import {
  addVote,
  deleteVote,
  getDoctorVotes,
  updateVote,
} from "../../../redux/actions/vote-actions";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import "./Votes.scss";
import { useModal } from "../../hooks/useModal";
import { addVoteFields } from "../../utils/constants";
import { InitField } from "../interfaces";
import Create from "../Create";
import ConfirmModal from "../ConfirmModal";
import Modify from "../Modify";
import { Vote } from "../../../redux/features/voteSlice";
interface VotesProps {
  doctorId: string;
  doctorName: string;
  closeModal: Function;
}
const Votes: React.FC<VotesProps> = ({ doctorId, closeModal, doctorName }) => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return dispatch(getDoctorVotes(doctorId));
  });
  const user = useSelector((state: RootState) => state.user.user);
  const votes = useSelector((state: RootState) => state.vote.doctorVotes);
  const isVoted = votes.some((vote) => vote.patientId === user!.id);
  const {
    isModalOpen: isAddVoteOpen,
    closeModal: closeAddVote,
    openModal: openAddVote,
  } = useModal();
  const {
    isModalOpen: isConfirmModal,
    closeModal: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal();
  const {
    isModalOpen: isModifyOpen,
    closeModal: closeModifyModal,
    openModal: openModify,
  } = useModal();
  const fields = addVoteFields;
  const initFields: InitField[] = [
    {
      fieldName: "doctorId",
      fieldValue: doctorId,
    },
    {
      fieldName: "rating",
      fieldValue: "5",
    },
  ];
  const handleAddVote = async (values: any) => {
    await dispatch(addVote(values));
  };
  const handleUpdateVote = async (data: { id: string; value: Vote }) => {
    await dispatch(updateVote(data));
  };
  const handleDelete = async () => {
    const voteId = votes.filter((vote) => vote.patientId === user!.id)[0].id;
    await dispatch(deleteVote(voteId));
  };
  const vote = votes.filter((vote) => vote.patientId === user?.id)[0];
  const renderVotes = () => {
    return votes.map((vote) => {
      if (vote.patientId !== user?.id) {
        return (
          <li className="vote">
            <p className="vote-patient">{vote.patientName}</p>
            <p className="vote-star">
              {vote.rating} <MdOutlineStarPurple500 />
            </p>
            <p className="vote-content">{vote.content}</p>
          </li>
        );
      } else {
        return (
          <li className="vote">
            <div className="vote-wrapper">
              <div className="vote-user-content">
                <p className="vote-patient">{vote.patientName}</p>
                <p className="vote-star">
                  {vote.rating} <MdOutlineStarPurple500 />
                </p>
                <p className="vote-content">{vote.content}</p>
              </div>
              <div className="vote-user-modify">
                <button
                  className="modal-button-modify modal-button"
                  onClick={openModify}
                >
                  Sửa
                </button>
                <button
                  className="modal-button-modify modal-button"
                  onClick={openConfirmModal}
                >
                  Xóa
                </button>
              </div>
            </div>
          </li>
        );
      }
    });
  };
  return (
    <>
      {isFetched && (
        <>
          <div className="modal-container">
            <div className="modal-wrapper">
              <div className="modal">
                <span className="modal-field">Bác sĩ: </span>
                <span>{doctorName}</span>
                <p className="modal-field">Các đánh giá:</p>
                {votes.length !== 0 ? (
                  <div className="votes-wrapper">
                    <ul className="votes-list">{renderVotes()}</ul>
                  </div>
                ) : (
                  "Chưa có đánh giá nào về bác sĩ"
                )}
                {!isVoted && (
                  <button className="modal-button" onClick={openAddVote}>
                    Đánh giá bác sĩ
                  </button>
                )}
                <FaTimes className="modal-close" onClick={closeModal} />
              </div>
            </div>
          </div>
          {isAddVoteOpen && (
            <Create
              fields={fields}
              initFields={initFields}
              handleSubmit={handleAddVote}
              closeCreateModal={closeAddVote}
            />
          )}
          {isConfirmModal && (
            <ConfirmModal
              type={"DELETE"}
              closeConfirmModal={closeConfirmModal}
              closeModifyModal={null}
              deleteFunction={handleDelete}
            />
          )}
          {isModifyOpen && (
            <Modify
              fields={fields}
              entity={vote}
              closeModifyModal={closeModifyModal}
              handleSubmit={handleUpdateVote}
            />
          )}
        </>
      )}
    </>
  );
};

export default Votes;
