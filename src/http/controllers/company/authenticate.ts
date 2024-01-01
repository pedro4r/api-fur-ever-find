import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateCompanyUseCase } from '@/use-cases/factories/make-authenticate-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateCompanyUseCase = makeAuthenticateCompanyUseCase()

        const { company } = await authenticateCompanyUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign({
            sign: {
                sub: company.id,
            },
        })

        const refreshToken = await reply.jwtSign({
            sign: {
                sub: company.id,
                expiresIn: '7d',
            },
        })

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token,
            })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
        throw err
    }
}
