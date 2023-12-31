import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CompaniesRepository } from '../company-repository'
import { getCoordinates } from '@/utils/mocks/mock-get-coordinates'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryCompaniesRepository implements CompaniesRepository {
    public items: Company[] = []

    async findManyNearbyCompany(userZipcode: string) {
        const { lat, lng } = getCoordinates(userZipcode)

        return this.items.filter((item) => {
            if (!item.latitude || !item.longitude) {
                const { lat: companyLat, lng: companyLng } = getCoordinates(
                    item.zipcode
                )
                const distance = getDistanceBetweenCoordinates(
                    {
                        latitude: lat,
                        longitude: lng,
                    },
                    {
                        latitude: companyLat,
                        longitude: companyLng,
                    }
                )
                return distance < 10
            } else {
                const distance = getDistanceBetweenCoordinates(
                    {
                        latitude: lat,
                        longitude: lng,
                    },
                    {
                        latitude: item.latitude.toNumber(),
                        longitude: item.longitude.toNumber(),
                    }
                )

                return distance < 10
            }
        })
    }

    async findByEmail(email: string) {
        const company = this.items.find((company) => company.email === email)
        if (!company) {
            return null
        }
        return company
    }

    async create(data: Prisma.CompanyCreateInput) {
        const { lat, lng } = getCoordinates(data.zipcode)

        const company = {
            id: data.id ?? randomUUID(),
            admin_name: data.admin_name,
            name: data.name,
            email: data.email,
            address: data.address,
            zipcode: data.zipcode,
            phone: data.phone,
            latitude: new Prisma.Decimal(lat.toString()),
            longitude: new Prisma.Decimal(lng.toString()),
            password_hash: data.password_hash,
            created_at: new Date(),
        }
        this.items.push(company)

        return company
    }
}
