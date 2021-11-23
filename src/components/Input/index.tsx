import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
} from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputProps {
  icon?: ReactElement;
  name: string;
  error?: FieldError;
  label?: string;
}

const FormInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FormInputProps
> = ({ icon, name, error = null, label, ...rest }, ref): ReactElement => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
      <VStack>
        {icon}

        <FormControl isInvalid={!!error}>
          {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Input
            _hover={{
              bg,
            }}
            _focus={{
              bg,
              borderColor: useColorModeValue("blue.300", "blue.900"),
            }}
            name={name}
            id={name}
            ref={ref}
            size={"lg"}
            variant={"filled"}
            {...rest}
          />
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      </VStack>
    </>
  );
};

export const FormInput = forwardRef(FormInputBase);
