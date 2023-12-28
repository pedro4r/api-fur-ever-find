/* eslint-disable prettier/prettier */
import { Company, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../companies-repository'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []
    public companies: Company[] = []
    private companiesRepository: CompaniesRepository

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(companiesRepository: CompaniesRepository) {
        this.companiesRepository = companiesRepository
    }

    async fetchPets(userZipcode: string) {
        const nearbyCompanies = await this.companiesRepository.findManyNearbyCompany(userZipcode)

        const petsWithMatchingCompanyIds = this.items.filter((pet) =>
            nearbyCompanies.some((company) => pet.company_id === company.id)
        )

        return petsWithMatchingCompanyIds

    }

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            activity_lvl: data.activity_lvl
                ? new Prisma.Decimal(data.activity_lvl.toString())
                : null,
            wide_environment: data.wide_environment ?? null,
            smallness_lvl: data.smallness_lvl
                ? new Prisma.Decimal(data.smallness_lvl.toString())
                : null,
            company_id: data.company_id,

            created_at: new Date(),
        }
        this.items.push(pet)

        return pet
    }
}
