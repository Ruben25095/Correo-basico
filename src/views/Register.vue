<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Registro</h2>

      <form @submit.prevent="register">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        />

        <button>Registrar</button>
      </form>

  
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

const email = ref("");
const password = ref("");

const register = async () => {
  await api.post("/api/auth/register", {
    email: email.value,
    password: password.value
  });
  alert("Registrado, ahora inicia sesión");
};
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6fb;
}

.auth-card {
  background: white;
  padding: 30px;
  width: 100%;
  max-width: 360px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.auth-card form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-card input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.auth-card input:focus {
  outline: none;
  border-color: #6366f1;
}

.auth-card button {
  padding: 10px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

.auth-card button:hover {
  background: #4f46e5;
}
</style>
