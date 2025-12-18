<template>
    <div class="auth-container">
      <div class="auth-card">
        <h2>Recuperar contraseña</h2>
  
        <p class="subtitle">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
  
        <form @submit.prevent="submit">
          <input
            type="email"
            placeholder="Correo electrónico"
            v-model="email"
            required
          />
  
          <button :disabled="loading">
            {{ loading ? "Enviando..." : "Enviar enlace" }}
          </button>
        </form>
  
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
  
        <router-link class="link" to="/login">
          Volver al login
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import api from "../api/axios";
  
  const email = ref("");
  const loading = ref(false);
  const message = ref("");
  const error = ref("");
  
  const submit = async () => {
    loading.value = true;
    error.value = "";
    message.value = "";
  
    try {
      const res = await api.post("/api/auth/forgot-password", {
        email: email.value
      });
  
      message.value = res.data.data;
      email.value = "";
    } catch (err) {
      error.value =
        err.response?.data?.error || "Error al enviar el correo";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f6f8;
  }
  
  .auth-card {
    background: white;
    padding: 30px;
    width: 360px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  h2 {
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.6;
  }
  
  .success {
    color: #2e7d32;
    margin-top: 15px;
  }
  
  .error {
    color: #d32f2f;
    margin-top: 15px;
  }
  
  .link {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #4f46e5;
    text-decoration: none;
  }
  </style>
  