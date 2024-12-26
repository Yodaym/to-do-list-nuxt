import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Array<{
      id: number;
      title: string;
      todos: { id: number; text: string; completed: boolean }[];
    }>,
    history: [] as any[],
  }),
  actions: {
    addNote(title: string, todos: { text: string; completed: boolean }[]) {
      const newNote = {
        id: Date.now(),
        title,
        todos: todos.map((todo, index) => ({
          id: index + 1,
          text: todo.text,
          completed: todo.completed,
        })),
      };
      this.notes.push(newNote);
      this.saveNotes();
    },
    updateNote(noteId: number, updatedNote: { title: string; todos: any[] }) {
      const index = this.notes.findIndex((note) => note.id === noteId);
      if (index !== -1) this.notes[index] = { ...this.notes[index], ...updatedNote };
      this.saveNotes();
    },
    deleteNote(noteId: number) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
      this.saveNotes();
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    loadNotes() {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) this.notes = JSON.parse(savedNotes);
    },
    addToHistory(note: any) {
      this.history.push(JSON.parse(JSON.stringify(note)));
    },
    undo(noteId: number) {
      const lastState = this.history.pop();
      if (lastState) {
        const index = this.notes.findIndex((note) => note.id === noteId);
        if (index !== -1) this.notes[index] = lastState;
      }
    },
  },
});