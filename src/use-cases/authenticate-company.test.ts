import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { AuthenticateCompanyUseCase } from './authenticate-company'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

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
            password_hash: await hash('123456', 6),
        })

        const { company } = await sut.execute({
            email: 'ragdolls@example.com',
            password: '123456',
        })

        expect(company.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            sut.execute({
                email: 'this-email-not-exists@example.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await companiesRepository.create({
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: await hash('123456', 6),
        })

        await expect(() =>
            sut.execute({
                email: 'ragdolls@example.com',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
