<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold">{{ isNew ? 'Create Note' : 'Edit Note' }}</h1>
      <input v-model="note.title" class="border p-2 w-full mb-4" placeholder="Note title" />
      <ul>
        <li v-for="todo in note.todos" :key="todo.id" class="flex items-center mb-2">
          <input type="checkbox" v-model="todo.completed" />
          <input v-model="todo.text" class="border p-2 ml-2 flex-1" />
          <button class="text-red-500 border p-4" @click="removeTodo(todo.id)">Delete</button>
        </li>
      </ul>

      <div class="flex space-x-4">
        <button class="text-blue-500 border p-4" @click="addTodo">Add Todo</button>
        <button class="text-green-500 border p-4" @click="saveNote">Save</button>
        <button class="text-gray-500 border p-4" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useNotesStore } from '@/stores/notes';
  
  const router = useRouter();
  const route = useRoute();
  const notesStore = useNotesStore();
  
  const isNew = route.params.id === 'new';
  const noteId = isNew ? null : parseInt(route.params.id as string);
  const note = ref({ title: '', todos: [] as { id: number; text: string; completed: boolean }[] });
  
  onMounted(() => {
    if (!isNew) {
      const existingNote = notesStore.notes.find((n) => n.id === noteId);
      if (existingNote) note.value = JSON.parse(JSON.stringify(existingNote));
    }
  });
  
  const addTodo = () => note.value.todos.push({ id: Date.now(), text: '', completed: false });
  const removeTodo = (todoId: number) => {
    note.value.todos = note.value.todos.filter((todo) => todo.id !== todoId);
  };
  const saveNote = () => {
    if (isNew) notesStore.addNote(note.value.title, note.value.todos);
    else notesStore.updateNote(noteId as number, note.value);
    router.push('/');
  };
  const cancelEdit = () => {
    if (confirm('Discard changes?')) router.push('/');
  };
  </script>
  