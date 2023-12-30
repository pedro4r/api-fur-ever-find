import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../companies-repository'
import { mockGetDistanceBetweenZipCodes } from '@/utils/mocks/mock-get-distance-between-zipcodes'

export class InMemoryCompaniesRepository implements CompaniesRepository {
    public items: Company[] = []

    async findManyNearbyCompany(userZipcode: string) {
        const gyms = await prisma.$queryRaw<Company[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        return gyms
    }

    async findByEmail(email: string) {
        const company = this.items.find((company) => company.email === email)
        if (!company) {
            return null
        }
        return company
    }

    async create(data: Prisma.CompanyCreateInput) {
        const company = {
            id: data.id ?? randomUUID(),
            admin_name: data.admin_name,
            name: data.name,
            email: data.email,
            address: data.address,
            zipcode: data.zipcode,
            phone: data.phone,
            password_hash: data.password_hash,
            created_at: new Date(),
        }
        this.items.push(company)

        return company
    }
}
