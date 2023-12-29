import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Register Company Use Case', () => {
    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        sut = new CreatePetUseCase(petsRepository)
    })
    it('should to able to register a pet', async () => {
        const { pet } = await sut.execute({
            name: 'Bjorn',
            description: 'Lazy cat and fat',
            activity_lvl: 3,
            wide_environment: true,
            smallness_lvl: 4,
            company_id: 'company-01',
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})
