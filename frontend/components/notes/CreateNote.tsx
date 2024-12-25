import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/slices/notificationSlice";
import axios from "../../lib/axios";
import styles from "../../styles/CreateNote.module.css";
import { Note } from '../../types';

interface CreateNoteProps {
  onNoteCreated: (note: Note) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ onNoteCreated }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<{ data: { note: Note } }>(
        "notes",
        { title, body }
      );

      onNoteCreated(response.data.data.note);

      dispatch(
        showNotification({
          message: "Note created successfully!",
          type: "success",
        })
      );

      setTitle("");
      setBody("");
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || "An error occurred while creating the note.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <b>Create a Note</b>
      </div>
      <form onSubmit={handleCreateNote}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className={styles.createButton}>
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </section>
  );
};

export default CreateNote;
