import { Flex, Input, Text, Select, Button, Card } from "@chakra-ui/react";
import {
  CreateUserRequest,
  UserService,
} from "../../../../services/user-service";
import { useState } from "react";
import { UserRole } from "../../../../store/slices/auth-slice";
import { ErrorLogger } from "../../../../services/error-logger";

export const CreateUser = () => {
  const initialFormData = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: UserRole.ADMIN,
  };

  const [formData, setFormData] = useState<CreateUserRequest>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleCreateOnClick = () => {
    setIsLoading(true);
    UserService.createUser(formData)
      .then(() => setFormData(initialFormData))
      .catch((error) => ErrorLogger.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Card width={["100%", "50%"]}>
      <Flex gap={2} padding={2} flexDirection="column">
        <Text as="b" display="block">
          Cadastrar um novo usuário
        </Text>
        <label>
          Nome:
          <Input
            id="name"
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.name}
          />
        </label>
        <label>
          Email:
          <Input
            id="email"
            isDisabled={isLoading}
            type="email"
            onChange={handleInputOnChange}
            value={formData.email}
          />
        </label>
        <label>
          Senha:
          <Input
            id="password"
            type="password"
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.password}
          />
        </label>
        <label>
          Confirme a senha:
          <Input
            id="confirmPassword"
            type="password"
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.confirmPassword}
          />
        </label>
        <label>
          Privilégio:
          <Select
            id="role"
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            value={formData.role}
          >
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.USER}>User</option>
          </Select>
        </label>
        <Button
          colorScheme="yellow"
          onClick={handleCreateOnClick}
          isDisabled={isLoading}
        >
          salvar
        </Button>
      </Flex>
    </Card>
  );
};
