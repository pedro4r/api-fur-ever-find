import { CompaniesRepository } from '@/repositories/companies-repository'
import { Company } from '@prisma/client'

interface CreateCompanyUseCaseRequest {
    admin_name: string
    name: string
    email: string
    address: string
    zipcode: string
    phone: string
    password: string
}

interface CreateCompanyUseCaseResponse {
    company: Company
}

export class CreateCompanyUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private companyRepository: CompaniesRepository) { }

    async execute({
        admin_name,
        name,
        email,
        address,
        zipcode,
        phone,
        password,
    }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
        const company = await this.companyRepository.create({
            admin_name,
            name,
            email,
            address,
            zipcode,
            phone,
            password_hash: password,
        })

        return { company }
    }
}
