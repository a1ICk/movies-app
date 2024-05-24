'use client';

import { SimpleGrid, Image, Text, Box, Flex, Pagination } from '@mantine/core';
import { IMovie } from '../../lib/movie';
import { IGenre } from '../../lib/genre';
import MovieItem from '@/components/movie_item';
import NotFoundMovies from '../../public/not_found_movie.png';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const MovieList = ({
  movies,
  genres,
}: {
  movies: IMovie[];
  genres: IGenre[];
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useSearchParams();
  const page = params.get('page');

  function handlePagination(page: string) {
    const p = new URLSearchParams(params);
    if (page) {
      p.set('page', page);
    } else {
      p.delete('page');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  if (movies.length === 0) {
    return (
      <Flex gap={16} direction={'column'} align={'center'} justify={'center'}>
        <Image
          w={310}
          h={252}
          src={NotFoundMovies.src}
          alt={'Not found movies'}
        />
        <Text fw={600} size={'20px'}>
          We don{'`'}t have such movies, look for another one
        </Text>
      </Flex>
    );
  }

  return (
    <Box mx={'auto'}>
      <SimpleGrid cols={2} spacing={16}>
        {movies.map((movie: IMovie) =>
          movie.genre_ids?.length === 0 ? (
            <MovieItem
              key={movie.id}
              movie={movie}
              genres={movie.genres || null}
            />
          ) : (
            <MovieItem
              key={movie.id}
              movie={movie}
              genres={
                genres.filter((genre: IGenre) =>
                  movie.genre_ids?.includes(genre.id),
                ) || null
              }
            />
          ),
        )}
      </SimpleGrid>
      <Flex w={'100%'} justify={'end'}>
        <Pagination
          color="grape"
          total={3}
          value={Number(page) || 1}
          onChange={(page) => handlePagination(String(page))}
          mt={'xl'}
        />
      </Flex>
    </Box>
  );
};
