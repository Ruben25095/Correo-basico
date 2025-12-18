<template>
    <div class="auth-container">
      <div class="auth-card">
        <h2>Nueva contraseña</h2>
  
        <p class="subtitle">
          Ingresa tu nueva contraseña para recuperar tu cuenta.
        </p>
  
        <form @submit.prevent="submit">
          <input
            type="password"
            placeholder="Nueva contraseña"
            v-model="password"
            required
            minlength="6"
          />
  
          <button :disabled="loading">
            {{ loading ? "Guardando..." : "Actualizar contraseña" }}
          </button>
        </form>
  
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import api from "../api/axios";
  
  const router = useRouter();
  const password = ref("");
  const accessToken = ref("");
  const loading = ref(false);
  const error = ref("");
  const message = ref("");
  
  onMounted(() => {
    const hash = window.location.hash.replace("#", "");
    const params = new URLSearchParams(hash);
    accessToken.value = params.get("access_token");
  
    if (!accessToken.value) {
      error.value = "Token inválido o expirado";
    }
  });
  
  const submit = async () => {
    if (!accessToken.value) return;
  
    loading.value = true;
    error.value = "";
    message.value = "";
  
    try {
      await api.post("/api/auth/reset-password", {
        access_token: accessToken.value,
        password: password.value
      });
  
      message.value = "Contraseña actualizada correctamente";
  
      setTimeout(() => {
        router.push("/login");
      }, 2000);
  
    } catch (err) {
      error.value =
        err.response?.data?.error || "Error al actualizar contraseña";
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
  
  .success {
    color: #2e7d32;
    margin-top: 15px;
  }
  
  .error {
    color: #d32f2f;
    margin-top: 15px;
  }
  </style>
  