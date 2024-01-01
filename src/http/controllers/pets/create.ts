import { CompanyAlreadyExistsError } from '@/use-cases/errors/company-already-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createPetParamsSchema = z.object({
        companyId: z.string().uuid(),
    })

    const createBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        activity_lvl: z.number(),
        wide_environment: z.boolean(),
        smallness_lvl: z.number(),
    })

    const { companyId } = createPetParamsSchema.parse(request.params)
    const { name, description, activity_lvl, wide_environment, smallness_lvl } =
        createBodySchema.parse(request.body)

    try {
        const createPetUseCase = makeCreatePetUseCase()

        const company = await createPetUseCase.execute({
            name,
            description,
            activity_lvl,
            wide_environment,
            smallness_lvl,
            company_id: companyId,
        })

        return reply.status(201).send(company)
    } catch (err) {
        if (err instanceof CompanyAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }
}
