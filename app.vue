<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();
onMounted(() => {
  notesStore.loadNotes();
});
</script>