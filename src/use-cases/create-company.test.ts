import { expect, describe, it, beforeEach } from 'vitest'
import { CreateCompanyUseCase } from './create-company'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'

let companiesRepository: InMemoryCompaniesRepository
let sut: CreateCompanyUseCase

describe('Create Company Use Case', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository()
        sut = new CreateCompanyUseCase(companiesRepository)
    })
    it('should to able to create a company', async () => {
        const { company } = await sut.execute({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: '123456',
        })

        expect(company.id).toEqual(expect.any(String))
    })
})
