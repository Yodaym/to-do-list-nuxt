<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Notes</h1>
      <button class="bg-blue-500 text-white py-2 px-4 rounded mb-4" @click="createNote">
        Create Note
      </button>
      <div v-for="note in notes" :key="note.id" class="border p-4 mb-4">
        <h2 class="text-xl font-bold">{{ note.title }}</h2>
        <ul>
          <li v-for="todo in note.todos.slice(0, 3)" :key="todo.id">{{ todo.text }}</li>
        </ul>
        <div class="flex space-x-4">
          <button class="text-blue-500 border p-4" @click="editNote(note.id)">Edit</button>
          <button class="text-red-500 border p-4" @click="deleteNote(note.id)">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useNotesStore } from '@/stores/notes'
  
  const router = useRouter();
  const notesStore = useNotesStore();
  const notes = computed(() => notesStore.notes);
  const createNote = () => router.push('/edit/new');
  const editNote = (id: number) => router.push(`/edit/${id}`);
  const deleteNote = (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      notesStore.deleteNote(id);
    }
  };
  </script>