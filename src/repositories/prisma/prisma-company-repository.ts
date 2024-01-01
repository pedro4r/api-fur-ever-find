import { Company, Prisma } from '@prisma/client'
import { CompaniesRepository } from '../company-repository'
import { getCoordinates } from '@/utils/get-coordinates'
import { prisma } from '@/lib/prisma'

export class PrismaCompanyRepository implements CompaniesRepository {
    async create(data: Prisma.CompanyCreateInput) {
        const gym = await prisma.company.create({
            data,
        })

        return gym
    }

    async findByEmail(email: string) {
        const company = await prisma.company.findUnique({
            where: { email },
        })

        return company
    }

    async findManyNearbyCompany(userZipcode: string) {
        const { lat, lng } = await getCoordinates(userZipcode)

        const nearbyCompanies = await prisma.$queryRaw<Company[]>`
        SELECT * from companies
        WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return nearbyCompanies
    }
}
