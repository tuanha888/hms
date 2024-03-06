import React, { useState } from "react";
import { useFetchData } from "../../components/hooks/useFethData";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post-actions";
import { AppDispatch, RootState } from "../../redux";
import PostImg from "../../assets/images/post.jpg";
import "./Posts.scss";
import { v4 } from "uuid";
import { getCategories } from "../../redux/actions/category-actions";
import { useNavigate } from "react-router-dom";
import UserTop from "../../components/common/UserTop";
const Posts = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getPosts()), dispatch(getCategories())]);
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const handleClickCategory = (name: string) => setActiveCategory(name);
  const posts = useSelector((state: RootState) => state.post.posts);
  const postsRender = posts.filter((post) => {
    if (activeCategory === "All") return post;
    else return post.categoryName == activeCategory;
  });
  const firstPost = postsRender.length !== 0 ? postsRender[0] : null;
  const otherPosts = postsRender.filter((post, i) => {
    if (i != 0) return post;
  });
  const navigate = useNavigate();
  const handleClickPost = (id: string) => {
    navigate(`/posts/${id}`);
  };
  const renderOtherPosts = () => {
    return otherPosts.map((post) => {
      return (
        <li className="posts-item" key={post.id}>
          <div className="posts-item-img">
            <img src={post.cover} alt="" />
          </div>
          <p
            className="posts-item-title"
            onClick={() => handleClickPost(post.id)}
          >
            {post.title}
          </p>
        </li>
      );
    });
  };
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const renderCategories = () => {
    const newCategories = categories.map((category) => {
      return (
        <li
          className={`posts-cate-item ${
            category.name === activeCategory ? "actived" : ""
          }`}
          onClick={() => handleClickCategory(category.name)}
          key={category.id}
        >
          {category.name}
        </li>
      );
    });
    newCategories.push(
      <li
        className={`posts-cate-item ${
          activeCategory === "All" ? "actived" : ""
        }`}
        onClick={() => handleClickCategory("All")}
        key={v4()}
      >
        Tất cả
      </li>
    );
    return newCategories.reverse();
  };
  return (
    <>
      {user && <UserTop user={user} managePage={false} />}
      <div className="posts">
        <div className="posts-container">
          <div className="posts-header">
            <span className="posts-header-content">Bài viết</span>
          </div>
          {isFetched && (
            <div className="posts-cate-container">
              <ul className="posts-cate-list">{renderCategories()}</ul>
            </div>
          )}
          {isFetched && firstPost !== null && (
            <>
              <div className="posts-outstanding">
                <div className="posts-outstanding-img">
                  <img src={firstPost.cover} alt="" />
                </div>
                <div className="posts-outstanding-content">
                  <span className="posts-outstanding-cate">
                    {firstPost.categoryName}
                  </span>
                  <p
                    className="posts-outstanding-title"
                    onClick={() => handleClickPost(firstPost.id)}
                  >
                    {firstPost.title}
                  </p>
                  <p className="posts-outstanding-summary">
                    {firstPost.summary}
                  </p>
                </div>
              </div>
              <ul className="posts-list">{renderOtherPosts()}</ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
