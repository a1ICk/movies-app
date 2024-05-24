'use client';

import { Button, Flex, Image, Text } from '@mantine/core';
import NoRatedMovies from '../../../../public/no_rated_movies.png';
import Link from 'next/link';
import { IMovie } from '../../../../lib/movie';
import { useState, useEffect, Suspense } from 'react';
import { MovieList } from '@/components/movie_list';
import { fetchRatedMovies } from '@/utils/fetch';

export default function Page() {
  const [movies, setMovies] = useState<IMovie[] | null>(null);

  const fetchMovies = async () => {
    let ids = Array(window.localStorage.length)
      .fill(0)
      .map((_, index) => {
        let item = localStorage.key(index);

        if (item?.match('movie')) {
          return Number(item.split('-')[1] || 0);
        }
        return -1;
      })
      .filter((el) => el !== -1);

    setMovies(await fetchRatedMovies(ids));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Suspense>
      {movies?.length === 0 ? (
        <Flex direction={'column'} justify={'center'} align={'center'} gap={16}>
          <Image
            src={NoRatedMovies.src}
            alt={'No rated movies'}
            w={400}
            h={300}
          />
          <Text fw={600} size={'20px'}>
            You haven{'`'}t rated any films yet
          </Text>
          <Button component={Link} color={'grape'} href={'/'}>
            Find movies
          </Button>
        </Flex>
      ) : (
        <MovieList movies={movies || []} genres={[]} />
      )}
    </Suspense>
  );
}
