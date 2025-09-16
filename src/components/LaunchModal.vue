<template>
  <div v-if="isOpen" class="modal">
    <!-- Conteúdo do seu modal aqui -->
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    launch: Object,
  },
  emits: ["close"],
};
</script>

<style scoped>
.modal {
  /* Estilos do modal */
}
</style>
