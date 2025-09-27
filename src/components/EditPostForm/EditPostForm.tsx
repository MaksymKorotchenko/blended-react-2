import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { EditPost, Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  initialValues: Post | null;
}

export default function EditPostForm({ onCancel, onSubmit, initialValues }: EditPostFormProps) {
  const PostSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(50, "Title is too long!")
      .required("Required"),
    body: Yup.string().max(500, "Content is too long!"),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSubmit();
      onCancel();
      alert("Post edited successfully!");
    },
  });

  const handleSubmit = (values: EditPost, actions: FormikHelpers<Post>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues!} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCancel} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
