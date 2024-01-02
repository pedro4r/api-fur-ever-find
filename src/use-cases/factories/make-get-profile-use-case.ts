import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetProfileUseCase } from '../get-pet-profile'

export function makeGetProfileUseCase() {
    const petRepository = new PrismaPetRepository()
    const useCase = new GetPetProfileUseCase(petRepository)

    return useCase
}
