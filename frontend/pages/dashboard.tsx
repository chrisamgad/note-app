import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import type { AppDispatch } from '../store';
import { showNotification } from '../store/slices/notificationSlice';
import CreateNote from '../components/notes/CreateNote';
import NotesList from '../components/notes/NotesList';
import { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import { Note } from '../types';
import { fetchUserNotes, deleteUserNote } from '../services/api/userNotes';

interface DashboardProps {
  initialNotes: Note[];
}

const Dashboard: NextPage<DashboardProps> = ({ initialNotes }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const handleNoteCreated = (newNote: Note) => {
    setNotes([newNote, ...notes]);

    dispatch(
      showNotification({
        message: 'Note created successfully!',
        type: 'success',
      })
    );
  };

  const handleDeleteNote = async (noteId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');

    if (!confirmed) return;

    try {
      await deleteUserNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));

      dispatch(
        showNotification({
          message: 'Note deleted successfully!',
          type: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message:
            err.response?.data?.message || 'Failed to delete the note. Please try again.',
          type: 'error',
        })
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <CreateNote onNoteCreated={handleNoteCreated} />
      <NotesList notes={notes} onDeleteNote={handleDeleteNote} />
    </div>
  );
};

export default Dashboard;

import { wrapper } from '../store';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context: GetServerSidePropsContext) => {
      const { req } = context;
      const cookies = parseCookies({ req });
      const token = cookies['token'];
      
      if (!token) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      try {
        const cookie = req.headers.cookie;

        const notes = await fetchUserNotes(cookie);
        
        return {
          props: { initialNotes: notes },
        };
      } catch (error: any) {
        console.error('Error during server-side rendering:', error.message);

        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    }
);