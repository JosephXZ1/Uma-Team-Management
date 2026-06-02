<script setup>
import Boton from '@/components/button.vue'

import { ref } from 'vue'

const mostrarModal = ref(false)
// Esta variable guardará el nombre (o el ID) del personaje seleccionado
const personajeSeleccionado = ref('') 

// La función ahora recibe un parámetro llamado "personaje"
const verFicha = (personaje) =>
{
    personajeSeleccionado.value = personaje // Guardamos quién fue clickeado
    mostrarModal.value = true               // Abrimos el modal
}

const cerrarModal = () =>
{
    mostrarModal.value = false
    personajeSeleccionado.value = '' // Limpiamos la selección por buena práctica
}
</script>

<template>
    <main class="flex flexColumn">
        <div class="head flex">
            <h2>Team Spica</h2>
            <Boton
                texto="Cambiar nombre"
                @click-accion="cambiarNombre"
                color="blanco"
                :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'} "
            />
            <Boton
                texto="Disolver equipo"
                @click-accion="eliminarEquipo"
                color="rojo"
                :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'} "
            />
        </div>

        <div class="characterCont flex">
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/specialweek_02_2.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha('Special Week')"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/silencesuzuka_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha('Silence Suzuka')"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/tokaiteio_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha('Tokai Teio')"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/mejiromcqueen_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha('Mejiro McQueen')"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
        </div>
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

.characterCont-card img  {height: clamp(232px,53vh,518px);}



/* MODALES DE PERSONAJE */
/* Overlay */
.modal-overlay
{
    position: fixed; /* Se queda fijo en la pantalla aunque hagas scroll */
    top: 0;
    left: 0;
    width: 100vw; /* Ocupa todo el ancho de la ventana */
    height: 100vh; /* Ocupa todo el alto de la ventana */
    background-color: rgba(0, 0, 0, 0.5); /* Color negro con 50% de transparencia */
    
    /* Usamos flexbox para centrar la caja interior perfectamente */
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 1000; /* Asegura que flote por encima de toda la página */
}

/* El contenedor */
.modal-caja
{
    background-color: white; /* Color base */
    padding: 2rem;
    border-radius: 10px;
    width: 50%; /* Puedes ajustarlo, usar clamp() o un min-width */
    max-height: 80vh; /* Evita que sea más alto que la pantalla */
    overflow-y: auto; /* Si el contenido de la API es muy largo, crea una barra de scroll interna */
    
    /* Aquí ya eres libre de usar grid, flex o lo que necesites para tu diseño interior */
}
</style>