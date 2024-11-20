import { MovieStatusEnum } from "../enums/movie-status-enum";

export type MovieDto = {
    id: number,
    title: string,
    subTitle: string,
    description: string,
    duration: string,
    category: string,
    status: MovieStatusEnum,
    costPerDay: number,
    releaseDate: string,
    registrationDateTime: string,
    lastModifiedDateTime: string,
    imageBannerUrl: string,
    imageIconUrl: string,
    youTubeTraillerUrl: string
}
