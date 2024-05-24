'use client';

import { useRouter } from 'next/navigation';
import { Flex, Text, Button } from '@mantine/core';

export const SideBar = () => {
  const { push } = useRouter();

  return (
    <Flex gap={80} direction={'column'} p={24} bg={'grape.1'} h={'100%'}>
      <Text c={'grape.5'} fw={600} size="24px">
        ArrowFlicks
      </Text>
      <Flex gap={16} direction={'column'}>
        <Button
          justify="start"
          fullWidth
          color="black"
          variant="subtle"
          radius={'sm'}
          onClick={() => {
            push('/');
          }}
        >
          Movies
        </Button>
        <Button
          radius={'sm'}
          justify="start"
          color="black"
          fullWidth
          variant="subtle"
          onClick={() => {
            push('/movies/rated');
          }}
        >
          Rated Movies
        </Button>
      </Flex>
    </Flex>
  );
};
