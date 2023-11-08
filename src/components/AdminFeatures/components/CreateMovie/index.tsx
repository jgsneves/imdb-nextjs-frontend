import { Flex, Button, Card, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  CreateMovieRequestBody,
  MovieService,
} from "../../../../services/movie-service";
import { ErrorLogger } from "../../../../services/error-logger";
import { mutate } from "swr";

interface FormData extends Omit<CreateMovieRequestBody, "actors"> {
  actors: string;
}

export const CreateMovie = () => {
  const initialFormData = {
    actors: "",
    directorName: "",
    genre: "",
    name: "",
    releaseDate: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleCreateOnClick = () => {
    setIsLoading(true);
    const actorsArray = formData.actors.split(",");
    const dateIsoString = new Date(formData.releaseDate).toISOString();

    MovieService.createMovie({
      ...formData,
      actors: actorsArray,
      releaseDate: dateIsoString,
    })
      .then(() => {
        setFormData(initialFormData);
        mutate(`${MovieService.BASE_URL}/movies?`);
      })
      .catch((error) => ErrorLogger.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Card width={["100%", "50%"]}>
      <Flex gap={2} padding={2} flexDirection="column">
        <Text as="b" display="block">
          Cadastrar um novo filme
        </Text>
        <label>
          Nome:
          <Input
            id="name"
            disabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.name}
          />
        </label>
        <label>
          Data de lançamento:
          <Input
            id="releaseDate"
            type="date"
            disabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.releaseDate}
          />
        </label>
        <label>
          Gênero:
          <Input
            id="genre"
            disabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.genre}
          />
        </label>
        <label>
          Nome do Diretor:
          <Input
            id="directorName"
            disabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.directorName}
          />
        </label>
        <label>
          Atores (separar por vírgulas):
          <Input
            id="actors"
            disabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.actors}
          />
        </label>
        <Button
          colorScheme="yellow"
          disabled={isLoading}
          onClick={handleCreateOnClick}
        >
          salvar
        </Button>
      </Flex>
    </Card>
  );
};
