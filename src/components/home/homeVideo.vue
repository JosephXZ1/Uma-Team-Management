<script setup>
import Boton from '@/components/button.vue'
</script>

<template>
    <div class="videoContainer">

        <video autoplay muted loop playsinline class="backgroundVideo fullSize">
            <source src="../../assets/Multimedia/Videos/Index_BG.mp4" type="video/mp4" />
            Tu navegador no soporta videos en HTML5.<!--Mensaje que aparece si el navegador no soporta el video-->
        </video>
        <div class="content flex flexColumn">
            <div>
                <h1>Tracen Academy: Team Manager</h1>
                <p>Crea y gestiona un equipo</p>                
            </div>
            <Boton
                texto="Crear Equipo"
                redireccion="/create"
                color="home"
                class="marginTop"
            />
        </div>
        
    </div>
</template>

<style scoped>
/* - - - - - - - - - - CONTENEDOR DE VIDEO - - - - - - - - - - */
.videoContainer
{
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.videoContainer::before
{
    content: '';
    position: absolute;
    inset: 0;
    background-color: #00000080;
    z-index: 1;
}

.backgroundVideo
{
    position: absolute;
    object-fit: cover;
    z-index: 0;
}

.content
{
    position: relative;
    z-index: 1;
    color: #fff;
    padding: 7rem 5rem;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
}

.content h1
{
    font-size: clamp(1.2rem, 4.6vw, 7rem);
    font-family: "Aleo", serif;
    font-weight: 700;
    color: #eeeef0;
    text-shadow: 5px 5px 5px #000;
}

.content p
{
    margin-top: 0.5rem;
    font-size: 2.5rem;
    font-weight: 570;
    text-shadow: 4px 4px 5px #000;
}

.marginTop {margin-top: auto;}
</style>