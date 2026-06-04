<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
    console.log("🚀 Iniciando prueba de conexión con Umapyoi.net...")
    try {
        // Intentamos llamar al Endpoint 1: Lista de información básica
        const response = await fetch('https://umapyoi.net/api/v1/character/info')
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`)
        }
        
        const datos = await response.json()
        console.log("✅ ¡CONEXIÓN EXITOSA! La API respondió con los personajes:", datos)
        
    } catch (error) {
        console.error("❌ Fallo en la conexión con la API Real:", error)
        console.log("👉 Si el error menciona 'CORS', necesitaremos un pequeño ajuste en el servicio.")
    }
})
</script>