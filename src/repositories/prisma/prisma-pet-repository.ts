import { Pet, Prisma } from '@prisma/client'
import { FetchPetsParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { PrismaCompanyRepository } from './prisma-company-repository'

export class PrismaPetRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: { id },
        })

        return pet
    }

    async fetchPets({
        userZipcode,
        description,
        activity_lvl,
        wide_environment,
        smallness_lvl,
        page,
    }: FetchPetsParams) {
        const prismaCompanyRepository = new PrismaCompanyRepository()

        const nearbyCompanies =
            await prismaCompanyRepository.findManyNearbyCompany(userZipcode)

        try {
            const nearbyPets = await nearbyCompanies.reduce(
                async (accPromise, company) => {
                    let acc = await accPromise
                    const pets = await prisma.pet.findMany({
                        where: {
                            company_id: company.id,
                        },
                    })

                    acc = [...acc, ...pets] as Pet[]
                    return acc
                },
                Promise.resolve([] as Pet[])
            )

            const result = await Promise.all(nearbyPets)

            const startIndex = page ? (page - 1) * 20 : 0
            const endIndex = page ? page * 20 : 20

            const petsWithMatchingWithOtherParams = result
                .filter(
                    (pet) =>
                        description === undefined ||
                        pet.description
                            ?.toLowerCase()
                            .includes(description.toLowerCase())
                )
                .filter(
                    (pet) =>
                        activity_lvl === undefined ||
                        pet.activity_lvl?.toNumber() === activity_lvl
                )
                .filter(
                    (pet) =>
                        wide_environment === undefined ||
                        pet.wide_environment === wide_environment
                )
                .filter(
                    (pet) =>
                        smallness_lvl === undefined ||
                        pet.smallness_lvl?.toNumber() === smallness_lvl
                )
                .slice(startIndex, endIndex)

            return petsWithMatchingWithOtherParams
        } catch (error) {
            console.error('Erro ao buscar pets para empresas:', error)
            throw error
        }
    }
}
