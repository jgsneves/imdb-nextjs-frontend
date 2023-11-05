import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

export const MoviesFilters = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton borderStyle="none" px={0}>
          <Text
            flex={1}
            textAlign="left"
            as="h1"
            fontWeight={700}
            fontSize="xl"
          >
            Filtros (+)
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex flexDirection="column" gap={2}>
            <Text as="i" display="block">
              Filtre filmes por:
            </Text>
            <label>
              Nome
              <Input />
            </label>
            <label>
              Nome do Diretor
              <Input />
            </label>
            <label>
              Gênero
              <Input />
            </label>
            <label>
              Nome de Atores (separar por vírgula)
              <Input />
            </label>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
