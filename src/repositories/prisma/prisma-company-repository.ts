import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../company-repository'
import { getCoordinates } from '@/utils/get-coordinates'
import { prisma } from '@/lib/prisma'

export class PrismaCompanyRepository implements CompaniesRepository {
    public items: Company[] = []

    async create(data: Prisma.CompanyCreateInput) {
        const { lat, lng } = await getCoordinates(data.zipcode)
        const company = {
            id: data.id ?? randomUUID(),
            admin_name: data.admin_name,
            name: data.name,
            email: data.email,
            address: data.address,
            zipcode: data.zipcode,
            phone: data.phone,
            latitude: new Prisma.Decimal(lat.toString()),
            longitude: new Prisma.Decimal(lng.toString()),
            password_hash: data.password_hash,
            created_at: new Date(),
        }
        this.items.push(company)

        return company
    }

    async findByEmail(email: string) {
        const company = this.items.find((company) => company.email === email)
        if (!company) {
            return null
        }
        return company
    }

    async findManyNearbyCompany(userZipcode: string) {
        const { lat, lng } = await getCoordinates(userZipcode)

        const gyms = await prisma.$queryRaw<Company[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }
}
