interface mockGetDistanceBetweenZipCodesParams {
    userZipcode: string
    companyZipcode: string
}

export function mockGetDistanceBetweenZipCodes({
    userZipcode,
    companyZipcode,
}: mockGetDistanceBetweenZipCodesParams): Promise<number> {
    let distance: number

    if (companyZipcode === '32839') {
        distance = 5
    } else {
        distance = 300
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(distance)
        }, 300) // 3000 milissegundos = 3 segundos de atraso
    })
}
