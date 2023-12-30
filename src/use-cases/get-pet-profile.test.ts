import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetProfileUseCase } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetPetProfileUseCase(petsRepository)
    })

    it('should be able get pet profile', async () => {
        const bjornCat = await petsRepository.create({
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

        const { pet } = await sut.execute({ id: bjornCat.id })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.name).toEqual('Bjorn')
    })
})
