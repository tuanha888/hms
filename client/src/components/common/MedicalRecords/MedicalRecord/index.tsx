import { MedicalRecord as MedicalRecordType } from "../../../../redux/features/medicalRecordSlice";
import { useModal } from "../../../hooks/useModal";
import MedicalRecordDetail from "../MedicalRecordDetail";

interface PrescriptionDetailProps {
  medicalRecord: MedicalRecordType;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
  role: "DOCTOR" | "PATIENT";
}
const MedicalRecord: React.FC<PrescriptionDetailProps> = ({
  medicalRecord,
  handleDelete,
  openDetailEdit,
  handleSubmit,
  role,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <li className="col-2 overview" onClick={openModal}>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Bệnh nhân:</span>{" "}
          <span>{medicalRecord.patientName}</span>
        </p>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Bác sĩ:</span>{" "}
          <span>{medicalRecord.doctorName}</span>
        </p>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Khoa:</span>{" "}
          <span>{medicalRecord.departmentName}</span>
        </p>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Mã BHYT:</span>{" "}
          <span>{medicalRecord.bhytCode}</span>
        </p>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Ngày vào viện:</span>{" "}
          <span>
            {medicalRecord.inDay.toLocaleDateString("vi", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </p>
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Ngày ra viện:</span>{" "}
          <span>
            {medicalRecord.inDay.toLocaleDateString("vi", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </p>
        {/* <p className="modal-item overview-item">
          <p className="modal-field overview-field">Chẩn đoán lúc vào viện:</p>{" "}
          <p>{medicalRecord.inDayDiagnose}</p>
        </p>
        <p className="modal-item overview-item">
          <p className="modal-field overview-field">Chẩn đoán lúc ra viện:</p>{" "}
          <p>{medicalRecord.outDayDiagnose}</p>
        </p>
        <p className="modal-item overview-item">
          <p className="modal-field overview-field">Tiền sử bệnh lý:</p>{" "}
          <p>{medicalRecord.medicalHistory}</p>
        </p>
        <p className="modal-item overview-item">
          <p className="modal-field overview-field">
            Quá trình diễn biến của bệnh:
          </p>{" "}
          <p>{medicalRecord.diseaseProgress}</p>
        </p>
        <p className="modal-item overview-item">
          <p className="modal-field overview-field">Kết quả xét nghiệm:</p>{" "}
          <p>{medicalRecord.testResults}</p>
        </p>
        <p className="modal-item overview-item">
          <p className="modal-field overview-field">Trạng thái lúc ra viện:</p>{" "}
          <p>{medicalRecord.hospitalDischargeStatus}</p>
        </p> */}
        <p className="modal-item overview-item">
          <span className="modal-field overview-field">Điều trị:</span>{" "}
          <span>
            {medicalRecord.stayType === "STAY"
              ? "Nội trú"
              : medicalRecord.stayType === "NOT_STAY"
              ? "Ngoại trú"
              : "Ở ban ngày"}
          </span>
        </p>
        {/* <p className="modal-item overview-item">
          <p className="modal-field overview-field">Ghi chú:</p>{" "}
          <p>{medicalRecord.note}</p>
        </p> */}
        {/* {medicalRecord.treatmentPlan !== null && (
          <button className="modal-button">Xem kế hoạch điều trị</button>
        )} */}
      </li>
      {isModalOpen && (
        <MedicalRecordDetail
          medicalRecord={medicalRecord}
          closeDetailModal={closeModal}
          handleDelete={handleDelete}
          openDetailEdit={true}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
export default MedicalRecord;
