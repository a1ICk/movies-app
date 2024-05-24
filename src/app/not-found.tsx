import { Button, Flex, Image, Text } from '@mantine/core';
import NotFoundImage from '../../public/not_found_404.png';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Flex direction={'column'} gap={48} align={'center'} justify={'center'}>
      <Image
        src={NotFoundImage.src}
        alt={'Not found image'}
        maw={656}
        mah={195}
      />
      <Flex gap={16} direction={'column'} align={'center'} justify={'center'}>
        <Text fw={600} size="20px">
          We can{'`'}t find the page you are looking for
        </Text>
        <Button component={Link} href={'/'} color={'grape'}>
          Go Home
        </Button>
      </Flex>
    </Flex>
  );
}
