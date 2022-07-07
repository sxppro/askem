import { Heading, Center } from '@chakra-ui/react';

const WIPPage = () => {
  return (
    <Center h={'calc(100vh - 64px)'} p={4}>
      <Heading
        size="4xl"
        textAlign="center"
        bgGradient="linear(to-tr, #ee0979, #ff6a00)"
        bgClip="text"
      >
        Under Construction
      </Heading>
    </Center>
  );
};

export default WIPPage;
