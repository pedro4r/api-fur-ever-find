import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { SearchPetByZipcodeUseCase } from './search-pet-by-zipcode'

let companiesRepository: InMemoryCompaniesRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetByZipcodeUseCase

describe('Search Pet Bt Zipcode Use Case', () => {
    beforeEach(() => {
        companiesRepository = new InMemoryCompaniesRepository()
        petsRepository = new InMemoryPetsRepository(companiesRepository)
        sut = new SearchPetByZipcodeUseCase(petsRepository)
    })
    it('should to able to find pets by zipcode', async () => {
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
})
