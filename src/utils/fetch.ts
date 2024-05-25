import { IMovie } from "../../lib/movie";
import URL from "../../lib/url";

type MovieSearchParams = {
    primary_release_year: string | null;
    vote_gte: number | null;
    vote_lte: number | null;
    genres: number[] | null;
    sort: string | null;
    page: number | null;
}

export const revalidate = 60 * 60 * 24;

export const fetchMovies = async (params: MovieSearchParams) => {
    const { primary_release_year, vote_gte, vote_lte, genres, sort, page } = params;

    const ry = primary_release_year === undefined ? '' : `?primary_release_year=${primary_release_year}`;
    const vg = vote_gte === undefined ? '' : `&vote_average.gte=${vote_gte}`;
    const vl = vote_lte === undefined ? '' : `&vote_average.lte=${vote_lte}`;
    const ge = genres === undefined ? '' : `&with_genres=${genres}`;
    const sb = sort === undefined ? '' : `&sort_by=${sort}`;

    const res = await fetch(URL() + `api/movies/p/${Number(page) || 1}/${ry}${vg}${vl}${ge}${sb}`);

    if (res.ok) return await res.json();
    throw new Error(await res.text());
}

export const fetchGenres = async () => {
    const res = await fetch(URL() + 'api/genres');

    if (res.ok) {
        const { genres } = await res.json();
        return genres;
    }
    throw new Error(await res.text());
}

export const fetchMovie = async (movieId: number) => {
    const res = await fetch(`${URL()}api/movies/${movieId}`);

    if (res.ok) return await res.json();
    throw new Error(await res.text());
}

export const fetchRatedMovies = async (movieIds: number[]) => {
    let ratedMovies: IMovie[] = [];

    try {
        movieIds.forEach(async (id: number) => {
            const res = await fetch(`${URL()}api/movies/${id}`);
            if (res.ok) {
                const movie = await res.json();

                if (movie) ratedMovies.push(movie)
            }
        })
    }
    catch (error) {
        console.log(error);
    }

    return ratedMovies;
}
