<script setup>
import { ref } from 'vue'

import Boton from '@/components/button.vue'
import Modal from '@/components/manage/modal.vue'
import Replace from '@/components/manage/replace.vue'

//1. FUNCION DE CAMBIAR NOMBRE Y DISOLVER EQUIPO
//Nombre inicial del equipo
const nombreEquipo = ref('Team Spica')

//La función que activa el botón 'Cambiar nombre'
const cambiarNombre = () =>
{
    const nuevoNombre = prompt("Ingresa el nuevo nombre para tu equipo:", nombreEquipo.value)
    
    // 1. Lo primero es revisar si canceló la operación
    if (nuevoNombre === null)
    {
        //El usuario presionó "Cancelar", se sale de la función sin hacer nada
        return 
    }
    
    const nombreFormateado = nuevoNombre.trim()

    //Validaciones con los textos formateados
    if (nombreFormateado === nombreEquipo.value) //Importante el .value para que funcione
    {
        alert('Error: Escribió el mismo nombre actual.')
    } 
    else if (nombreFormateado === "")
    {
        alert('Error: Ha dejado el campo vacío o solo escribió espacios en blanco.')
    } 
    else
    {
        //Si superó ambas pruebas, el nombre es nuevo y válido
        nombreEquipo.value = nombreFormateado
    }
}

//La función que activa el botón 'Disolver equipo'
const eliminarEquipo = () =>
{
    // Aquí puedes meter un confirm() nativo rápido también
    const seguro = confirm("¿Estás seguro de que deseas disolver el equipo? Esta acción no se puede deshacer.")
    if (seguro)
    {
        console.log("Equipo disuelto...")
        // Lógica futura para borrar datos y regresar a la pantalla de inicio
    }
}

//1. FUNCIONES DE FICHA
//Estado inicial de la ficha (cerrado al entrar obviamente)
const abrirFicha = ref(false)

//Objetos temporales estaticos sin API (Una 'Base de datos')
const lasUmas = ref(
[
    {
        id: 1,
        nombre: "Special Week",
        nombreJP: 'スペシャルウィーク',
        racewear: "/src/assets/Multimedia/Imagenes/specialweek_02_2.png", 
        uniform: "/src/assets/Multimedia/Imagenes/specialweek_01.png",
        frase: "My name is Special Week! My dream is to be the best Umamusume in Japan! I'm gonna pull my own weight to make my moms proud!",
        altura: "158 cm",
        residencia: "Ritto Dorm",
        grado: "Middle School"
    },
    {
        id: 2,
        nombre: "Silence Suzuka",
        nombreJP: 'サイレンススズカ',
        racewear: "/src/assets/Multimedia/Imagenes/silencesuzuka_02.png", 
        uniform: "/src/assets/Multimedia/Imagenes/silencesuzuka_01.png",
        frase: "I'm Silence Suzuka. I like to run. I'm not giving the lead to anyone. Um... That's all.",
        altura: "161 cm",
        residencia: "Ritto Dorm",
        grado: "High School"
    },
    {
        id: 3,
        nombre: "Tokai Teio",
        nombreJP: 'トウカイテイオー',
        racewear: "/src/assets/Multimedia/Imagenes/tokaiteio_02.png", 
        uniform: "/src/assets/Multimedia/Imagenes/tokaiteio_01.png",
        frase: "Heya, I'm Tokai Teio! I'm going to be an undefeated Triple Crown Umamusume, so don't let me out of your sight!",
        altura: "150 cm",
        residencia: "Ritto Dorm",
        grado: "Middle School"
    },
    {
        id: 4,
        nombre: "Mejiro McQueen",
        nombreJP: 'メジロマックイーン',
        racewear: "/src/assets/Multimedia/Imagenes/mejiromcqueen_02.png", 
        uniform: "/src/assets/Multimedia/Imagenes/mejiromcqueen_01.png",
        frase: 'My name is Mejiro McQueen. Conquering the "Spring Tennosho" has been a long-cherished goal of the Mejiro family, and I will do it with my own two legs.',
        altura: "159 cm",
        residencia: "Ritto Dorm",
        grado: "Middle School"
    }
])

//Aquí se guardara temporalmente los datos de la uma seleccionada (null al inicio porque pues no se selecciono ninguna ficha para ver logicamente)
const personajeSeleccionado = ref(null)

//La función que activa el botón 'Ver ficha'
const verFicha = (IdPersonaje) =>
{
    //Basado en el ID del botón declarado en el componente (1, 2, 3, 4), se busca en el arreglo a la Uma que coincida con el ID que mandó el botón
    const umaEncontrada = lasUmas.value.find(uma => uma.id === IdPersonaje)
    
    if (umaEncontrada)
    {
        personajeSeleccionado.value = umaEncontrada //Se ponen los datos en la caja vacía
        abrirFicha.value = true              //El modal se inicia y enciende
    }
}

//Ventana de sustitucion por defecto en false para que este cerrada
const modalSustituirAbierto = ref(false)

//La función que activa el botón 'sustituir Uma'
const abrirSustitucion = () => 
{
    modalSustituirAbierto.value = true
}

//La función que activa el botón 'cancelar'
const cerrarSustitucion = () => 
{
    modalSustituirAbierto.value = false
}

const iniciarSustitucion = () =>
{
    console.log("Abriendo segundo modal de sustitución...")
    // modalSustituirAbierto.value = true
}



//La función que activa el botón 'Cerrar' dentro de la ficha
const cerrarFicha = () =>
{
    abrirFicha.value = false
    personajeSeleccionado.value = null
}


</script>

<template>
    <main class="flex flexColumn">
        <div class="head flex">
            <h2>{{ nombreEquipo }}</h2>
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
                    @click-accion="verFicha(1)"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/silencesuzuka_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha(2)"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/tokaiteio_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha(3)"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>
            <div class="characterCont-card flex flexColumn transition">
                <img src="@/assets/Multimedia/Imagenes/mejiromcqueen_02.png" alt="">
                <Boton
                    texto="Ver ficha"
                    @click-accion="verFicha(4)"
                    :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                />
            </div>

            <Modal 
                v-if="personajeSeleccionado"
                :mostrar="abrirFicha"
                :uma="personajeSeleccionado"
                @cerrar-modal="cerrarFicha"
                @sustituir="abrirSustitucion"
            />     
            
            <Replace 
                :mostrar="modalSustituirAbierto"
                @cerrar-modal="cerrarSustitucion"
                @aceptar="cerrarSustitucion"
            />
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