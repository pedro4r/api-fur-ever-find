import { Prisma } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface companyInfoRequest {
    admin_name: string
    name: string
    email: string
    address: string
    zipcode: string
    phone: string
    password: string
}

interface createAndAuthenticateParams {
    app: FastifyInstance
    companyInfo: companyInfoRequest
}

export async function createAndAuthenticateCompany({
    app,
    companyInfo,
}: createAndAuthenticateParams) {
    const companyResponse = await request(app.server)
        .post('/company')
        .send(companyInfo)

    const authResponse = await request(app.server).post('/sessions').send({
        email: companyInfo.email,
        password: companyInfo.password,
    })

    const { token } = authResponse.body

    return {
        token,
        companyResponse,
    }
}
