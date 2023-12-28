import axios from 'axios'
import { app } from './app'
import { env } from './env'

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(async () => {
    const apiKey = process.env.GOOGLE_KEY
    const zipcode = '32839'
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${apiKey}`
    )
    console.log(response.data)

    console.log('HTTP Server Running')
})
