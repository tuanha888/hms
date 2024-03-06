package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IVoteAdapter;
import introse.group20.hms.application.services.interfaces.IVoteService;
import introse.group20.hms.core.entities.Vote;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class VoteService implements IVoteService {

    private IVoteAdapter iVoteAdapter;

    public VoteService(IVoteAdapter voteAdapter) {
        this.iVoteAdapter = voteAdapter;
    }

    @Override
    public List<Vote> getDoctorVote(UUID doctorId, int pageNo, int pageSize) {
        return iVoteAdapter.getDoctorVoteAdapter(doctorId, pageNo, pageSize);
    }

    @Override
    public Vote getById(UUID voteId) throws NotFoundException {
        Optional<Vote> vote = iVoteAdapter.getByIdAdapter(voteId);
        if (vote.isEmpty()) {
            throw new NotFoundException("Vote is not found!");
        }
        return vote.get();
    }

    @Override
    public Vote addVote(UUID patientId, UUID doctorId, Vote vote) throws BadRequestException {
        return iVoteAdapter.addVoteAdapter(patientId, doctorId, vote);
    }

    @Override
    public Vote updateVote(UUID userId, Vote vote) throws BadRequestException {
        return iVoteAdapter.updateVoteAdapter(userId, vote);
    }

    @Override
    public void deleteVote(UUID userId, UUID voteId) throws BadRequestException {
        iVoteAdapter.deleteVoteAdapter(userId, voteId);
    }
}
