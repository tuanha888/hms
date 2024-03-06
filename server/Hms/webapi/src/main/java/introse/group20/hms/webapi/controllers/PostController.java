package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IPostService;
import introse.group20.hms.application.services.uploads.IUploadService;
import introse.group20.hms.core.entities.Post;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.PostDTO.PostRequest;
import introse.group20.hms.webapi.DTOs.PostDTO.PostResponse;
import introse.group20.hms.webapi.DTOs.constants.DefaultImage;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@Validated
public class PostController {
    @Autowired
    private IPostService postService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IUploadService uploadService;
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getAllPost(
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<Post> posts = postService.getAll(pageNo - 1, pageSize);
        List<PostResponse> postDTOS = posts.stream()
                .map(post -> modelMapper.map(post, PostResponse.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<PostResponse>>(postDTOS,HttpStatus.OK);
    }

    @GetMapping(value = "/posts/doctor", name = "getByDoctor")
    //route: /posts/doctor?doctorId=<id of doctor>
    public ResponseEntity<List<PostResponse>> getPostOfDoctor(
            @RequestParam UUID doctorId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<Post> posts = postService.getPostOfDoctor(doctorId, pageNo - 1, pageSize);
        List<PostResponse> postDTOS = posts.stream()
                .map(post -> modelMapper.map(post,PostResponse.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<PostResponse>>(postDTOS,HttpStatus.OK);
    }

    @GetMapping(value = "/posts/category", name = "getByCategory")
        //route: /posts/category?categoryId=<if of category>
    public ResponseEntity<List<PostResponse>> getPostOfCategory(
            @RequestParam UUID categoryId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<Post> posts = postService.getPostByCategory(categoryId, pageNo - 1, pageSize);
        List<PostResponse> postDTOS = posts.stream()
                .map(post -> modelMapper.map(post,PostResponse.class))
                .collect(Collectors.toList());
        return new ResponseEntity<List<PostResponse>>(postDTOS,HttpStatus.OK);
    }
//
    @GetMapping(value = "/posts/{postId}", name = "getByPostId")
        //route: /posts/{postId}
    public ResponseEntity<PostResponse> getPostById(@PathVariable UUID postId) throws NotFoundException {
        Post posts = postService.getPostById(postId);
        PostResponse postResponse = modelMapper.map(posts, PostResponse.class);
        return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
    }

    @PostMapping(value = "/api/posts", name = "createPost", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Secured("DOCTOR")
    public ResponseEntity<PostResponse> createPost(@Valid @ModelAttribute PostRequest postRequest) throws IOException,BadRequestException {
        String url;
        if (!postRequest.getCover().isEmpty()){
            url = uploadService.upload(postRequest.getCover().getBytes(), postRequest.getCover().getOriginalFilename(),"postCovers");
        }
        else url = DefaultImage.POST;
        Post post = modelMapper.map(postRequest, Post.class);
        post.setCover(url);
        UUID doctorID = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Post newPost = postService.createPost(doctorID, postRequest.getCategoryId(), post);
        PostResponse postResponse = modelMapper.map(newPost, PostResponse.class);
        return new ResponseEntity<PostResponse>(postResponse,HttpStatus.CREATED);
    }

    @PutMapping(value = "/api/posts/{postId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Secured("DOCTOR")
    public ResponseEntity<PostResponse> updatePost(@PathVariable UUID postId, @Valid @ModelAttribute PostRequest postRequest) throws IOException, NotFoundException, BadRequestException {
        Post post = modelMapper.map(postRequest, Post.class);
        if (postRequest.getCover() != null && !postRequest.getCover().isEmpty()){
            post.setCover(uploadService.upload(postRequest.getCover().getBytes(), postRequest.getCover().getOriginalFilename(),"postCovers"));
        }
        else post.setCover(null);
        post.setId(postId);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Post updatedPost = postService.updatePost(userId, post);
        return new ResponseEntity<>(modelMapper.map(updatedPost, PostResponse.class), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/posts/{postId}")
    @Secured("DOCTOR")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable UUID postId) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        postService.deletePost(userId, postId);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
}
