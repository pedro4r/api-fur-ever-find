import { RegisterCompanyUseCase } from '../register-company'

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new RegisterCompanyUseCase(gymsRepository)

    return useCase
}
