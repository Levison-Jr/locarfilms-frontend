export type MovieDto = {
    id: number,
    title: string,
    subTitle: string,
    description: string,
    category: string,
    status: MovieStatus,
    costPerDay: number,
    registrationDateTime: string,
    lastModifiedDateTime: string,
    imageBannerUrl: string,
    imageIconUrl: string
}

export type MovieStatus = "isAvailable" | "isRented" | "forPickup";