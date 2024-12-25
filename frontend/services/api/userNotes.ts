import axiosInstance from '../../lib/axios';
import { Note } from '../../types';
import axios, { AxiosResponse } from 'axios';

// fetch user notes
export async function fetchUserNotes(cookie?: string): Promise<Note[]> {
  try {
    const response: AxiosResponse<{ data: { notes: Note[] } }> = await axiosInstance.get('/notes', {
      headers: {
        Cookie: cookie,
      }
    });

    const notes = response.data.data.notes || [];
    return notes;
  } catch (error: any) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user notes:', error.message);
    } else {
      console.error('Unexpected error fetching user notes:', error);
    }
    throw error;
  }
}

// delete a note
export async function deleteUserNote(noteId: string): Promise<void> {
  try {
    await axiosInstance.delete(`/notes/${noteId}`);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`Error deleting note ${noteId}:`, error.message);
    } else {
      console.error(`Unexpected error deleting note ${noteId}:`, error);
    }
    throw error;
  }
}
