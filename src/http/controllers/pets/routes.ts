import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { verifyJWT } from '../middlewares/verify-jwt'
import { profile } from './profile'

export async function petRoutes(app: FastifyInstance) {
    app.get('/nearby', fetch)
    app.get('/petbio', profile)

    /** Authenticated */
    app.post('/create/:companyId/pet', { onRequest: [verifyJWT] }, create)
}
