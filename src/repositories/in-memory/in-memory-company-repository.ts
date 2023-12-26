import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
    public items: Company[] = []

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
