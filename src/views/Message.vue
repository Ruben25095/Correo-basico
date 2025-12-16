<template>
  <div class="mail-layout">

    <aside class="mail-list">

  <input
    v-model="search"
    @input="onSearch"
    type="text"
    placeholder="Buscar por asunto..."
    class="search"
  />
      <ul v-if="messages.length">
        <li
          v-for="m in messages"
          :key="m.id"
          :class="{ active: String(m.id) === route.params.id }"
        >
          <router-link :to="`/message/${m.id}`">
            <strong v-if="!m.is_read">●</strong>
            {{ m.subject }}
          </router-link>
        </li>
      </ul>

      <p v-else class="empty">No hay mensajes</p>
   
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

  
    <section class="content-panel">
      <template v-if="msg">
        <h2>{{ msg.subject }}</h2>

        <div class="meta">
          <span><b>De:</b> {{ msg.from_user_id }}</span>
          <span><b>Para:</b> {{ msg.to_user_id }}</span>
        </div>

        <hr />

        <p class="body">{{ msg.body }}</p>
        
        <button class="trash" @click="trash">
             Mover a papelera
          </button>
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


const messages = ref([]);
const msg = ref(null);
const page = ref(1);
const limit = 20;
const totalPages = ref(1);

 const loadMessages = async () => {
  const res = await api.get("/api/messages", {
    params: {
      box: "sent",
      page: page.value,
      limit: limit
    }
  });

  messages.value = res.data.data;
  totalPages.value = res.data.meta?.total_pages;
};



const loadMessage = async (id) => {
  if (!id) {
        msg.value = null;
        return;
      }
  

  const res = await api.get(`/api/messages/${id}`);
  msg.value = res.data.data;


};

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

 
const trash = async () => {
  await api.patch(`/api/messages/${route.params.id}/trash`, {
    in_trash_from: true,
  });

  msg.value = null;
  router.push("/aux1");
};


onMounted(async () => {
  await loadMessages();
  await loadMessage(route.params.id);
});


watch(
  () => route.params.id,
  async (id) => {
    await loadMessage(id);
  }
);

//logica del buscador
const search = ref("");

const load = async () => {
  const params = {
    box: "sent",
    page: page.value,
    limit
  };

  if (search.value.trim() !== "") {
    params.search = search.value.trim();
  }

  const res = await api.get("/api/messages", { params });

  messages.value = res.data.data;
  totalPages.value = res.data.meta.total_pages;
};

const onSearch = async () => {
  page.value = 1; // reset página al buscar
  await load();
};



</script>

<style scoped>
.mail-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
}

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
.search {
  width: 80%;
  padding: 8px 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9em;
}
</style>
