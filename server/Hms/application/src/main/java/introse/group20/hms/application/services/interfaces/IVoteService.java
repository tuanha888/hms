package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Vote;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IVoteService {
    List<Vote> getDoctorVote(UUID doctorId, int pageNo, int pageSize);
    Vote getById(UUID voteId) throws NotFoundException;
    Vote addVote(UUID patientId, UUID doctorId, Vote vote) throws BadRequestException;
    Vote updateVote(UUID userId, Vote vote) throws BadRequestException;
    void deleteVote(UUID userId, UUID voteId) throws BadRequestException;
}
