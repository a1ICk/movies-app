'use client';

import { Flex, Box, Text, Loader, Paper } from '@mantine/core';
import React, { ReactNode, Suspense } from 'react';
import { FilterPanel } from './filter_panel';

export default function Home({ children }: { children: ReactNode }) {
  return (
    <Paper mih={'100vh'} mx={'auto'} bg={'gray.1'}>
      <Flex gap={40} direction={'column'}>
        <Flex direction={'column'} justify={'center'} align={'center'} gap={40}>
          <Flex align={'start'} justify={'start'} mx={'auto'}>
            <Box mt={'xl'}>
              <Text fw={700} size="32px">
                Movies
              </Text>
            </Box>
          </Flex>
          <Suspense fallback={<Loader color={'blue'} />}>
            <FilterPanel />
          </Suspense>
        </Flex>
        <Flex direction={'column'} align={'center'} justify={'center'}>
          <Suspense fallback={<Loader color={'blue'} />}>{children}</Suspense>
        </Flex>
      </Flex>
    </Paper>
  );
}
