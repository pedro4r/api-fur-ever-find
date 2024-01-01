import { CreatePetUseCase } from '../create-pet'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeCreatePetUseCase() {
    const petRepository = new PrismaPetRepository()
    const useCase = new CreatePetUseCase(petRepository)

    return useCase
}
