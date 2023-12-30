import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchPetsByFiltersUseCase } from './fetch-pets'

let companiesRepository: InMemoryCompaniesRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByFiltersUseCase

describe('Search Pet Bt Zipcode Use Case', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository()
        petsRepository = new InMemoryPetsRepository(companiesRepository)
        sut = new FetchPetsByFiltersUseCase(petsRepository)
    })
    it('should be able to find pets by zipcode only', async () => {
        await companiesRepository.create({
            id: 'company-01',
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: await hash('123456', 6),
        })

        await companiesRepository.create({
            id: 'company-02',
            admin_name: 'Tayane Requiao',
            name: 'British Shorthair Cattery',
            email: 'british-cattery@example.com',
            address: '1440 NW N River Dr',
            zipcode: '33125',
            phone: '234 097 2345',
            password_hash: await hash('123456', 6),
        })

        await petsRepository.create({
            name: 'Bjorn',
            description: 'Lazy cat and fat',
            activity_lvl: 3,
            wide_environment: true,
            smallness_lvl: 4,
            company_id: 'company-01',
        })

        await petsRepository.create({
            name: 'Pixie',
            description: 'A beautiful lady female',
            activity_lvl: 10,
            wide_environment: true,
            smallness_lvl: 2,
            company_id: 'company-02',
        })

        const { pets } = await sut.execute({ userZipcode: '32839' })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([expect.objectContaining({ name: 'Bjorn' })])
    })

    it('should be able to find pets by params', async () => {
        await companiesRepository.create({
            id: 'company-01',
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: await hash('123456', 6),
        })

        await companiesRepository.create({
            id: 'company-02',
            admin_name: 'Tayane Requiao',
            name: 'British Shorthair Cattery',
            email: 'british-cattery@example.com',
            address: '1440 NW N River Dr',
            zipcode: '33125',
            phone: '234 097 2345',
            password_hash: await hash('123456', 6),
        })

        await petsRepository.create({
            name: 'Bjorn',
            description: 'Lazy cat and fat',
            activity_lvl: 3,
            wide_environment: true,
            smallness_lvl: 4,
            company_id: 'company-01',
        })

        await petsRepository.create({
            name: 'Laik',
            description: 'Very friendly cat',
            activity_lvl: 5,
            wide_environment: true,
            smallness_lvl: 3,
            company_id: 'company-01',
        })

        await petsRepository.create({
            name: 'Pixie',
            description: 'A beautiful lady female',
            activity_lvl: 10,
            wide_environment: true,
            smallness_lvl: 2,
            company_id: 'company-02',
        })

        const { pets } = await sut.execute({
            userZipcode: '32839',
            description: 'friendly',
            smallness_lvl: 3,
            wide_environment: true,
            activity_lvl: 5,
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([expect.objectContaining({ name: 'Laik' })])
    })

    it('should not be able to find pets by zipcode', async () => {
        await companiesRepository.create({
            id: 'company-01',
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: await hash('123456', 6),
        })

        await companiesRepository.create({
            id: 'company-02',
            admin_name: 'Tayane Requiao',
            name: 'British Shorthair Cattery',
            email: 'british-cattery@example.com',
            address: '1440 NW N River Dr',
            zipcode: '33125',
            phone: '234 097 2345',
            password_hash: await hash('123456', 6),
        })

        await petsRepository.create({
            name: 'Bjorn',
            description: 'Lazy cat and fat',
            activity_lvl: 3,
            wide_environment: true,
            smallness_lvl: 4,
            company_id: 'company-01',
        })

        await petsRepository.create({
            name: 'Pixie',
            description: 'A beautiful lady female',
            activity_lvl: 10,
            wide_environment: true,
            smallness_lvl: 2,
            company_id: 'company-02',
        })

        const { pets } = await sut.execute({
            userZipcode: '32833',
        })

        expect(pets).toHaveLength(0)
    })

    it('should not be able to find pets by params', async () => {
        await companiesRepository.create({
            id: 'company-01',
            admin_name: 'Pedro Requiao',
            name: 'Ragdolls Cattery',
            email: 'ragdolls@example.com',
            address: '5404 Millenia lakes BLVD',
            zipcode: '32839',
            phone: '0011001100',
            password_hash: await hash('123456', 6),
        })

        await companiesRepository.create({
            id: 'company-02',
            admin_name: 'Tayane Requiao',
            name: 'British Shorthair Cattery',
            email: 'british-cattery@example.com',
            address: '1440 NW N River Dr',
            zipcode: '33125',
            phone: '234 097 2345',
            password_hash: await hash('123456', 6),
        })

        await petsRepository.create({
            name: 'Bjorn',
            description: 'Lazy cat and fat',
            activity_lvl: 3,
            wide_environment: true,
            smallness_lvl: 4,
            company_id: 'company-01',
        })

        await petsRepository.create({
            name: 'Pixie',
            description: 'A beautiful lady female',
            activity_lvl: 10,
            wide_environment: true,
            smallness_lvl: 2,
            company_id: 'company-02',
        })

        const { pets } = await sut.execute({
            userZipcode: '32839',
            description: 'Lazy',
            smallness_lvl: 1,
        })

        expect(pets).toHaveLength(0)
    })
})
