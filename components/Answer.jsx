import { Box, Container, Text } from '@chakra-ui/react';

const Answer = ({ answer }) => {
  return (
    <Container borderWidth="1px" borderRadius="lg" p={8}>
      {/* 
          // TODO: Add timestamps to answers
           */}
      {/* <Text></Text> */}
      <Text fontSize="lg">{answer}</Text>
    </Container>
  );
};

export default Answer;
