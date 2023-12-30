import axios from 'axios'

export async function getCoordinates(
    zipcode: string
): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.GOOGLE_KEY

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${apiKey}`
        )

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location
            return { lat, lng }
        } else {
            throw new Error('Código postal inválido ou não encontrado.')
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição à API:', error)
        throw new Error('Erro ao fazer a requisição à API de geocodificação')
    }
}
