<script setup>
import Boton from '@/components/button.vue'

//Se recibe la prop para mostrarlo (puedes ponerla en true directo en tu sandbox para probar)
defineProps(
{
    mostrar: { type: Boolean, required: true }
})

defineEmits(['cerrar-modal', 'aceptar'])
</script>

<template>
    <div v-if="mostrar" class="modal-overlay-sustituir flex" @click="$emit('cerrar-modal')">
        
        <div class="contSustituir flex flexColumn" @click.stop>
            
            <div class="contSust-head">
                <h2>Sustituir Integrante</h2>
            </div>

            <div class="contSust-body flex flexColumn">
                
                <div class="contSust-input flex flexColumn">
                    <label>¿A quién deseas integrar al equipo?</label>
                    <input type="text" placeholder="Nombre de la Uma Musume..." class="contSust-inputTxt transition">
                </div>

                <div class="contSust-buttons flex">
                    <Boton 
                        texto="Aceptar" 
                        @click-accion="$emit('aceptar')" 
                        color="verde"
                        class="btn-mitad"
                        :style="{'--btnPadding': '0.8rem', '--btnFontSize': '1.3rem'}"
                    />
                    <Boton 
                        texto="Cancelar" 
                        @click-accion="$emit('cerrar-modal')" 
                        color="rojo" 
                        class="btn-mitad"
                        :style="{'--btnPadding': '0.8rem', '--btnFontSize': '1.3rem'}"
                    />
                </div>

            </div>
        </div>
        
    </div>
</template>

<style scoped>
.modal-overlay-sustituir
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 150;
    justify-content: center;
    align-items: center;
}

.contSustituir
{
    width: 90%;
    max-width: 500px;
    background-color: #ffffff;
    border: 2px solid #c2bfc3;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* HEAD */
.contSust-head
{
    background: linear-gradient(180deg, #9be800 10%, #4bcd00 100%);
    width: 100%;
    padding: 1.2rem;
    text-align: center;
}

.contSust-head h2
{
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
}

/* CONTENIDO */
.contSust-body
{
    padding: 2.5rem 2rem;
    gap: 2rem;
    align-items: center;
}

/* EL INPUT Y SU LABEL */
.contSust-input
{
    width: 100%;
    align-items: center;
    gap: 0.8rem;
}

.contSust-input label
{
    color: #8b4513;
    font-size: 1.3rem;
    font-weight: 610;
}

.contSust-inputTxt
{
    width: 100%;
    background-color: #fffaf5;
    border: 3px solid #e3d4c4;
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
    font-weight: 550;
    text-align: center;
    color: #784015;
    outline: none;
}

.contSust-inputTxt:focus {background-color: #fff5eb;}

.contSust-inputTxt::placeholder {color: #bfaea0;}

/* LOS BOTONES */
.contSust-buttons
{
    width: 100%;
    gap: 1.5rem;
    justify-content: space-between;
}

.btn-mitad {flex: 1;}
</style>