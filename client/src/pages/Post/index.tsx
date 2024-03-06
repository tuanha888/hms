import React from "react";
import { Post as PostV2 } from "../../redux/features/postSlice";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../components/hooks/useFethData";
import { getPost } from "../../redux/actions/post-actions";
import { useParams } from "react-router-dom";
import UserTop from "../../components/common/UserTop";
import "./Post.scss";
const Post = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post.post);
  const isFetched = useFetchData(() => {
    return dispatch(getPost(id!));
  });
  return (
    <>
      {user && <UserTop user={user} managePage={false} />}
      {isFetched && (
        <div className="post-container container ">
          <div className="post-img">
            <img src={post!.cover} alt="" />
          </div>
          <p className="post-title">{post!.title}</p>
          <p className="post-summary">{post!.summary}</p>
          <p>
            {post!.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < post!.content.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default Post;
