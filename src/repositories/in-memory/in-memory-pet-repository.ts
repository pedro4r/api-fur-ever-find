/* eslint-disable prettier/prettier */
import { Company, Pet, Prisma } from '@prisma/client'
import { FetchPetsParams, PetsRepository } from '../pets-repository'
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

    async fetchPets({ userZipcode, description, activity_lvl, wide_environment, smallness_lvl }: FetchPetsParams) {

        const nearbyCompanies = await this.companiesRepository.findManyNearbyCompany(userZipcode)

        const petsWithMatchingCompanyIds = this.items.filter((pet) =>
            nearbyCompanies.some((company) => pet.company_id === company.id)
        )

        // const oi2 = smallness_lvl ? new Prisma.Decimal(smallness_lvl.toString()) : null

        const petsWithMatchingWithOtherParams = petsWithMatchingCompanyIds
            .filter(pet => description === undefined || pet.description?.includes(description))
            .filter(pet => activity_lvl === undefined || pet.activity_lvl?.toNumber() === activity_lvl)
            .filter(pet => wide_environment === undefined || pet.wide_environment === wide_environment)
            .filter(pet => smallness_lvl === undefined || pet.smallness_lvl?.toNumber() === smallness_lvl)


        return petsWithMatchingWithOtherParams
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
