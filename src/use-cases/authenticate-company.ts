import { CompaniesRepository } from '@/repositories/company-repository'
import { Company } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateCompanyUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateCompanyUseCaseResponse {
    company: Company
}

export class AuthenticateCompanyUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private companyRepository: CompaniesRepository) { }

    async execute({
        email,
        password,
    }: AuthenticateCompanyUseCaseRequest): Promise<AuthenticateCompanyUseCaseResponse> {
        const company = await this.companyRepository.findByEmail(email)

        if (!company) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(
            password,
            company.password_hash
        )

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { company }
    }
}
