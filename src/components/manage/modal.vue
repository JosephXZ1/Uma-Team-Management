<script setup>
import { ref } from 'vue'
import Boton from '@/components/button.vue'

const props = defineProps(
{
    mostrar:
    { 
        type: Boolean, 
        required: true 
    },
    uma: 
    { 
        type: Object, 
        required: true
    }
})

//Emits necesarios para botones
defineEmits(['cerrar-modal', 'translate-name', 'sustituir'])

//Por defecto, cuando se abra el modal, mostrará como racewear y nombre en ingles
const ropaActual = ref('racewear')
const idiomaActual = ref('en')
</script>

<template>
    <div v-if="mostrar" class="modal-overlay flex" @click="$emit('cerrar-modal')">
        
        <div class="modal-caja flex" @click.stop>
            <div class="modal-img flex flexColumn">
                <img :src="ropaActual === 'racewear' ? uma.racewear : uma.uniform"   :alt="uma.nombre">
                <div class="flex">
                    <Boton 
                        texto="Uniforme"
                        @click-accion="ropaActual = 'uniforme'" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                        class="flexGrow"
                    />
                    <Boton 
                        texto="Racewear" 
                        @click-accion="ropaActual = 'racewear'" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                        class="flexGrow"
                    />
                </div>
            </div>
            
            <div class="modal-info flex flexColumn">
                <h2>{{ idiomaActual === 'en' ? uma.nombre : uma.nombreJP }}</h2>
                <div class="information">
                    <p>{{ uma.frase }}</p>
                    <ul>
                        <li>Altura: {{ uma.altura }}</li>
                        <li>Residencia: {{ uma.residencia }}</li>
                        <li>Grado: {{ uma.grado }}</li>
                    </ul>
                </div>
                <div class="buttons flex">
                    <Boton 
                        texto="Cambiar nombre a JP/EN" 
                        @click-accion="idiomaActual = idiomaActual === 'en' ? 'jp' : 'en'" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                    />
                    <Boton 
                        texto="Sustituir Uma" 
                        @click-accion="$emit('sustituir')" 
                        color="blanco" 
                        :style="{'--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                    />
                    <Boton 
                        texto="Cerrar" 
                        @click-accion="$emit('cerrar-modal')" 
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
    z-index: 100;
}

.modal-caja
{
    width: 85%;
    height: 85%;
    padding: 2rem;  
    border-radius: 1rem;    
    background-color: #fff;
    gap: 2rem;
    overflow-y: auto;
}

/* IMAGEN */
.modal-img
{
    flex: 3;
    height: 100%;
    gap: 1rem;
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
    font-size: clamp(3rem, 4vw, 5rem);
    font-style: italic;
}

.modal-info .information
{
    width: 100%;
    min-height: 55%;
}

.information p
{
    margin-bottom: 2.3rem;
    font-size: clamp(1.7rem, 1.7vw , 2.3rem);;
    font-weight: 550;
    font-style: italic;
}

.information ul li
{
    font-size: clamp(1.3rem, 1.5vw, 2rem);
    font-weight: 500;
    line-height: clamp(2rem, 2.5vw, 3.5rem);
}

.modal-info .buttons {gap: 1rem;}
</style>