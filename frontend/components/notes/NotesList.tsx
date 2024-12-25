import styles from "../../styles/NotesList.module.css";
import NoteItem from "./NoteItem";
import { Note } from '../../types';

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDeleteNote }) => {
  return (
    <div className={styles.notesContainer}>
      <div className={styles.title}>
        <b>My Notes</b>
      </div>

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={onDeleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
