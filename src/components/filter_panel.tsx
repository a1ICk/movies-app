'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Text, Flex, Select, Button } from '@mantine/core';
import { GenresSelect } from './genres_select';
import { IGenre } from '../../lib/genre';

const FilterItem = ({
  label,
  children,
}: {
  label: string;
  children: React.JSX.Element;
}) => {
  return (
    <Flex direction={'column'} gap={6}>
      <Text fw={700} size={'16px'}>
        {label}
      </Text>
      {children}
    </Flex>
  );
};

export const FilterPanel = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = useSearchParams();

  function handleReleaseYear(year: string) {
    const p = new URLSearchParams(params);
    if (year) {
      p.set('primary_release_year', year);
    } else {
      p.delete('primary_release_year');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  function handleRatingFrom(rating: string) {
    const p = new URLSearchParams(params);
    if (rating) {
      p.set('vote_gte', rating);
    } else {
      p.delete('vote_gte');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  function handleRatingTo(rating: string) {
    const p = new URLSearchParams(params);
    if (rating) {
      p.set('vote_lte', rating);
    } else {
      p.delete('vote_lte');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  function handleSortBy(sort: string) {
    const p = new URLSearchParams(params);
    if (sort) {
      p.set('sort', sort);
    } else {
      p.delete('sort');
    }
    replace(`${pathname}?${p.toString()}`);
  }

  const fillYears = Array.from({ length: 100 }, (_, i) =>
    String(i + new Date().getFullYear() - 99),
  ).reverse();

  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<IGenre[]>();
  useEffect(() => {
    fetch(URL + 'api/genres')
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
        setLoading(false);
      });
  }, []);

  return (
    <Flex direction={'column'} gap={24}>
      <Flex align={'end'} gap={16}>
        <FilterItem label={'Genres'}>
          {loading ? (
            <GenresSelect data={[]} />
          ) : (
            <GenresSelect data={genres || []} />
          )}
        </FilterItem>

        <FilterItem label={'Release Year'}>
          <Select
            placeholder="Select release year"
            data={fillYears}
            value={params.get('primary_release_year')}
            onChange={(e) => {
              if (e !== null) handleReleaseYear(e);
            }}
            w={284}
          />
        </FilterItem>

        <FilterItem label={'Ratings'}>
          <Flex gap={20}>
            <Select
              placeholder={'From'}
              data={Array(10)
                .fill(0)
                .map((_, index) => String(index + 1))}
              onChange={(e) => {
                if (e !== null) handleRatingFrom(e);
              }}
              value={params.get('vote_gte')}
              w={130}
            />
            <Select
              placeholder={'To'}
              data={Array(10)
                .fill(0)
                .map((_, index) => String(index + 1))}
              onChange={(e) => {
                if (e !== null) handleRatingTo(e);
              }}
              value={params.get('vote_lte')}
              w={130}
            />
          </Flex>
        </FilterItem>

        <Button
          type="reset"
          variant="subtle"
          color={'gray'}
          onClick={() => {
            replace(pathname);
          }}
          miw={81}
        >
          Reset filters
        </Button>
      </Flex>
      <Flex justify={'end'}>
        <FilterItem label={'Sort'}>
          <Select
            onChange={(e) => {
              if (e !== null) handleSortBy(e);
            }}
            data={[
              {
                label: 'Most Popular',
                value: 'popularity.desc',
              },
              {
                label: 'Least Popular',
                value: 'popularity.asc',
              },
              {
                label: 'Most Rated',
                value: 'vote_average.desc',
              },
              {
                label: 'Least Rated',
                value: 'vote_average.asc',
              },
              {
                label: 'Most Voted',
                value: 'vote_count.desc',
              },
              {
                label: 'Least Voted',
                value: 'vote_count.asc',
              },
            ]}
            value={params.get('sort')}
            placeholder="Select sort by"
            w={284}
          />
        </FilterItem>
      </Flex>
    </Flex>
  );
};
