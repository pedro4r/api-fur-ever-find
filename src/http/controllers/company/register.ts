import { CompanyAlreadyExistsError } from '@/use-cases/errors/company-already-exists-error'
import { makeRegisterCompanyUseCase } from '@/use-cases/factories/make-register-company-use-case'
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
        const createGymUseCase = makeRegisterCompanyUseCase()

        await createGymUseCase.execute({
            admin_name,
            name,
            email,
            address,
            zipcode,
            phone,
            password,
        })
    } catch (err) {
        if (err instanceof CompanyAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}
