import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchPosts } from "../../services/postService";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { Post } from "../../types/post";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";

type ModalModeType = "create" | "edit";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalModeType | null>(null);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const debouncedSearchPost = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["posts", query, currentPage],
    queryFn: () => fetchPosts(query, currentPage),
    placeholderData: keepPreviousData,
  });

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleEdit(post: Post) {
    if (post) {
      setEditedPost(post);
    }
    setModalMode("edit");
  }

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 12) : 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox queryText={query} onSearch={debouncedSearchPost} />
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
        <button
          onClick={() => {
            toggleModal();
            setModalMode("create");
          }}
          className={css.button}
        >
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal
          onClose={() => {
            toggleModal();
            setModalMode(null);
          }}
        >
          {modalMode === "create" ? (
            <CreatePostForm onCancel={toggleModal} onSubmit={toggleModal} />
          ) : (
            <EditPostForm
              onCancel={toggleModal}
              onSubmit={toggleModal}
              initialValues={editedPost}
            />
          )}
        </Modal>
      )}

      {isSuccess && data.posts && (
        <PostList posts={data.posts} toggleModal={toggleModal} toggleEditPost={handleEdit} />
      )}
    </div>
  );
}
