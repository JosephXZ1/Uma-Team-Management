<script setup>
// Le decimos a Vue que este componente puede emitir la señal 'cerrar-modal'
// defineEmits(['cerrar-modal'])

import Boton from '@/components/button.vue'
</script>

<template>
    <div class="modal-overlay flex" @click="$emit('cerrar-modal')">
        <div class="modal-caja flex" @click.stop>
            
            <!-- Contenedor de imagen y botones relacionados -->
            <div class="modal-img flex flexColumn">
                <img src="@/assets/Multimedia/Imagenes/goldship_02.png" alt="">
                <div class="flex">
                    <Boton 
                        texto="Uniforme" 
                        @click-accion="cambiarUniform" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                        class="flexGrow"
                    />
                    <Boton 
                        texto="Racewear" 
                        @click-accion="cambiarRace" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                        class="flexGrow"
                    />
                </div>
            </div>
            
            <!-- Contenedor de informacion y acciones -->
            <div class="modal-info flex flexColumn">
                <h2>Gold Ship</h2>
                <div class="information">
                    <p>Yo, I'm Gold Ship! I don't care if it's on the turf, on fire, or at the edge of the universe. I'm going to find something interesting wherever I can! ☆</p>
                    <ul>
                        <li>Altura: 170cm</li>
                        <li>Residencia: Ritto Dorm</li>
                        <li>Grado: ???</li>
                    </ul>
                </div>
                <div class="buttons flex">
                    <Boton 
                        texto="Cambiar nombre a Japonés/Inglés" 
                        @click-accion="translateName" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                    />
                    <Boton 
                        texto="Sustituir Uma" 
                        @click-accion="sustituir" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                    />
                    <Boton 
                        texto="Cerrar" 
                        @click-accion="cerrarModal" 
                        color="rojo" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Aquí pegamos exactamente el mismo CSS estructural que vimos antes */
.modal-overlay
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #00000080;
    z-index: 1000;
}

.modal-caja
{
    width: 85%;
    height: 85%;
    padding: 2rem;  
    border-radius: 1rem;    
    background-color: #fff;


    overflow-y: auto;
}

/* IMAGEN */
.modal-img
{
    flex: 3;
    height: 100%;
}

.modal-img img {height: 87%;}

.modal-img div[class="flex"]
{
    width: 77%;
    gap: 1rem;
}

.flexGrow {flex: 1;}

/* INFORMACION DEL PERSONAJE */
.modal-info
{
    flex: 7;
    height: 100%;
    align-items: flex-start;
}

.modal-info h2
{
    font-family: "Aleo", serif;
    font-size: 5rem;
    font-style: italic;
}

.modal-info .information
{
    width: 100%;
    min-height: 55%;
}

.information p
{
    margin-bottom: 3rem;
    font-size: 2.3rem;
    font-weight: 550;
    font-style: italic;
}

.information ul li
{
    font-size: 2rem;
    font-weight: 500;
    line-height: 3.5rem;
}

.modal-info .buttons
{
    gap: 1rem;
}
</style>