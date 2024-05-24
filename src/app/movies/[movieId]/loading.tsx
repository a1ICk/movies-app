import { Flex, Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Flex w={'100%'} mih={'100vh'} justify={'center'} align={'center'}>
      <Loader color="blue" />
    </Flex>
  );
}
