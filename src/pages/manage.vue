<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { umaService } from '@/services/umaService'

import Boton from '@/components/button.vue'
import Modal from '@/components/manage/modal.vue'
import Replace from '@/components/manage/replace.vue'

const router = useRouter()

// ESTADOS DE CONTROL Y LOGÍSTICA DE RED
const nombreEquipo = ref('')
const integrantesEquipo = ref([]) //Inicia vacío, la API lo va a rellenar
const hayDatos = ref(false)
const cargando = ref(true) //Pantalla de carga mientras responde internet

onMounted(async () =>
{
    try
    {
        //1- Se intenta recuperar el equipo del LocalStorage ()
        const equipoGuardado = umaService.obtenerEquipoDeLocal()

        if (equipoGuardado)
        {
            hayDatos.value = true
            nombreEquipo.value = equipoGuardado.nombre

            //2- Se usa map para las 4 IDs guardadas para pedir sus datos reales a la API
            const promesasPersonajes = equipoGuardado.integrantesIds.map(async (id) =>
            {
                //Se activa la consulta de textos y la de imágenes en paralelo
                const [datosTexto, datosImagenes] = await Promise.all(
                [
                    umaService.getCharacterById(id),
                    umaService.getCharacterImagesById(id)
                ])

                //Se busca en el arreglo la categoría "Uniform" y "Racewear"
                const bloqueUniforme = datosImagenes.find(item => item.label_en === "Uniform")
                const bloqueRacewear = datosImagenes.find(item => item.label_en === "Racewear")

                //Se extraen la URL de la imagen. Usamos el signo de interrogación (?.) 
                //por si alguna Uma no tiene imagen subida, para evitar errores
                const urlUniforme = bloqueUniforme?.images?.[0]?.image || ''
                const urlRacewear = bloqueRacewear?.images?.[0]?.image || ''

                //Se junta todos los datos en un formato idéntico al que ya se usaba en la version estatica
                return(
                {
                    id: id,
                    nombre: datosTexto.name_en,
                    nombreJP: datosTexto.name_jp,
                    frase: datosTexto.profile,
                    altura: datosTexto.height,
                    residencia: datosTexto.residence,
                    grado: datosTexto.grade,
                    uniform: urlUniforme, // Usamos las nuevas variables extraídas
                    racewear: urlRacewear
                })
            })

            //Se resuelven las 4 peticiones simultáneas
            integrantesEquipo.value = await Promise.all(promesasPersonajes)
        }
        else
        {
            hayDatos.value = false
        }
    }
    catch (error)
    {
        console.error("Error al conectar con los servidores de Umapyoi.net:", error)
    }
    finally
    {
        cargando.value = false //Se quita el letrero de carga
    }
})


//1- FUNCIÓN DE CAMBIAR NOMBRE Y DISOLVER EQUIPO
const cambiarNombre = () =>
{
    const nuevoNombre = prompt("Ingresa el nuevo nombre para tu equipo:", nombreEquipo.value)
    
    if (nuevoNombre === null) return 
    
    const nombreFormateado = nuevoNombre.trim()

    if (nombreFormateado === nombreEquipo.value)
    {
        alert('Error: Escribió el mismo nombre actual.')
    } 
    else if (nombreFormateado === "")
    {
        alert('Error: Ha dejado el campo vacío o solo escribió espacios en blanco.')
    } 
    else
    {
        nombreEquipo.value = nombreFormateado
        
        const equipoActual = umaService.obtenerEquipoDeLocal()
        if (equipoActual) {
            umaService.guardarEquipoEnLocal(nombreFormateado, equipoActual.integrantesIds)
        }
    }
}

const eliminarEquipo = () =>
{
    const seguro = confirm("¿Estás seguro de que deseas disolver el equipo? Esta acción no se puede deshacer.")
    if (seguro)
    {
        console.log("Equipo disuelto...")
        localStorage.removeItem('escuderia_spica_datos') // Limpia el almacén local
        hayDatos.value = false
        router.push('/') // Te regresa a la bienvenida o home
    }
}

//2- FUNCIONES DE FICHA (CONECTADO A LOS DATOS DE LA API)
const abrirFicha = ref(false)
const personajeSeleccionado = ref(null)

const verFicha = (IdPersonaje) =>
{
    //Ahora busca a la uma dentro de 'integrantesEquipo' que tiene los datos de internet
    const umaEncontrada = integrantesEquipo.value.find(uma => uma.id === IdPersonaje)
    
    if (umaEncontrada)
    {
        personajeSeleccionado.value = umaEncontrada 
        abrirFicha.value = true              
    }
}

const cerrarFicha = () =>
{
    abrirFicha.value = false
    personajeSeleccionado.value = null
}

//3- VENTANA DE SUSTITUCIÓN
const modalSustituirAbierto = ref(false)

const abrirSustitucion = () =>
{
    modalSustituirAbierto.value = true
}

const cerrarSustitucion = () =>
{
    modalSustituirAbierto.value = false
}

const iniciarSustitucion = () =>
{
    console.log("Abriendo segundo modal de sustitución...")
}

const irACrear = () =>
{
    router.push('/create')
}
</script>

<template>
    <!-- CONTENEDOR MAESTRO -->
    <main class="flex flexColumn">

        <!-- ESTADO 1: MIENTRAS DESCARGA LOS DATOS DE INTERNET -->
        <div v-if="cargando" class="flex flexColumn loading">
            <h2>Conectando con Umapyoi.net...</h2>
            <p>Obteniendo fichas técnicas e imágenes...</p>
        </div>

        <!-- CUANDO LA API YA RESPONDIÓ -->
        <div v-else class="flex flexColumn masterCont">
            
            <!-- ESTADO 2: EL USUARIO TIENE UN EQUIPO EN LOCALSTORAGE -->
            <div v-if="hayDatos" class="full flex flexColumn">
                <!-- ENCABEZADO DINÁMICO -->
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

                <!-- CONTENEDOR DE TARJETAS DINÁMICAS -->
                <div class="characterCont flex">
                    
                    <div 
                        v-for="uma in integrantesEquipo" 
                        :key="uma.id" 
                        class="characterCont-card flex flexColumn transition"
                    >
                        <!-- La imagen ahora apunta a la URL web que dio el endpoint de imágenes -->
                        <img :src="uma.racewear" :alt="uma.nombre">
                        <!-- Se agrega los nombres dinámicos debajo de la imagen -->
                        <h3>{{ uma.nombre }}</h3>
                        <!-- Al boton se le manda el ID real de la API a la función verFicha -->
                        <Boton
                            texto="Ver ficha"
                            @click-accion="verFicha(uma.id)"
                            :style="{'--btnWidth' : '100%', '--btnPadding' : '1rem 1.5rem', '--btnFontSize' : '1.5rem'}"
                        />
                    </div>

                    <!-- Modales de mostrar ficha y reemplazar -->
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
            </div>

            <!-- ESTADO 3: LA APLICACIÓN ESTÁ VACÍA (PROTECCIÓN DE DATOS) -->
            <div v-else class="empty flex flexColumn">
                <h2>No tienes ningun equipo registrado</h2>
                <p>Para gestionar a tus UmaMusume, primero debes asignarle un nombre a tu equipo y seleccionar a sus 4 integrantes</p>
                <Boton 
                    texto="Crear mi escudería ahora" 
                    color="verde"
                    @click-accion="irACrear" 
                    :style="{'--btnPadding' : '1.2rem 2rem', '--btnFontSize' : '1.6rem'} "
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

/* CARTELES DE ESPERA DE DESCARGA/CARGANDO Y SI NO HAY DATOS */
.loading
{
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1rem;
}

.loading h2 {font-size: 2rem;}

.empty
{
    align-items: center;
    justify-content: center;
    padding: 4rem;
    text-align: center;
    gap: 1.5rem;
}

.empty h2 {font-size: 2.5rem;}

.empty p
{
    font-size: 1.4rem;
    max-width: 600px;
}

/* LA GESTION Y FICHAS */
.masterCont {width: 100%;}

.full
{
    width: 100%;
    gap: 2rem;
}

.head {gap: 1rem;}

.head h2 {font-size: 4rem;}

.characterCont
{
    width: 100%;
    gap: 2rem;
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

.characterCont-card h3
{
    font-size: clamp(1.5rem, 1.5vw ,1.8rem);
    margin: 1rem 0;
    font-weight: bold;
}

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