<script setup>
import Boton from '@/components/button.vue'
</script>

<template>
    <form class="form">
        <!-- Titulo -->
        <div class="form-wideCont flex">
            <h2>Crea tu equipo</h2>
        </div>
        <!-- Input de nombre de equipo (contenedor completo) -->
        <div class="form-wideCont flex flexColumn">
            <label for="teamName" class="teamLabel">¿Cómo se llamará su equipo?</label>
            <input type="text" id="teamName" name="teamName" placeholder="Team Spica" class="teamInput transition">
        </div>

        <!-- Input de las Umas (contenedor partido) -->
        <div class="form-splitCont flex flexColumn">
            <label for="uma1">Integrante 1</label>
            <input type="text" id="uma1" name="uma1" placeholder="Special Week" class="transition">

            <label for="uma2">Integrante 2</label>
            <input type="text" id="uma2" name="uma2" placeholder="Silence Suzuka" class="transition">
        </div>
        <div class="form-splitCont flex flexColumn">
            <label for="uma3">Integrante 3</label>
            <input type="text" id="uma3" name="uma3" placeholder="Vodka" class="transition">

            <label for="uma4">Integrante 4</label>
            <input type="text" id="uma4" name="uma4" placeholder="Daiwa Scarlett" class="transition">
        </div>
        
        <!-- Boton de enviar -->
        <div class="form-wideCont flex">
            <div v-if="mensajeError" class="alerta-roja">
                {{ mensajeError }}
            </div>
            
            <Boton
            texto="Crear Equipo"
            redireccion="/create"
            class="margin"
            />
        </div>
    </form>
</template>

<style scoped>
/* CONTENEDOR PADRE */
.form
{
    display: grid;
    grid-template-columns: 1fr 1fr; /* Lo que separa a las dos columnas de forma pareja */
    width: 65%;
    background-color: #f9f9f9;
    border: 2px solid #c2bfc3;
    border-radius: 1rem;
    box-shadow: 0px 10px 10px #a8a6b7;
    overflow: hidden;
}

/* LOS CONTENEDORES HIJOS */
.form-wideCont
{
    grid-column: span 2;
    height: 18vh; 
    background-color: #fff;
}

.form-wideCont:first-of-type
{
    height: clamp(70px, 11vh, 80px);
    background: linear-gradient(180deg, #9be800 10%, #4bcd00 100%);
    font-size: 1.3rem;
    font-weight: 550;
    color: #fff;
    box-shadow: 0px 2px 5px #afafaf;
    position: relative;
}

.form-wideCont:last-of-type{height: 20vh;}

.form-splitCont
{
    /* No se ponemo span, así que ocupa solo 1 columna (el 50%) automáticamente */
    height: 30vh; 
    background-color: #fff;
}

/* ESTILOS DE LOS INPUTS Y LABELS */
/* Label e Input de nombre de equipo */
.form .teamLabel
{
    margin-top: 0;
    font-size: 1.7rem;
    font-weight: 610;
}

.form .teamInput
{
    font-size: 1.5rem;
    font-weight: 550;
}
/* Los demás Labels e Inputs */
.form label
{
    margin-top: 1rem;
    margin-bottom: 7px;
    color: #784015;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
}

.form input
{
    width: 80%;    
    padding: 0.7rem;
    font-size: 1.3rem;
    font-weight: 550;
    text-align: center;
    color: #784015;
    background-color: #fffaf5;
    outline: none;
    border: 3px solid #e3d4c4;
    border-radius: 1rem;    
}

/* Para el primer label (evitar margenes) */
label[for="uma1"], label[for="uma3"]{margin-top: 0;} 

.form input:focus {background-color: #fff5eb;}

input::placeholder{font-size: 1.5rem; font-weight: 550;}

/* Boton */
.margin
{
    margin: auto;
    box-shadow: 0px 4px 2px #a8a6b7;
}
</style>