import { CompanyAlreadyExistsError } from '@/use-cases/errors/company-already-exists-error'
import { makeRegisterCompanyUseCase } from '@/use-cases/factories/make-register-company-use-case'
import { getCoordinates } from '@/utils/get-coordinates'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        admin_name: z.string(),
        name: z.string(),
        email: z.string(),
        address: z.string(),
        zipcode: z.string(),
        phone: z.string(),
        password: z.string().min(6),
    })

    const { admin_name, name, email, address, zipcode, phone, password } =
        createBodySchema.parse(request.body)

    try {
        const createCompanyUseCase = makeRegisterCompanyUseCase()

        const { lat, lng } = await getCoordinates(zipcode)

        const company = await createCompanyUseCase.execute({
            admin_name,
            name,
            email,
            address,
            zipcode,
            phone,
            latitude: lat,
            longitude: lng,
            password,
        })

        return reply.status(201).send(company)
    } catch (err) {
        if (err instanceof CompanyAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }
}
