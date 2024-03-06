import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { getPrescriptionOfPatient } from "../../../redux/actions/prescription-actions";
import { useFetchData } from "../../hooks/useFethData";
import Prescription from "../Prescription";
import {
  deleteMedicalRecord,
  getMedicalRecordOfPatients,
  updateMedicalRecord,
} from "../../../redux/actions/medicalRecord-actions";
import MedicalRecord from "./MedicalRecord";

interface MedicalRecordsProps {
  id: string;
}
const MedicalRecords: React.FC<MedicalRecordsProps> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return dispatch(getMedicalRecordOfPatients(id));
  });
  const medicalRecords = useSelector(
    (state: RootState) => state.medicalRecord.medicalRecords
  );
  const handleDelete = async (id: string) => {
    await dispatch(deleteMedicalRecord(id));
  };
  const handleSubmit = async (data: { id: string; value: any }) => {
    await dispatch(updateMedicalRecord(data));
  };
  const renderMedicalRecords = () => {
    return medicalRecords.map((medicalRecord) => {
      return (
        <MedicalRecord
          medicalRecord={medicalRecord}
          handleDelete={() => handleDelete(medicalRecord.id)}
          openDetailEdit={true}
          handleSubmit={handleSubmit}
          role={"DOCTOR"}
        />
      );
    });
  };
  return (
    <>
      <ul className="prescriptions reset-margin layout">
        {isFetched && medicalRecords.length !== 0
          ? renderMedicalRecords()
          : "Hiện tại bệnh nhân chưa có bệnh án nào"}
      </ul>
    </>
  );
};

export default MedicalRecords;
