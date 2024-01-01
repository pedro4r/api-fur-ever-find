import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
    const fetchBodySchema = z.object({
        userZipcode: z.string(),
        description: z.string().optional(),
        activity_lvl: z.number().optional(),
        wide_environment: z.boolean().optional(),
        smallness_lvl: z.number().optional(),
    })

    const {
        userZipcode,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
    } = fetchBodySchema.parse(request.query)

    const fetchPetUseCase = makeFetchPetsUseCase()

    const pets = await fetchPetUseCase.execute({
        userZipcode,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
    })

    return reply.status(200).send(pets)
}
