package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Post;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IPostService {
    List<Post> getAll(int pageNo, int pageSize);
    List<Post> getPostOfDoctor(UUID doctorId, int pageNo, int pageSize);
    List<Post> getPostByCategory(UUID categoryId, int pageNo, int pageSize);
    Post getPostById(UUID postId) throws NotFoundException;
    Post createPost(UUID doctorId, UUID categoryId, Post post) throws BadRequestException;
    Post updatePost(UUID userId, Post post) throws NotFoundException, BadRequestException;
    void deletePost(UUID userId, UUID postId) throws BadRequestException;
}
