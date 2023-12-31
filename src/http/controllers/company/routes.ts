import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function companyRoutes(app: FastifyInstance) {
    app.post('/company', register)
}
