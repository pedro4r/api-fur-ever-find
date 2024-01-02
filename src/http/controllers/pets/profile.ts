import { makeGetProfileUseCase } from '@/use-cases/factories/make-get-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const fetchBodySchema = z.object({
        id: z.string(),
    })

    const { id } = fetchBodySchema.parse(request.query)

    const getPetProfileUseCase = makeGetProfileUseCase()

    const pet = await getPetProfileUseCase.execute({
        id,
    })

    return reply.status(200).send(pet)
}
