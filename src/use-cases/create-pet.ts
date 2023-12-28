import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
    name: string
    description?: string
    activity_lvl?: number
    wide_environment?: boolean
    smallness_lvl?: number
    company_id: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private petRepository: PetsRepository) { }

    async execute({
        name,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
        company_id,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const pet = await this.petRepository.create({
            name,
            description,
            activity_lvl,
            wide_environment,
            smallness_lvl,
            company_id,
        })

        return { pet }
    }
}
