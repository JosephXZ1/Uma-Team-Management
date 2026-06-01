<script setup>
import Prueba from '@/components/prueba.vue'


</script>

<template>
    <div class="coso">

        <!-- 
            SINTAXIS PARA ESCRIBIR BOTONES

            1- Redireccion
            <Prueba
            texto="Crear Equipo"
            redireccion="/create"
            color="rojo"
            :style="{'--btnWidth' : '50%'}"
        />

        2- Accion
        <Prueba
            texto="Switch Idioma"
            @click-accion="cambiarIdiomaJapones"
            color="blanco"
        /> -->

    </div>
</template>

<style scoped>
.coso
{
    width: 100%;
    height: 100vh;
    background-color: #e2e2e2;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>