<script setup>
import { defineProps } from 'vue'

defineProps(
{
    texto:
    {
        type: String,
        required: true
    },
    redireccion:
    {
        type: String,
        default: null
    },
    color:
    {
        type: String,
        default: 'verde'
    }
})
</script>

<template>
    <!-- If se trata de un boton para redireccionar -->
    <router-link v-if="redireccion" :to="redireccion" :class="['button','transition',color]">
        {{ texto }}
    </router-link>

    <!-- Else entonces será un botón de acción normal -->
    <button v-else @click="$emit('click-accion')" :class="['button','transition',color]" type="button">
        {{ texto }}
    </button>
</template>

<style scoped>
.button 
{
    padding: 1.2rem 2.1rem;
    background-color: #8ccf05;
    border: 3px solid;
    border-radius: 12px;
    font-size: 1.7rem;
    font-weight: 570;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    cursor: pointer;

    width: var(--btnWidth, fit-content);
}

/* Colores de los botones */
/* Estilo exclusivo del Home */
.home
{
    background-color: #8ccf056e;
    color: #fff;
    border-color: #396c05;
}

.verde 
{
    background-color: #8ccf05;
    color: #fff;
    border-color: #396c05;
}
.rojo 
{
    background-color: #f03d30;
    color: #fff;
    border-color: #b13f25;
}
.blanco 
{
    background-color: #feffff;
    color: #6b4129;
    border-color: #75708b;
}

.button:hover
{
    /* background-color: #7ebb04; */
    filter: brightness(90%);
}
</style>