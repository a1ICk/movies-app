'use client';

import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Divider,
  Paper,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import NoProductionCompanyLogo from '../../../../public/no_production_company_logo.svg';
import RatingModal from '@/components/rating_modal';
import NotRatedStar from '../../../../public/star_not_rated.svg';
import RatingStar from '../../../../public/rating_star.svg';
import RatedStar from '../../../../public/star_rated.svg';
import { IMovie } from '../../../../lib/movie';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';

const BASE_IMAGES_URL = 'https://image.tmdb.org/t/p/original';

export const Movie = ({ movie }: { movie: IMovie }) => {
  const [rating, setRating] = useState<string | null>();
  const [opened, { open, close }] = useDisclosure(false);
  const items = [
    { title: 'Movies', href: '/' },
    { title: movie?.original_title, href: `/movie/${movie?.id}` },
  ].map((item, index) => (
    <Anchor href={item.href} c={'grape'} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    setRating(window.localStorage.getItem(`movie-${movie.id}`));
  }, []);

  return (
    <Flex direction={'column'} gap={16} maw={800} mx={'auto'}>
      <RatingModal close={close} opened={opened} movie={movie} />
      <Breadcrumbs>{items}</Breadcrumbs>
      <Paper radius={12} bg={'white'}>
        <Flex gap={16} p={24} justify={'space-between'}>
          <Flex gap={16}>
            <Image
              w={250}
              src={`${BASE_IMAGES_URL}${movie?.poster_path}?api_key=1d74b95816011e440a66ebdd78e3468c`}
              alt={'Movie poster'}
            />
            <Flex justify={'space-between'} direction={'column'}>
              <Flex gap={8} direction={'column'}>
                <Text c={'grape.5'} fw={600} size="20px">
                  {movie?.original_title}
                </Text>
                <Text c={'gray.6'} size="16px" fw={400}>
                  {new Date(movie?.release_date || '').getFullYear()}
                </Text>
                <Flex align={'center'} gap={4}>
                  <Image
                    w={28}
                    h={28}
                    src={RatingStar.src}
                    alt={'Rating star'}
                  />
                  <Text fw={600} size="16px" lh={'20px'}>
                    {movie?.vote_average}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={12} direction={'column'}>
                <SimpleGrid cols={2}>
                  <Text c={'gray.6'}>Duration</Text>
                  <Text>{movie?.runtime}</Text>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <Text c={'gray.6'}>Premiere</Text>
                  <Text>
                    {new Date(movie?.release_date || '').toDateString()}
                  </Text>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <Text c={'gray.6'}>Budget</Text>
                  <Text>${movie?.budget.toLocaleString('en-US')}</Text>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <Text c={'gray.6'}>Gross worldwide</Text>
                  <Text>${movie?.revenue.toLocaleString('en-US')}</Text>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <Text c={'gray.6'}>Genres</Text>
                  <Flex gap={8}>
                    {movie?.genres?.map((genre) => (
                      <Text key={genre.id}>{genre.name}</Text>
                    ))}
                  </Flex>
                </SimpleGrid>
              </Flex>
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

      <Paper radius={12} bg={'white'} p={24}>
        <Flex gap={20} direction={'column'}>
          <Flex gap={16} direction={'column'} mt={'xs'}>
            <Text fw={700}>Trailer</Text>
            <Paper>
              <iframe
                style={{ border: 0, borderRadius: '12px' }}
                width={500}
                height={281}
                src={`https://www.youtube.com/embed/${movie?.videos.results[0]?.key}`}
              ></iframe>
            </Paper>
          </Flex>

          <Divider />

          <Flex gap={16} direction={'column'} mt={'xs'}>
            <Text fw={700}>Description</Text>
            <Text>{movie?.overview}</Text>
          </Flex>

          <Divider />

          <Flex gap={16} direction={'column'} mt={'xs'}>
            <Text fw={700}>Production</Text>
            {movie?.production_companies.map((company) => (
              <Flex key={company.id} gap={10} align={'center'}>
                {company.logo_path === null ? (
                  <Image
                    fit="cover"
                    w={50}
                    h={50}
                    src={NoProductionCompanyLogo.src}
                    alt={`${company.name} logo`}
                  />
                ) : (
                  <Image
                    fit="cover"
                    w={50}
                    src={`${BASE_IMAGES_URL}${company?.logo_path}?api_key=1d74b95816011e440a66ebdd78e3468c`}
                    alt={`${company.name} logo`}
                  />
                )}
                <Text>{company.name}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
};
