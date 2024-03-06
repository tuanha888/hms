package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IPostAdapter;
import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.Post;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.infracstructure.models.CategoryModel;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.PostModel;
import introse.group20.hms.infracstructure.repositories.ICategoryRepository;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IPostRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.DynamicUpdate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PostAdapter implements IPostAdapter {
    @Autowired
    private IPostRepository postRepository;
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<Post> getAllAdapter(int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        return postRepository.findAll(pageRequest).stream()
                .map(postModel -> modelMapper.map(postModel, Post.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Post> getPostOfDoctorAdapter(UUID doctorId, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        List<PostModel> postModels = postRepository.findByDoctorId(doctorId, pageRequest);
        return postModels.stream()
                .map(postModel -> modelMapper.map(postModel, Post.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Post> getPostByCategoryAdapter(UUID categoryId, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        List<PostModel> postModels = postRepository.findByCategoryId(categoryId, pageRequest);
        return postModels.stream()
                .map(postModel -> modelMapper.map(postModel, Post.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Post> getPostByIdAdapter(UUID postId) throws NotFoundException {
        Optional<PostModel> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()){
            Post post = modelMapper.map(postOptional.get(),Post.class);
            return Optional.of(post);
        }
        else return Optional.empty();
    }

    @Override
    @Transactional
    public Post createPostAdapter(UUID doctorId, UUID CategoryID, Post post) throws BadRequestException {
        Optional<CategoryModel> categoryModel = categoryRepository.findById(CategoryID);
        Optional<DoctorModel> doctorModel = doctorRepository.findById(doctorId);
        if (categoryModel.isPresent() && doctorModel.isPresent()){
            //map to Model
            CategoryModel category = categoryModel.get();
            DoctorModel doctor = doctorModel.get();
            PostModel postModel = modelMapper.map(post,PostModel.class);
            postModel.setCategory(category);
            postModel.setDoctor(doctor);
            postModel.setCreatedDay(new Date());
            category.getPosts().add(postModel);
            //save to db
            entityManager.merge(postModel);
            //map back to Entity
            Doctor doc = modelMapper.map(doctor,Doctor.class);
            Category cate = modelMapper.map(category,Category.class);
            Post newpost = modelMapper.map(postModel,Post.class);
            newpost.setDoctor(doc);
            newpost.setCategory(cate);
            return newpost;
        }
        else{
            throw new BadRequestException("Wrong CategoryID");
        }
    }

    @Override
    @Transactional
    public Post updatePostAdapter(UUID userId, Post post) throws NotFoundException, BadRequestException {
        PostModel postModel = modelMapper.map(post, PostModel.class);
        Optional<PostModel> existPostModel = postRepository.findById(post.getId());
        if (existPostModel.isPresent()){
            if(userId.compareTo(existPostModel.get().getDoctor().getId()) != 0){
                throw new BadRequestException("Bad Request! Action not allowed!");
            }
            if (postModel.getCover() == null){
                postModel.setCover(existPostModel.get().getCover());
            }
            entityManager.merge(postModel);
            entityManager.flush();
            PostModel updatedPost = postRepository.findById(post.getId()).get();
            return modelMapper.map(updatedPost, Post.class);
        }
        else throw new NotFoundException("Not found post with id " + post.getId());

    }

    @Override
    public void deletePostAdapter(UUID userId, UUID postId) throws BadRequestException {
        PostModel postModel = postRepository.findById(postId)
                        .orElseThrow(() -> new BadRequestException(String.format("Post with id: %s not exist", postId)));
        if(userId.compareTo(postModel.getDoctor().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        postRepository.deleteById(postId);
    }
}
