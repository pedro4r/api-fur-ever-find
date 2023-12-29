import { Company, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByZipcodeUseCaseRequest {
    userZipcode: string
    description?: string
    activity_lvl?: number
    wide_environment?: boolean
    smallness_lvl?: number
}

interface SearchPetByZipcodeUseCaseResponse {
    pets: Pet[] | null
}

export class SearchPetByZipcodeUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private petRepository: PetsRepository) { }

    async execute({
        userZipcode,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
    }: SearchPetByZipcodeUseCaseRequest): Promise<SearchPetByZipcodeUseCaseResponse> {
        const pets = await this.petRepository.fetchPets({
            userZipcode,
            description,
            activity_lvl,
            wide_environment,
            smallness_lvl,
        })
        return { pets }
    }
}
