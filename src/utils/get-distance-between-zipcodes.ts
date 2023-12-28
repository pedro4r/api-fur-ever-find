import axios from 'axios'

async function getCoordinates(
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

export async function getDistanceBetweenZipcodes(
    userZipcode: string,
    companyZipcode: string
): Promise<number> {
    const apiKey = process.env.GOOGLE_KEY

    const userCoords = await getCoordinates(userZipcode)
    const companyCoords = await getCoordinates(companyZipcode)

    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userCoords.lat},${userCoords.lng}&destinations=${companyCoords.lat},${companyCoords.lng}&key=${apiKey}`
    )

    if (
        response.data.rows.length > 0 &&
        response.data.rows[0].elements.length > 0
    ) {
        const distanceText = response.data.rows[0].elements[0].distance.text
        const distanceValue = response.data.rows[0].elements[0].distance.value

        console.log(
            `A distância entre ${userZipcode} e ${companyZipcode} é de ${distanceText}.`
        )
        return distanceValue / 1609.34 // converting meters to miles
    } else {
        throw new Error('Não foi possível calcular a distância.')
    }
}
