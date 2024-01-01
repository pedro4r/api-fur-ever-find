import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to authenticate', async () => {
        await request(app.server).post('/company').send({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password: '123456',
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'ragdolls@example.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
    })
})
