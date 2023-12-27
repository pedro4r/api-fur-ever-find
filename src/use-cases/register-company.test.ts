import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterCompanyUseCase } from './register-company'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { compare } from 'bcryptjs'
import { CompanyAlreadyExistsError } from './errors/company-already-exists-error'

let companiesRepository: InMemoryCompaniesRepository
let sut: RegisterCompanyUseCase

describe('Register Company Use Case', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository()
        sut = new RegisterCompanyUseCase(companiesRepository)
    })
    it('should to able to register', async () => {
        const { company } = await sut.execute({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password: '123456',
        })

        expect(company.id).toEqual(expect.any(String))
    })

    it('should hash company password upon registration', async () => {
        const { company } = await sut.execute({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            company.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'ragdolls@example.com'

        await sut.execute({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email,
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password: '123456',
        })

        await expect(() =>
            sut.execute({
                admin_name: 'Pedro Requiao',
                name: 'Ragdolls Cattery',
                email,
                address: '5404 Millenia lakes BLVD',
                zipcode: '32839',
                phone: '0011001100',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(CompanyAlreadyExistsError)
    })
})
