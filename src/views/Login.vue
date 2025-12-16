<template>
    <div class="login-container">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login" class="login-form">
          <div class="input-group">
            <input 
              v-model="email" 
              placeholder="Correo Electrónico" 
              type="email" 
              required
            />
          </div>
          <div class="input-group">
            <input 
              v-model="password" 
              type="password" 
              placeholder="Contraseña" 
              required
            />
          </div>
          <button type="submit" :disabled="!email || !password">Entrar</button>
        </form>
        
        <button @click="gotoRegister()">Registrarse</button>
      </div>
     
    </div>
  </template>
    
  <script setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router';
  import api from "../api/axios"; // importamos axios para hacer peticiones HTTP
    
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  
  const gotoRegister = () => {
    console.log("Redirigiendo a registro...");
    router.push('/register');
  };

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email: email.value,
        password: password.value
      });
  
      // guardar token
      localStorage.setItem("token", res.data.data.access_token);
      // Usamos location.href para asegurar una recarga completa del layout (ej: mostrar el sidebar)
      location.href = "/"; 
    } catch (error) {
      // Manejo de errores más específico si el backend lo proporciona
      const message = error.response?.data?.message || "Credenciales inválidas. Inténtalo de nuevo.";
      alert(message);
    }
  };
  </script>
    
  <style scoped>
 
  
  /* Contenedor principal para centrar todo */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ocupa toda la altura de la ventana */
    background-color: #f4f7f6; /* Fondo suave */
  }
  
  /* Tarjeta (Card) de Login */
  .login-card {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra elegante */
    width: 100%;
    max-width: 380px; /* Ancho máximo para que no se vea gigante */
    text-align: center;
  }
  
  h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.8em;
    border-bottom: 2px solid #007bff;
    display: inline-block;
    padding-bottom: 5px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  /* Estilos de los campos de input */
  input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Asegura que el padding no cambie el ancho */
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
  }
  
  /* Estilos del botón de Entrar */
  button {
    background-color: #007bff; /* Azul primario */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 10px;
    transition: background-color 0.3s, opacity 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  /* Estilos para el botón deshabilitado */
  button:disabled {
    background-color: #a0c9f8;
    cursor: not-allowed;
    opacity: 0.8;
  }
  </style>