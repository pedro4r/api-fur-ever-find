import { Prisma, Company } from '@prisma/client'

export interface CompaniesRepository {
    create(data: Prisma.CompanyCreateInput): Promise<Company>
    findByEmail(email: string): Promise<Company | null>
    findManyNearbyCompany(userZipcode: string): Promise<Company[]>
}
