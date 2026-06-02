<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Boton from '@/components/button.vue'

//Activar el enrutador de Vue para poder cambiar de página
const router = useRouter()

//Crear las variables reactivas de Vue
const teamName = ref('')
const uma1 = ref('')
const uma2 = ref('')
const uma3 = ref('')
const uma4 = ref('')
const mensajeError = ref('')

//Declaracion de la función de validación
const validarYGuardar = () =>
{
    //.value es la forma en la que Vue accede al texto real dentro de un ref()
    //Variables que formatean para empezar la validacion eliminando espacios con el metodo trim()
    const nombreFiltro = teamName.value.trim()
    const u1 = uma1.value.trim()
    const u2 = uma2.value.trim()
    const u3 = uma3.value.trim()
    const u4 = uma4.value.trim()

    //EVALUACIÓN 1: ¿Campos vacíos?
    if (!nombreFiltro || !u1 || !u2 || !u3 || !u4)
    {
        mensajeError.value = 'ⓘ Error: Todos los campos son obligatorios.'
        return 
    }

    //EVALUACIÓN 2: ¿Nombres repetidos?
    //Primero se juntan todos los nombres escritos en un arreglo y se transforman a minuscula todo con el metodo lowerCase() para su posterior evaluacion
    const arregloUmas =
    [
        u1.toLowerCase(), 
        u2.toLowerCase(), 
        u3.toLowerCase(), 
        u4.toLowerCase()
    ]
    
    //Set es una estructura de datos nativa de JavaScript muy especial, es un conjunto que no permite elementos repetidos, se le da el arreglo ya formateados (sin espacios y ahora sin mayusculas) y entrega un arreglo nuevo sin copias
    const umasUnicas = new Set(arregloUmas)

    //Una vez se tiene el nuevo arreglo se comprueba que el arreglo set sea igual de largo que el original (hayan 4 registros totales) con size (es un legth para set y map) ya que, si hay diferentes registros, deberían ser iguales y todo saldría bien, si hay menos eso quiere decir que hubo duplicados y por ende salta la alarma
    if (umasUnicas.size !== arregloUmas.length)
    {
        mensajeError.value = 'ⓘ Error: No puedes registrar a la misma integrante dos o más veces.'
        return
    }

    //Si no hay detalles, no se muestran los mensajes
    mensajeError.value = '' 
    
    //Area para cosas de la API

    router.push('/manage')
}
</script>

<template>
    <main class="flex">
        <form class="form" @submit.prevent="validarYGuardar"><!-- Submit.prevent activa toda la logica de validacion -->
            <div class="form-wideCont flex">
                <h2>Crea tu equipo</h2>
            </div>

            <div class="form-wideCont flex flexColumn">
                <label for="teamName" class="teamLabel">¿Cómo se llamará su equipo?</label>
                <input type="text" id="teamName" v-model="teamName" placeholder="Team Spica" class="teamInput transition">
            </div>

            <div class="form-splitCont flex flexColumn">
                <label for="uma1">Integrante 1</label>
                <input type="text" id="uma1" v-model="uma1" placeholder="Special Week" class="transition">

                <label for="uma2">Integrante 2</label>
                <input type="text" id="uma2" v-model="uma2" placeholder="Silence Suzuka" class="transition">
            </div>
            
            <div class="form-splitCont flex flexColumn">
                <label for="uma3">Integrante 3</label>
                <input type="text" id="uma3" v-model="uma3" placeholder="Vodka" class="transition">

                <label for="uma4">Integrante 4</label>
                <input type="text" id="uma4" v-model="uma4" placeholder="Daiwa Scarlett" class="transition">
            </div>
            
            <div v-if="mensajeError" class="form-errorCont flex">
                <p>{{ mensajeError }}</p>
            </div>

            <div class="form-wideCont flex">
                <Boton
                    texto="Crear Equipo"
                    class="margin"
                    @click-accion="validarYGuardar"
                />
            </div>
        </form>
    </main>
</template>

<style scoped>
main
{
    width: 100%;
    height: 100vh;
}

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
    height: clamp(140px, 18vh, 150px); 
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

.form-splitCont
{
    /* No se pone span, así que ocupa solo 1 columna (el 50%) automáticamente */
    height: clamp(190px, 30vh, 220px);
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

/* ESTILOS DEL BANNER DE ERROR */
.form-errorCont
{
    grid-column: span 2;
    color: #fd4401;
    font-size: 1.3rem;
    font-weight: 600;
    align-items: center;
}

.form-wideCont:last-of-type
{
    height: auto;
    padding: 1.5rem 0;
}

/* Boton */
.margin
{
    margin: auto;
    box-shadow: 0px 4px 2px #a8a6b7;
}
</style>