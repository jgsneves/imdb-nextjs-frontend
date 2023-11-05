import { useRouter } from "next/router";
import { AuthHeader } from "../../components/AuthHeader";
import Head from "next/head";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Filme = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Imdb - Filme: La Casa</title>
      </Head>
      <AuthHeader />
      <Box maxWidth={1024} margin="0 auto" pt={2}>
        <Flex gap={5}>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "400px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Box>
            <Text fontSize="4xl">Nome do Filme</Text>
            <Text py="2">Diretor: Fulano de Tal</Text>
            <Text py="2">Gênero: ação</Text>
            <Text py="2">Atores: Fulano, Ciclano, etc</Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Filme;
