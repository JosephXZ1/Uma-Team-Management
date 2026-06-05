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
      component: Home,
      meta: {title: 'TA: Team Manager'}
    },

    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {title: 'Crea tu equipo'}
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      meta: {title: 'Gestión de equipo'}
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

router.beforeEach((to, from, next) =>
{
  document.title = to.meta.title
  next()
})

export default router
