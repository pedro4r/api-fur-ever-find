import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function companyRoutes(app: FastifyInstance) {
    app.post('/company', register)
    app.post('/sessions', authenticate)
}
