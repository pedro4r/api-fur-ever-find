import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { AuthenticateCompanyUseCase } from './authenticate-company'

let companiesRepository: InMemoryCompaniesRepository
let sut: AuthenticateCompanyUseCase

describe('Authenticate Company Use Case', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository()
        sut = new AuthenticateCompanyUseCase(companiesRepository)
    })
    it('should to able to authenticate company', async () => {
        await companiesRepository.create({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: '123456',
        })

        const { company } = await sut.execute({
            email: 'ragdolls@example.com',
            password: '123456',
        })

        expect(company.id).toEqual(expect.any(String))
    })
})
