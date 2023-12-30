import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetProfileUseCaseRequest {
    id: string
}

interface GetPetProfileUseCaseResponse {
    pet: Pet
}

export class GetPetProfileUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private petRepository: PetsRepository) { }

    async execute({
        id,
    }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
        const pet = await this.petRepository.findById(id)

        if (!pet) {
            throw new ResourceNotFoundError()
        }

        return { pet }
    }
}
