import { IMovie } from "./movie";

export interface IMovieList {
    results: IMovie[];
    total_pages: number;
}
