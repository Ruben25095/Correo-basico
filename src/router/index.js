import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Inbox from "../views/Inbox.vue";
import Message from "../views/Message.vue";
import Send from "../views/Send.vue";
import Papelera from "../views/Papelera.vue";   //nueva ruta

/*const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  { path: "/", redirect: "/inbox" },
  { path: "/inbox", component: Inbox, meta: { auth: true } },
  { path: "/inbox/:id", component: Inbox, meta: { auth: true } },
  { path: "/send", component: Send, meta: { auth: true } },
  { path: "/message/:id", component: Message, meta: { auth: true } },
  { path: "/papelera/:id", component: Papelera, meta: { auth: true } }
];*/
const routes = [
  { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
     
    { path: "/aux1", redirect: "/inbox" },
    { path: "/inbox", component: Inbox, meta: { auth: true } },
    { path: "/inbox/:id", component: Inbox, meta: { auth: true } },
    { path: "/send", component: Send, meta: { auth: true } },
  
    // ver un mensaje específico
    { path: "/aux2", redirect: "/message" },
    { path: "/message", component: Message, meta: { auth: true } },
    { path: "/message/:id", component: Message, meta: { auth: true } },
  
    // papelera (lista)
    { path: "/aux3", redirect: "/papelera" },
    { path: "/papelera", component: Papelera, meta: { auth: true } },
    { path: "/papelera/:id", component: Papelera, meta: { auth: true } }
  ];
  

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  if (to.meta.auth && !localStorage.getItem("token")) {
    return "/login";
  }
});

export default router;
