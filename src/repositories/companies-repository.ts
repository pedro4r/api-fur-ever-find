import { Prisma, Company } from '@prisma/client'

export interface UsersRepository {
    create(data: Prisma.CompanyCreateInput): Promise<Company>
}
