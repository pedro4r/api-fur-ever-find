import { Company, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByZipcodeUseCaseRequest {
    userZipcode: string
}

interface SearchPetByZipcodeUseCaseResponse {
    pets: Pet[]
}

export class SearchPetByZipcodeUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private petRepository: PetsRepository) { }

    async execute({
        userZipcode,
    }: SearchPetByZipcodeUseCaseRequest): Promise<SearchPetByZipcodeUseCaseResponse> {
        const pets = await this.petRepository.fetchPets(userZipcode)
        return { pets }
    }
}
