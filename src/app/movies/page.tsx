import Home from '@/components/home';
import { MovieList } from '@/components/movie_list';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import { IMovie } from '../../../lib/movie';
import { fetchGenres, fetchMovies } from '@/utils/fetch';

type MovieSearchParams = {
  primary_release_year: string | null;
  vote_gte: number | null;
  vote_lte: number | null;
  genres: number[] | null;
  sort: string | null;
  page: number | null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: MovieSearchParams;
}) {
  const { results } = await fetchMovies(searchParams);
  const genres = await fetchGenres();

  return (
    <Suspense fallback={<Loader color="blue" />}>
      <Home>
        <MovieList movies={results} genres={genres} />
      </Home>
    </Suspense>
  );
}
