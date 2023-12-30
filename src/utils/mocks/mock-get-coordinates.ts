interface CoordsInterface {
    lat: number
    lng: number
}

export function getCoordinates(zipcode: string): CoordsInterface {
    if (zipcode === '32839') {
        return { lat: 28.49174, lng: -81.40976 }
    } else if (zipcode === '33125') {
        return { lat: 25.78341, lng: -80.23936 }
    } else {
        return { lat: 28.47924, lng: -81.06006 }
    }
}
