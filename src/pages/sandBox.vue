<script setup>
import { ref } from 'vue'
import Boton from '@/components/button.vue'
import Modal from '@/components/prueba.vue'


</script>

<template>
    <main class="manage-container">

        <Modal 
            :mostrar="true"
        />
        
    </main>
</template>

<style scoped>
main
{
    width: 100%;
    height: 100vh;
    padding: 3rem 6.5rem 1.5rem;
    justify-content: flex-start;
    gap: 2rem;
}

.head
{
    gap: 1rem;
}

.head h2
{
    font-size: 4rem;
}

.characterCont
{
    width: 100%;
    height: 75%;
    gap: 2rem;

    /* background-color: aquamarine; */
}

.characterCont-card
{
    height: 100%;
    padding: 1rem 1rem;
    flex: 1;
    justify-content: space-between;    
    background-color: #f9f9f9;
    border-radius: 1.5rem;
    border: 2px solid #c2bfc3;

    box-shadow: 0 5px 7px transparent
}

.characterCont-card:hover{ box-shadow: 0 5px 7px #a8a6b7;}

.characterCont-card img  {height: clamp(350px,51vh,518px);}



/* MODALES DE PERSONAJE */
/* Overlay */
.modal-overlay
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000080;
    
    /* Usamos flexbox para centrar la caja interior perfectamente */
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 100;
}

/* El contenedor */
.modal-caja
{
    background-color: #fff; /* Color base */
    padding: 2rem;
    border-radius: 10px;
    width: 50%;
    max-height: 80vh;
    overflow-y: auto;
}
</style>