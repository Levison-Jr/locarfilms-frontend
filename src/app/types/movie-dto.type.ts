export type MovieDto = {
    id: number,
    title: string,
    subTitle: string,
    description: string,
    duration: string,
    category: string,
    status: MovieStatus,
    costPerDay: number,
    releaseDate: string,
    registrationDateTime: string,
    lastModifiedDateTime: string,
    imageBannerUrl: string,
    imageIconUrl: string
}

export type MovieStatus = "isAvailable" | "isRented" | "forPickup";