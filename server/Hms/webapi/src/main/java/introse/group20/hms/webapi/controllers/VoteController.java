package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IVoteService;
import introse.group20.hms.core.entities.Vote;
import introse.group20.hms.core.entities.enums.Rating;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.VoteDTO.VoteRequest;
import introse.group20.hms.webapi.DTOs.VoteDTO.VoteResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@Validated
public class VoteController {

    @Autowired
    private IVoteService voteService;

    @GetMapping("/votes/doctor")
    //route: /api/votes/doctor?doctorId=<id of doctor>
    public ResponseEntity<List<VoteResponse>> getDoctorVotes(
            @RequestParam UUID doctorId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ) {
        List<Vote> votes = voteService.getDoctorVote(doctorId, pageNo - 1, pageSize);
        List<VoteResponse> voteResponses = votes.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(voteResponses, HttpStatus.OK);
    }

    @GetMapping("/votes/{voteId}")
    public ResponseEntity<VoteResponse> getById(@PathVariable UUID voteId) throws NotFoundException {
        Vote vote = voteService.getById(voteId);
        VoteResponse voteResponse = mapToDTO(vote);
        return new ResponseEntity<>(voteResponse, HttpStatus.OK);
    }

    @PostMapping("/api/votes")
    @Secured("PATIENT")
    public ResponseEntity<VoteResponse> addVote(@Valid @RequestBody VoteRequest voteRequest) throws BadRequestException {
        Vote vote = mapToEntity(voteRequest);
        UUID patientId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Vote newVote = voteService.addVote(patientId, voteRequest.getDoctorId(), vote);
        return new ResponseEntity<>(mapToDTO(newVote), HttpStatus.CREATED);
    }

    @PutMapping("/api/votes/{voteId}")
    @Secured("PATIENT")
    public ResponseEntity<VoteResponse> updateVote(@PathVariable UUID voteId, @Valid @RequestBody VoteRequest voteRequest) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Vote vote = mapToEntity(voteRequest);
        vote.setId(voteId);
        Vote updatedVote = voteService.updateVote(userId, vote);
        return new ResponseEntity<>(mapToDTO(updatedVote), HttpStatus.OK);
    }

    @DeleteMapping("/api/votes/{voteId}")
    @Secured("PATIENT")
    public ResponseEntity<HttpStatus> deleteVote(@PathVariable UUID voteId) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        voteService.deleteVote(userId, voteId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private VoteResponse mapToDTO(Vote vote) {
        return new VoteResponse(vote.getId(), vote.getDoctor().getId(),vote.getDoctor().getName(), vote.getPatient().getId(), vote.getPatient().getName(),
                vote.getRating() == null ? 0 : vote.getRating().getValue(), vote.getContent());
    }

    private Vote mapToEntity(VoteRequest voteRequest) {
        return new Vote(Rating.values()[voteRequest.getRating() - 1], voteRequest.getContent());
    }
}
