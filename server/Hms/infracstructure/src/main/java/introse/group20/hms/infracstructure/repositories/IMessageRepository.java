package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.MessageModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


public interface IMessageRepository extends JpaRepository<MessageModel, UUID> {
    List<MessageModel> findByConversationId(UUID conversationId);
    List<MessageModel> findBySenderIdOrReceiverId(UUID senderId, UUID receiverId);
    @Query("SELECT DISTINCT d " +
            "FROM DoctorModel d " +
            "JOIN MessageModel m ON d.id = m.senderId OR d.id = m.receiverId " +
            "WHERE :patientId = m.senderId OR :patientId = m.receiverId ")
    List<DoctorModel> findContactedDoctor(@Param("patientId") UUID patientId);
    @Query("SELECT DISTINCT p " +
            "FROM PatientModel p " +
            "JOIN MessageModel m ON p.id = m.senderId OR p.id = m.receiverId " +
            "WHERE :doctorId = m.senderId OR :doctorId = m.receiverId ")
    List<PatientModel> findContactedPatient(@Param("doctorId") UUID doctorId);
}
