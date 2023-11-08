import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BrandLogo } from "../BrandLogo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserRole, logOut, login } from "../../store/slices/auth-slice";
import { useState } from "react";
import { DateUtil } from "../../utils/date-util";
import { ErrorLogger } from "../../services/error-logger";
import { jwtDecode } from "jwt-decode";
import { AuthService, LoginRequestBody } from "../../services/auth-service";
import { useRouter } from "next/router";
import { AuthCookieService } from "../../services/auth-cookie-service";

export interface JwtPayload {
  email: string;
  role: UserRole;
  sub: string;
}

export const AuthHeader = () => {
  const [formData, setFormData] = useState<LoginRequestBody>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userEmail } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleBrandOnClick = () => {
    router.push("/");
  };

  const handleLogoutButtonOnClick = () => {
    dispatch(logOut());
    AuthCookieService.deleteAccessTokenCookie();
  };

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleLoginButtonOnClick = () => {
    setIsLoading(true);

    AuthService.login({
      email: formData.email,
      password: formData.password,
    })
      .then((result) => {
        const { access_token, expires_in } = result.data;
        const { email, role, sub } = jwtDecode<JwtPayload>(access_token);

        AuthCookieService.createAccessTokenCookie(access_token, expires_in);

        dispatch(
          login({
            accessToken: access_token,
            email,
            expiringDate:
              DateUtil.addDaysToCurrentDate(expires_in).toISOString(),
            role,
            id: sub,
          })
        );
      })
      .catch((error) => {
        ErrorLogger.log(error);
      })
      .finally(() => setIsLoading(false));
  };

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
        maxWidth={["90vw", 1024]}
        margin="0 auto"
      >
        <Box flexDirection="row" gap={2} alignItems="center" flex={1}>
          <Button
            variant="ghost"
            onClick={handleBrandOnClick}
            p={0}
            _hover={{ bg: "none" }}
          >
            <BrandLogo />
          </Button>
        </Box>
        {userEmail ? (
          <Flex alignItems="center" gap={2}>
            <Text as="b" color="white">
              Olá, {userEmail}!{" "}
            </Text>
            <Button
              maxWidth={250}
              colorScheme="yellow"
              onClick={handleLogoutButtonOnClick}
              size="sm"
            >
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
            alignItems="center"
          >
            <Input
              bgColor="white"
              width={250}
              placeholder="e-mail"
              id="email"
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              size="sm"
            />
            <Input
              bgColor="white"
              width={250}
              type="password"
              placeholder="senha"
              id="password"
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              size="sm"
            />
            <Button
              maxWidth={250}
              colorScheme="yellow"
              onClick={handleLoginButtonOnClick}
              isLoading={isLoading}
              size="sm"
            >
              entrar
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
