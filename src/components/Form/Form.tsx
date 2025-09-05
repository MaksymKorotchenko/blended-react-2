import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import style from "./Form.module.css";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  function handleSubmit(formData: FormData) {
    const userSearch = formData.get("search") as string;
    onSubmit(userSearch);

    if (!userSearch) {
      toast.error("Please enter your search query");
      return;
    }
  }

  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
