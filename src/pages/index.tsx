import Head from "next/head";
import { Inter } from "next/font/google";
import { AuthHeader } from "../components/AuthHeader";
import { MoviesFilters } from "../components/MoviesFilters";
import { Box, Divider, Flex } from "@chakra-ui/react";
import { MovieCard } from "../components/MovieCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Imdb - O seu repositório de filmes</title>
        <meta name="description" content="Imdb - O seu repositório de filmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthHeader />
      <Box maxWidth={1024} margin="0 auto">
        <MoviesFilters />
        <Flex flexDirection="column" gap={2}>
          <MovieCard />
          <Divider />
          <MovieCard />
          <Divider />
          <MovieCard />
          <Divider />
          <MovieCard />
          <Divider />
          <MovieCard />
          <Divider />
          <MovieCard />
        </Flex>
      </Box>
    </>
  );
}
