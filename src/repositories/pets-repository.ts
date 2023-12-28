import { Prisma, Pet, Company } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    fetchPets(zipcode: string): Promise<Pet[]>
}
