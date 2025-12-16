<template>
  <div class="mail-layout">
    <!-- PANEL IZQUIERDO -->
    <aside class="mail-list">
      <ul v-if="messages.length">
        <li
          v-for="m in messages"
          :key="m.id"
          :class="{ active: String(m.id) === route.params.id }"
        >
          <router-link :to="`/papelera/${m.id}`">
            <strong v-if="!m.is_read">*</strong>
            {{ m.subject }}
          </router-link>
        </li>
      </ul>

      <p v-else class="empty">No hay mensajes en inbox</p>

      <!-- PAGINACIÓN -->
      <div class="pagination">
<button @click="prevPage" :disabled="page === 1">
  ◀ Anterior
</button>

<span>Página {{ page }} / {{ totalPages }}</span>

<button @click="nextPage" :disabled="page === totalPages">
  Siguiente ▶
</button>
</div>
    </aside>

    <!-- PANEL DERECHO -->
    <section class="content-panel">
      <template v-if="msg">
        <h2>{{ msg.subject }}</h2>

        <div class="meta">
          <span><b>De:</b> {{ msg.from_user_id }}</span>
          <span><b>Para:</b> {{ msg.to_user_id }}</span>
        </div>

        <hr />

        <p class="body">{{ msg.body }}</p>

       
      </template>

      <template v-else>
        <p class="empty">Selecciona un mensaje</p>
      </template>
    </section>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import api from "../api/axios";
  
  const route = useRoute();
  const router = useRouter();
  
  /* STATE */
  const messages = ref([]);
  const msg = ref(null);
  
  const page = ref(1);
  const limit = 20;
  const totalPages = ref(1);
  
  /* CARGAR LISTA */
  const loadMessages = async () => {
    const res = await api.get("/api/messages", {
      params: {
        box: "trash",
        page: page.value,
        limit
      }
    });
  
    messages.value = res.data.data || [];
    totalPages.value = res.data.meta?.total_pages || 1;
  };
  
  /* CARGAR MENSAJE */
  const loadMessage = async (id) => {
    if (!id) {
      msg.value = null;
      return;
    }
  
    const res = await api.get(`/api/messages/${id}`);
    msg.value = res.data.data;
  };
  
  /* PAGINACIÓN */
  const nextPage = async () => {
    if (page.value < totalPages.value) {
      page.value++;
      await loadMessages();
    }
  };
  
  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
      await loadMessages();
    }
  };
  

  /* INIT */
  onMounted(async () => {
    await loadMessages();
    await loadMessage(route.params.id);
  });
  
  /* CAMBIO DE MENSAJE */
  watch(
    () => route.params.id,
    async (id) => {
      await loadMessage(id);
    }
  );

  
  
  </script>
  

<style scoped>
  .pagination {
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 10px;
gap: 10px;
}

.pagination button {
padding: 6px 10px;
border: 1px solid #ccc;
background: #f5f5f5;
cursor: pointer;
}

.pagination button:disabled {
opacity: 0.5;
cursor: not-allowed;
}
.mail-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
}

/* LISTA */
.mail-list {
  border-right: 1px solid #ddd;
  padding: 10px;
  overflow-y: auto;
}

.mail-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mail-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.mail-list li.active {
  background: #eef2ff;
}

.mail-list a {
  text-decoration: none;
  color: #333;
}

/* PAGINACIÓN */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
}

.pagination button {
  background: #eef2ff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* CONTENIDO */
.content-panel {
  padding: 20px;
}

.meta {
  display: flex;
  gap: 20px;
  font-size: 0.9em;
  color: #555;
}

.body {
  margin-top: 20px;
  white-space: pre-wrap;
}

.trash {
  margin-top: 20px;
  background: #e53935;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.empty {
  color: #888;
  padding: 20px;
}
</style>
