import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

export const MovieCard = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">O poderoso chefão</Heading>

          <Text py="2">Diretor: Fulano de Tal</Text>
          <Text py="2">Gênero: ação</Text>
          <Text py="2">Atores: Fulano, Ciclano, etc</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="yellow">
            ver detalhes
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
