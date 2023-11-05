import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BrandLogo } from "../BrandLogo";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const AuthHeader = () => {
  const { userEmail } = useSelector((state: RootState) => state.auth);

  return (
    <Box as="header" bgColor="black">
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        bgColor="black"
        py={2}
        gap={3}
        maxWidth={1024}
        margin="0 auto"
      >
        <Box flexDirection="row" gap={2} alignItems="center" flex={1}>
          <BrandLogo />
        </Box>
        {userEmail ? (
          <Flex>
            <Text as="b" color="white">
              Olá, {userEmail}!{" "}
            </Text>
            <Button maxWidth={250} colorScheme="yellow">
              sair
            </Button>
          </Flex>
        ) : (
          <Flex
            flexDirection={{
              base: "column",
              md: "row",
            }}
            gap={3}
          >
            <Input bgColor="white" width={250} placeholder="e-mail" />
            <Input bgColor="white" width={250} placeholder="senha" />
            <Button maxWidth={250} colorScheme="yellow">
              entrar
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
