<script setup>
import Boton from '@/components/button.vue'
</script>

<template>
    <form class="form">
        <div class="form-wideCont flex">
            <h2>Crea tu equipo</h2>
        </div>
        
        <div class="form-wideCont">

        </div>
        
        <div class="form-splitCont">

        </div>
        <div class="form-splitCont">

        </div> 
        
        <div class="form-wideCont">
            <button>Botón centrado</button>
        </div>
    </form>
</template>

<style scoped>
/* CONTENEDOR PADRE */
.form
{
    display: grid;
    grid-template-columns: 1fr 1fr; /* Creamos 2 columnas exactamente iguales (1 fracción y 1 fracción) */
    width: 55%;
    background-color: #d3d3d3;
    border-radius: 1rem;
    overflow: hidden;
}

/* LOS CONTENEDORES HIJOS */
.form-wideCont
{
    grid-column: span 2; /* Le decimos: "Tú vas a estirarte y ocupar las 2 columnas" */
    height: 15vh; 
    background-color: white;
    border: 2px solid gray;
}

.form-wideCont:first-of-type
{
    height: 7vh;
    /* background: #9be800; */
    background: linear-gradient(180deg, #9be800 10%, #4bcd00 100%);
    font-size: 1.3rem;
    font-weight: 550;
    color: #fff;
    box-shadow: 0px 2px 5px #afafaf;
    position: relative;
}

.form-wideCont:last-of-type{height: 10vh;}

.form-splitCont
{
    /* No le ponemos span, así que ocupa solo 1 columna (el 50%) automáticamente */
    height: 40vh; 
    background-color: white;
    border: 2px solid gray;
}
</style>