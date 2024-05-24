import { IProductionCompany } from "./company";
import { IGenre } from "./genre";
import { IVideoList } from "./video_list";

export interface IMovie {
    id: number;
    original_title: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    release_date: string;
    genre_ids?: number[];
    genres: IGenre[];
    runtime: string;
    budget: number;
    revenue: number;
    production_companies: IProductionCompany[];
    videos: IVideoList;
}
