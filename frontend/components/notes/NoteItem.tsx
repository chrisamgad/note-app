import styles from "../../styles/NoteItem.module.css";
import { Note } from '../../types';


interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  return (
    <div className={styles.noteItem}>
      <div>
        <div className={styles.title}>{note.title}</div>
        <p>{note.body}</p>
        <small>Noteed on: {new Date(note.createdAt).toLocaleDateString()}</small>
      </div>

      <div>
        <button onClick={handleDeleteClick} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
