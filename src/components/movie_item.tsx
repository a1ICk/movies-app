'use client';

import { Flex, Image, Text, Paper, Box } from '@mantine/core';
import { IMovie } from '../../lib/movie';
import { IGenre } from '../../lib/genre';
import Link from 'next/link';
import RatingStar from '../../public/rating_star.svg';
import RatedStar from '../../public/star_rated.svg';
import NotRatedStar from '../../public/star_not_rated.svg';
import NoPoster from '../../public/no_poster.svg';
import RatingModal from './rating_modal';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const BASE_IMAGES_URL = 'https://image.tmdb.org/t/p/original';

const MovieItem = ({
  movie,
  genres,
}: {
  movie: IMovie;
  genres: IGenre[] | null;
}) => {
  const [rating, setRating] = useState<string | null>();

  useEffect(() => {
    setRating(window.localStorage.getItem(`movie-${movie.id}`));
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  function convertNumber(vote_count: number) {
    if (vote_count > 1_000_000) {
      return Math.round(vote_count / 1_000_000) + 'M';
    } else if (vote_count > 1_000) {
      return Math.round(vote_count / 1_000) + 'K';
    }
    return vote_count;
  }

  return (
    <Paper p={24} radius={12} bg={'white'} maw={482} h={218}>
      <RatingModal close={close} opened={opened} movie={movie} />
      <Flex gap={8} justify={'space-between'}>
        <Flex key={movie.id} gap={16}>
          {movie.poster_path === null || movie.poster_path === undefined ? (
            <Image w={120} h={170} alt={'No poster'} src={NoPoster.src} />
          ) : (
            <Image
              loading="lazy"
              w={120}
              h={170}
              alt={movie.original_title}
              src={`${BASE_IMAGES_URL}${movie.poster_path}?api_key=1d74b95816011e440a66ebdd78e3468c`}
            />
          )}

          <Flex direction={'column'} justify={'space-between'}>
            <Box>
              <Text
                component={Link}
                c={'grape.5'}
                fw={600}
                size={'20px'}
                href={`/movies/${movie.id}`}
              >
                {movie.original_title}
              </Text>
              <Text c={'gray'}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
              <Flex gap={8}>
                <Flex align={'center'}>
                  <Image src={RatingStar.src} alt={'Rating star'} />
                  <Text size="16px" fw={600}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </Flex>

                <Text c={'grey.6'}>({convertNumber(movie.vote_count)})</Text>
              </Flex>
            </Box>
            <Box>
              <Flex direction={'row'} gap={12} wrap={'wrap'}>
                <Text c={'grey'}>Genres</Text>
                {genres?.map((genre) => (
                  <Text key={genre.id}>{genre.name}</Text>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Box>
          {!!rating ? (
            <Flex justify={'center'} align={'center'} gap={4}>
              <Image
                src={RatedStar.src}
                alt={'Rated star'}
                w={28}
                onClick={open}
              />
              <Text fw={600} size={'16px'}>
                {rating}
              </Text>
            </Flex>
          ) : (
            <Image
              src={NotRatedStar.src}
              alt={'Not rated star'}
              w={28}
              onClick={open}
            />
          )}
        </Box>
      </Flex>
    </Paper>
  );
};

export default MovieItem;
