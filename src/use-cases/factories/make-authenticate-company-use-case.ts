import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { AuthenticateCompanyUseCase } from '../authenticate-company'

export function makeAuthenticateCompanyUseCase() {
    const companyRepository = new PrismaCompanyRepository()
    const useCase = new AuthenticateCompanyUseCase(companyRepository)

    return useCase
}
