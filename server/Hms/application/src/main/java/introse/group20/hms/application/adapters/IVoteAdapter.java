package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Vote;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IVoteAdapter {
    List<Vote> getDoctorVoteAdapter(UUID doctorId, int pageNo, int pageSize);
    Optional<Vote> getByIdAdapter(UUID voteId);
    Vote addVoteAdapter(UUID patientId, UUID doctorId, Vote vote) throws BadRequestException;
    Vote updateVoteAdapter(UUID userId, Vote vote) throws BadRequestException;
    void deleteVoteAdapter(UUID userId, UUID voteId) throws BadRequestException;
}
