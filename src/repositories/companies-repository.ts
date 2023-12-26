import { Prisma, Company } from '@prisma/client'

export interface CompaniesRepository {
    create(data: Prisma.CompanyCreateInput): Promise<Company>
}
