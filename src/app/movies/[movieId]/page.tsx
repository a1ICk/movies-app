import { fetchMovie } from '@/utils/fetch';
import { Movie } from './movie';

export default async function Page({
  params,
}: {
  params: { movieId: string };
}) {
  const movie = await fetchMovie(Number(params.movieId));

  return <Movie movie={movie} />;
}
