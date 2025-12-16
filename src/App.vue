<template>
  <div id="app-layout">
    <Sidebar v-if="token">
    
    

    </Sidebar>
     
    <main class="content">
    
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
// 1. Importar el nuevo componente
import Sidebar from "./components/Sidebar.vue"; 


const token = computed(() => localStorage.getItem("token"));
console.log("Token en App.vue:", token.value);  

const logout = () => {
  console.log(localStorage.getItem("username"));
  localStorage.removeItem("token");
  // Redirige al usuario
  location.href = "/login";
};
</script>

<style scoped>
/* 🎨 Estilos para el Layout Principal (App.vue) */

#app-layout {
  display: flex; /* Habilita flexbox para alinear el sidebar y el contenido */
  min-height: 100vh; /* Asegura que el layout ocupe al menos la altura de la ventana */
}

/* --- Estilos del Contenido Principal (Router-View) --- */
.content {
  flex-grow: 1; /* Permite que el contenido ocupe el espacio restante */
  padding: 20px;
  background-color: #f4f4f4; /* Un color claro para el fondo del contenido */
  overflow-y: auto; /* Permite desplazamiento si el contenido es muy largo */
}
</style>