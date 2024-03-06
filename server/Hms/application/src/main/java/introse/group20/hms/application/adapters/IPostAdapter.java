package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Post;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IPostAdapter {
    List<Post> getAllAdapter(int pageNo, int pageSize);
    List<Post> getPostOfDoctorAdapter(UUID doctorId, int pageNo, int pageSize);
    List<Post> getPostByCategoryAdapter(UUID categoryId, int pageNo, int pageSize);
    Optional<Post> getPostByIdAdapter(UUID postId) throws NotFoundException;
    Post createPostAdapter(UUID doctorId, UUID CategoryID, Post post) throws BadRequestException;
    Post updatePostAdapter(UUID userId, Post post) throws NotFoundException, BadRequestException;
    void deletePostAdapter(UUID userId, UUID postId) throws BadRequestException;
}
