import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsByFiltersUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
    const petRepository = new PrismaPetRepository()
    const useCase = new FetchPetsByFiltersUseCase(petRepository)

    return useCase
}
