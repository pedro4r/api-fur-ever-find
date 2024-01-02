import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateCompany } from '@/utils/test/createAndAuthenticateCompany'

describe('Fetch (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to search for pets', async () => {
        const { token, companyResponse } = await createAndAuthenticateCompany({
            app,
            companyInfo: {
                admin_name: 'Pedro Requiao',
                name: 'Ragdolls Cattery',
                email: 'ragdolls@example.com',
                address: '5404 Millenia lakes BLVD',
                zipcode: '32839',
                phone: '0011001100',
                password: '123456',
            },
        })

        const petResponse = await request(app.server)
            .post(`/create/${companyResponse.body.company.id}/pet`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Bjorn',
                description: 'Lazy cat and affectionate',
                activity_lvl: 3,
                wide_environment: true,
                smallness_lvl: 4,
            })

        const response = await request(app.server)
            .get('/petbio')
            .query({
                id: petResponse.body.pet.id,
            })
            .send()

        expect(response.body.pet.name).toEqual('Bjorn')
    })
})
