interface mockGetDistanceBetweenZipCodesParams {
    userZipcode: string
    companyZipcode: string
}

export function mockGetDistanceBetweenZipCodes({
    userZipcode,
    companyZipcode,
}: mockGetDistanceBetweenZipCodesParams): Promise<number> {
    let distance: number

    if (userZipcode === companyZipcode) {
        distance = 5
    } else {
        distance = 300
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(distance)
        }, 300)
    })
}
