export class CompanyAlreadyExistsError extends Error {
    constructor() {
        super('Company Already Exists')
    }
}
