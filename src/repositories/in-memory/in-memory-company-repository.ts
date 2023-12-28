import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../companies-repository'
import { mockGetDistanceBetweenZipCodes } from '@/utils/mocks/mock-get-distance-between-zipcodes'

export class InMemoryCompaniesRepository implements CompaniesRepository {
    public items: Company[] = []

    async findManyNearbyCompany(userZipcode: string) {
        const nearbyCompanies: Company[] = []

        for (const item of this.items) {
            const distance = await mockGetDistanceBetweenZipCodes({
                userZipcode,
                companyZipcode: item.zipcode,
            })

            if (distance < 10) {
                nearbyCompanies.push(item)
            }
        }

        console.log(nearbyCompanies)

        return nearbyCompanies
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
