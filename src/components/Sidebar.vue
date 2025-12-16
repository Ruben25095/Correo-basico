<template>
    <nav class="sidebar">
      <slot name="header"></slot> 
  
 
       
      <router-link to="/aux1">Inbox</router-link>  <!-- ruta para  /inbox a /aux1 --> 
      <router-link to="/send">Enviar</router-link>
      <router-link to="/aux2">Enviados</router-link> <!-- ruta para  /message a /aux1 --> 
      <router-link to="/aux3">Papelera</router-link> <!-- ruta para  /papelera a /aux1 --> 

  
      <slot name="footer"></slot>

      <div class="sidebar" >
          <button  @click="logout">Salir</button>
        </div>
    </nav>
  
   
  </template>
  
  <script setup>
    const logout = () => {
  console.log(localStorage.getItem("username"));
  localStorage.removeItem("token");
  // redirige al usuario
  location.href = "/login";
};
 
  </script>
  
  <style scoped>
 
  .sidebar {

    width: 200px;
    background-color: #333; /* Color de fondo oscuro */
    padding: 20px 10px;
    display: flex;
    flex-direction: column; /* Coloca los elementos verticalmente */
    flex-shrink: 0; /* Evita que el sidebar se encoja */
  }
  
  /* estilos para los enlaces de navegacion */
  .sidebar a {
    color: white;
    padding: 10px;
    text-decoration: none;
    margin-bottom: 5px;
    border-radius: 4px;
    text-align: left;
    transition: background-color 0.3s;
    display: block; /* ocupa todo el ancho disponible */
  }
  .sidebar button {
    color: white;
    padding: 10px;
    text-decoration: none;
    margin-bottom: 5px;
    border-radius: 4px;
    text-align: left;
    transition: background-color 0.3s;
    display: block; /* ocupa todo el ancho disponible */
  }

  

  .sidebar a:hover {
    background-color: #348cdf;
  }
  .sidebar button:hover {
    background-color: #348cdf;
  }
 
  
  /*ver enlace activo */
  .sidebar a.router-link-exact-active {
   
    font-weight: bold;
  }

  .sidebar button  {
      background-color:red;
   
      color: white;
      cursor: pointer;
      padding: 10px;
      width: 60%;
      border-radius: 4px;
      transition: background-color 0.3s;
  }
  
  .sidebar :slotted(.logout-footer button) {
      background-color: transparent;
      border: 1px solid white;
      color: white;
      cursor: pointer;
      padding: 10px;
      width: 100%;
      border-radius: 4px;
      transition: background-color 0.3s;
  }
  
  .sidebar :slotted(.logout-footer button:hover) {
      background-color: #721c24; /* Rojo oscuro al pasar el mouse */
      border-color: #721c24;
  }
  .logout-footer {
    padding: 10px;
    margin-bottom: 10px;
    color: white;
    background-color: #575757;
  
  }
  </style>