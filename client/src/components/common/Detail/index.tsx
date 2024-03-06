import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import { FaTimes } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import Modify from "../Modify";
import "./Detail.scss";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/features/loadingSlice";
interface DetailProps {
  fields: Field[];
  entity: any;
  closeDetailModal: Function;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
}
const Detail: React.FC<DetailProps> = ({
  fields,
  entity,
  closeDetailModal,
  handleDelete,
  openDetailEdit,
  handleSubmit,
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
                <span>
                  {field.fieldName === "status"
                    ? entity[field.fieldName] === "ACCEPT"
                      ? "Đã chấp nhận"
                      : entity[field.fieldName] === "REJECT"
                      ? "Bị từ chối"
                      : "Chờ phản hồi"
                    : field.fieldName === "gender"
                    ? entity[field.fieldName] === "MALE"
                      ? "Nam"
                      : "Nữ"
                    : field.fieldName === "stayType"
                    ? entity[field.fieldName] === "STAY"
                      ? "Nội trú"
                      : entity[field.fieldName] === "NOT_STAY"
                      ? "Ngoại trú"
                      : "Ở ban ngày"
                    : !field.type.includes("date")
                    ? field.viewDetail !== null
                      ? field.viewDetail(entity)
                      : entity[field.fieldName]
                    : field.type === "dateday"
                    ? entity[field.fieldName].toLocaleDateString("vi", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : entity[field.fieldName].toLocaleDateString("vi", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                </span>
              )}
            </p>
          );
        else
          render.unshift(
            <div className="overview-img-container">
              <div className="overview-img">
                <img src={entity[field.fieldName]} alt="" />
              </div>
            </div>
          );
    });
    return render;
  };
  const dispatch: AppDispatch = useDispatch();
  const deleteFunction = async () => {
    try {
      dispatch(setLoading(true));
      await handleDelete(entity.id);
      closeDetailModal();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      closeDetailModal();
    }
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
          handleSubmit={handleSubmit}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type="DELETE"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={deleteFunction}
        />
      )}
    </div>
  );
};

export default Detail;
