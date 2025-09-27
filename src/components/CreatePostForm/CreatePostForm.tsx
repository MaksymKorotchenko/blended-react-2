import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { NewPost } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";

interface CreatePostForm {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function CreatePostForm({ onSubmit, onCancel }: CreatePostForm) {
  const formikInitValues: NewPost = { title: "", body: "" };

  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(50, "Title is too long!")
      .required("Required"),
    body: Yup.string().max(500, "Content is too long!"),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSubmit();
      alert("Post created successfully!");
    },
  });

  const handleSubmit = (values: NewPost, actions: FormikHelpers<NewPost>) => {
    mutate(values);
    actions.resetForm();
  };
  return (
    <Formik initialValues={formikInitValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCancel} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
