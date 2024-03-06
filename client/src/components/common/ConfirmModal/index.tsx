import React from "react";
import "./ConfirmModal.scss";
interface ConfirmModalProps {
  type: string;
  closeConfirmModal: Function;
  closeModifyModal: Function | null;
  deleteFunction: Function | null;
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  type,
  closeConfirmModal,
  closeModifyModal,
  deleteFunction,
}) => {
  return (
    <div className="modal-container">
      <div className="modal confirm-modal">
        <p className="confirm-modal-text">
          {type === "MODIFY"
            ? "Bạn có muốn hủy những thay đổi?"
            : type === "LOGOUT"
            ? "Xác nhận đăng xuất"
            : "Xác nhận xóa"}
        </p>
        <button
          className="modal-button"
          onClick={() => {
            closeConfirmModal();
            if (type === "MODIFY") {
              closeModifyModal!();
            } else deleteFunction!();
          }}
        >
          Đồng ý
        </button>
        <button className="modal-button" onClick={() => closeConfirmModal()}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
