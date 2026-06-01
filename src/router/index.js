//Aqui se importan las 'librerias' necesarias para el funcionamiento del router
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/home.vue'
import Create from '@/pages/create.vue'
import Manage from '@/pages/manage.vue'

import SandBox from '@/pages/sandBox.vue'

const routes =
[
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    },

    //Este enlace es un sandBox, un sitio de prueba de componentes temporal, eliminar cuando se termine todo
    {
      path: '/sandBox',
      component: SandBox
    },   
]

const router = createRouter(
{
    history: createWebHistory(),
    routes
})

export default router
