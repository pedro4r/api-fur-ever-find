import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByFiltersUseCaseRequest {
    userZipcode: string
    description?: string
    activity_lvl?: number
    wide_environment?: boolean
    smallness_lvl?: number
    page?: number
}

interface FetchPetsByFiltersUseCaseResponse {
    pets: Pet[] | null
}

export class FetchPetsByFiltersUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private petRepository: PetsRepository) { }

    async execute({
        userZipcode,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
        page,
    }: FetchPetsByFiltersUseCaseRequest): Promise<FetchPetsByFiltersUseCaseResponse> {
        const pets = await this.petRepository.fetchPets({
            userZipcode,
            description,
            activity_lvl,
            wide_environment,
            smallness_lvl,
            page,
        })
        return { pets }
    }
}
