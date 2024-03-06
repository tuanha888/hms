import React from "react";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/useFethData";
import {
  createPost,
  getPostsOfDoctor,
} from "../../../redux/actions/post-actions";
import { Field } from "../interfaces";
import { getCategories } from "../../../redux/actions/category-actions";
import PostDoctor from "./PostDoctor";
import { useModal } from "../../hooks/useModal";
import Create from "../Create";
import { IoIosAddCircle } from "react-icons/io";

const PostsDoctor = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isFetched = useFetchData(() => {
    return Promise.all([
      dispatch(getPostsOfDoctor(user!.id)),
      dispatch(getCategories()),
    ]);
  });
  const postsDoctor = useSelector((state: RootState) => state.post.doctorPosts);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const handleCreate = async (values) => {
    await dispatch(createPost(values));
  };
  const fields: Field[] = [
    {
      fieldName: "title",
      fieldDisplay: "Tiêu đề",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "content",
      fieldDisplay: "Nội dung",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "summary",
      fieldDisplay: "Tóm tắt",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "cover",
      fieldDisplay: "Hình ảnh",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "image",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "coverContent",
      fieldDisplay: "Nội dung hình ảnh",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "categoryName",
      fieldDisplay: "Thể loại",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: categories,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "categoryId",
      fieldDisplay: "Tiêu đề",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
  ];
  const renderPostsDoctor = () => {
    return postsDoctor.map((post) => {
      return <PostDoctor fields={fields} entity={post} openDetailEdit={true} />;
    });
  };
  const handleSubmit = () => {};
  return (
    <div className="page-index">
      <div className="doctors-create create-button" onClick={openCreateModal}>
        <IoIosAddCircle />
      </div>
      <ul className="posts-doctor layout">
        {isFetched && renderPostsDoctor()}
      </ul>
      {isOpenCreateModal && (
        <Create
          fields={fields}
          handleSubmit={handleCreate}
          closeCreateModal={closeCreateModal}
          initFields={[]}
        />
      )}
    </div>
  );
};

export default PostsDoctor;
