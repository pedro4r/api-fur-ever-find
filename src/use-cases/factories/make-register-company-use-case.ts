import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { RegisterCompanyUseCase } from '../register-company'

export function makeRegisterCompanyUseCase() {
    const companyRepository = new PrismaCompanyRepository()
    const useCase = new RegisterCompanyUseCase(companyRepository)

    return useCase
}
