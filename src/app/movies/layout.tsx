import type { Metadata } from 'next';
import '../globals.css';
import { SideBar } from '@/components/side_bar';
import '@mantine/core/styles.css';

import { AppShell, AppShellMain, AppShellNavbar } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'TMDB movies',
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell mx="auto" bg={'gray.1'} navbar={{ width: 344, breakpoint: 'sm' }}>
      <AppShellNavbar>
        <SideBar />
      </AppShellNavbar>
      <AppShellMain py={'xl'} mih={'100vh'} w={'100%'}>
        {children}
      </AppShellMain>
    </AppShell>
  );
}
