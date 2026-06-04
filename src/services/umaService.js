const BASE_URL = 'https://umapyoi.net/api/v1'
const STORAGE_KEY_EQUIPO = 'team_Data'

export const umaService =
{
    
    // 1. CONSULTAS A LA API REAL (Umapyoi.net)
    
    // Traer todos los personajes con sus IDs y nombres para tus datalists/buscadores
    async getCharacterInfoList()
    {
        try
        {
            const response = await fetch(`${BASE_URL}/character/info`)
            if (!response.ok) throw new Error('Error al obtener lista de la API')
            return await response.json()
        }
        catch (error)
        {
            console.error('API Error (InfoList):', error)
            throw error
        }
    },

    //Traer la ficha técnica en texto de una Uma específica por su ID
    async getCharacterById(id)
    {
        try
        {
            const response = await fetch(`${BASE_URL}/character/${id}`)
            if (!response.ok) throw new Error(`No se encontró el personaje con ID ${id}`)
            return await response.json()
        }
        catch (error)
        {
            console.error(`API Error (Character ID ${id}):`, error)
            throw error
        }
    },

    //Traer las URLs de las imágenes (Uniforme/Racewear) de una Uma por su ID
    async getCharacterImagesById(id)
    {
        try
        {
            const response = await fetch(`${BASE_URL}/character/images/${id}`)
            if (!response.ok) throw new Error(`No hay imágenes para el ID ${id}`)
            return await response.json()
        }
        catch (error)
        {
            console.error(`API Error (Images ID ${id}):`, error)
            throw error
        }
    },

    //2- PERSISTENCIA LOCAL (LocalStorage para tu Escudería)
    
    //Guardar el string JSON con el nombre del equipo y el arreglo de 4 IDs
    guardarEquipoEnLocal(nombreDelEquipo, listaIdsIntegrantes)
    {
        const estructuraEquipo =
        {
            nombre: nombreDelEquipo,
            integrantesIds: listaIdsIntegrantes
        }
        localStorage.setItem(STORAGE_KEY_EQUIPO, JSON.stringify(estructuraEquipo))
    },

    //Recuperar el objeto del equipo cuando se use, si no existe, devuelve null (Equipo Vacío)
    obtenerEquipoDeLocal() 
    {
        const datosRaw = localStorage.getItem(STORAGE_KEY_EQUIPO)
        if (!datosRaw) return null
        return JSON.parse(datosRaw)
    }
}