import { Prisma, Pet } from '@prisma/client'

export interface FetchPetsParams {
    userZipcode: string
    description?: string
    activity_lvl?: number
    wide_environment?: boolean
    smallness_lvl?: number
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    fetchPets(params: FetchPetsParams): Promise<Pet[] | null>
}
