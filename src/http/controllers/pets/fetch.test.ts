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
        const { token: company01Token, companyResponse: company01Response } =
            await createAndAuthenticateCompany({
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

        const { token: company02Token, companyResponse: company02Response } =
            await createAndAuthenticateCompany({
                app,
                companyInfo: {
                    admin_name: 'Tayane Requiao',
                    name: 'British Shorthair Cattery',
                    email: 'british-cattery@example.com',
                    address: '1440 NW N River Dr',
                    zipcode: '33125',
                    phone: '234 097 2345',
                    password: '123456',
                },
            })

        for (let i = 0; i < 25; i++) {
            await request(app.server)
                .post(`/create/${company01Response.body.company.id}/pet`)
                .set('Authorization', `Bearer ${company01Token}`)
                .send({
                    name: 'Bjorn',
                    description: 'Lazy cat and affectionate',
                    activity_lvl: 3,
                    wide_environment: true,
                    smallness_lvl: 4,
                })
        }

        await request(app.server)
            .post(`/create/${company01Response.body.company.id}/pet`)
            .set('Authorization', `Bearer ${company01Token}`)
            .send({
                name: 'Pixie',
                description: 'A beautiful lady female',
                activity_lvl: 10,
                wide_environment: true,
                smallness_lvl: 2,
            })

        await request(app.server)
            .post(`/create/${company02Response.body.company.id}/pet`)
            .set('Authorization', `Bearer ${company02Token}`)
            .send({
                name: 'Laik',
                description: 'Very friendly cat',
                activity_lvl: 5,
                wide_environment: true,
                smallness_lvl: 3,
            })

        const response = await request(app.server)
            .get('/nearby')
            .query({
                userZipcode: '32835',
                description: 'lazy',
                page: 2,
            })
            .send()

        expect(response.body.pets).toHaveLength(5)
        expect(response.body.pets[0].name).toEqual('Bjorn')
    })
})
