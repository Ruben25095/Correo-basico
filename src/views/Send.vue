<template>
  <div class="send-container">
    <div class="send-card">
      <h2 class="title">Enviar mensaje</h2>

      <form @submit.prevent="send" class="send-form">
        <div class="field">
          <label>Para</label>
          <input
            v-model="to"
            type="email"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div class="field">
          <label>Asunto</label>
          <input
            v-model="subject"
            type="text"
            placeholder="Asunto del mensaje"
            required
          />
        </div>

        <div class="field">
          <label>Mensaje</label>
          <textarea
            v-model="body"
            rows="6"
            placeholder="Escribe tu mensaje aquí..."
            required
          />
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Enviar</button>
          <button type="button" class="btn-secondary" @click="router.push('/')">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const to = ref("");
const subject = ref("");
const body = ref("");

const send = async () => {
  await api.post("/api/messages", {
    to: to.value,
    subject: subject.value,
    body: body.value,
  });

  router.push("/aux2"); // Redirigir a la bandeja de enviados
};
</script>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi recusandae asperiores accusantium ducimus culpa ad, illo enim, cupiditate numquam iure nesciunt magni rerum non officia eaque voluptatibus inventore assumenda excepturi?
<style scoped>
.send-container {
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.send-card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #1f2937;
}

.send-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.9rem;
  color: #374151;
}

.field input,
.field textarea {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #d1d5db;
}
</style>
