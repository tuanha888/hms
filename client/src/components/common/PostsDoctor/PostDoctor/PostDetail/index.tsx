import { ReactNode } from "react";
import { useModal } from "../../../../hooks/useModal";
import { FaTimes } from "react-icons/fa";
import Modify from "../../../Modify";
import ConfirmModal from "../../../ConfirmModal";
import "./PostDetail.scss";
import { AppDispatch } from "../../../../../redux";
import { useDispatch } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../../../../../redux/actions/post-actions";
import { Field } from "../../../interfaces";
import React from "react";
interface DetailProps {
  fields: Field[];
  entity: any;
  closeDetailModal: Function;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
}
const PostDetail: React.FC<DetailProps> = ({
  fields,
  entity,
  closeDetailModal,
  handleDelete,
  openDetailEdit,
}) => {
  const {
    isModalOpen: isModifyOpen,
    openModal: openModify,
    closeModal: closeModify,
  } = useModal();
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const dispatch: AppDispatch = useDispatch();
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.detailDisplay)
        if (field.type !== "image")
          render.push(
            <p className="modal-item">
              <span className="modal-field">{field.fieldDisplay}:</span>{" "}
              {field.type === "textarea" ? (
                <p>
                  {entity[field.fieldName].split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index <
                        entity[field.fieldName].split("\n").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))}
                </p>
              ) : (
                <p>
                  {!field.type.includes("date")
                    ? entity[field.fieldName]
                    : entity[field.fieldName].toLocaleDateString("vi", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                </p>
              )}
            </p>
          );
        else
          render.unshift(
            <div className="overview-img-container post-image-container">
              <div className="post-image overview-img ">
                <img src={entity[field.fieldName]} alt="" />
              </div>
            </div>
          );
    });
    return render;
  };
  const handleUpdatePost = async (data: { id: string; value: any }) => {
    await dispatch(updatePost(data));
  };
  const handleDeletePost = async () => {
    await dispatch(deletePost(entity.id));
  };
  return (
    <div className="detail modal-container">
      {!isModifyOpen && (
        <div className="modal-wrapper">
          <div className="detail-modal modal">
            {renderEntity()}
            {openDetailEdit && (
              <>
                <button className="modal-button" onClick={openModify}>
                  Sửa
                </button>
                <button className="modal-button" onClick={openConfirmModal}>
                  Xóa
                </button>
              </>
            )}
            <FaTimes className="modal-close" onClick={closeDetailModal} />
          </div>
        </div>
      )}
      {isModifyOpen && (
        <Modify
          fields={fields}
          entity={entity}
          closeModifyModal={closeModify}
          handleSubmit={handleUpdatePost}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type="DELETE"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={handleDeletePost}
        />
      )}
    </div>
  );
};

export default PostDetail;
