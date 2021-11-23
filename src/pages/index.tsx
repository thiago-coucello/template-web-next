import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import React from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

import { FormInput } from "../components/Input";
import { useAuth } from "../context/Auth/cotext";

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("O campo de email é obrigatório")
    .email("Este campo precisa ser um email válido"),
  password: yup.string().required("Por favor insira a senha"),
});

const Home: NextPage = () => {
  const { control, formState, handleSubmit, register } =
    useForm<SignInFormData>({
      resolver: yupResolver(signInFormSchema),
    });
  const { errors } = useFormState({ control });
  const { signIn, credentialError, setCredentialError } = useAuth();

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    await signIn(email, password);
  };

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      flexGrow={1}
      justifyContent={"center"}
      height={"auto"}
    >
      <Flex
        as="form"
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
        width={["auto", "auto", "96"]}
      >
        <Stack spacing="6">
          {credentialError && (
            <Alert status="error">
              <AlertIcon />
              <Box>
                <AlertTitle mr={2}>Credenciais inválidas!</AlertTitle>
                <AlertDescription>
                  Verifique se você digitou corretamente seu email e senha.
                </AlertDescription>
              </Box>
              <CloseButton
                onClick={() => console.log("erro")}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          )}

          <FormInput
            error={errors.email}
            label="Email"
            type="email"
            {...register("email")}
          />
          <FormInput
            error={errors.password}
            label="Senha"
            type="password"
            {...register("password")}
          />
          <Button
            disabled={formState.isSubmitting}
            type="submit"
            colorScheme="primary"
            size="lg"
            fontSize="md"
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Home;
