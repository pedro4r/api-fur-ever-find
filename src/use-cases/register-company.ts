import { CompaniesRepository } from '@/repositories/company-repository'
import { Company } from '@prisma/client'
import { hash } from 'bcryptjs'
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error'

interface CreateCompanyUseCaseRequest {
    admin_name: string
    name: string
    email: string
    address: string
    zipcode: string
    phone: string
    latitude?: number
    longitude?: number
    password: string
}

interface CreateCompanyUseCaseResponse {
    company: Company
}

export class RegisterCompanyUseCase {
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
        latitude,
        longitude,
    }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
        const companyWithSameEmail =
            await this.companyRepository.findByEmail(email)

        if (companyWithSameEmail) {
            throw new CompanyAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)
        const company = await this.companyRepository.create({
            admin_name,
            name,
            email,
            address,
            zipcode,
            phone,
            password_hash,
            latitude,
            longitude,
        })

        return { company }
    }
}
