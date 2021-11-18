import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { Divider, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { DrawerFooter, Flex, Switch } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function UserMenu(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Desktop User Menu */}
      <HStack display={{ base: "none", md: "flex" }} mr={5} spacing={2}>
        <IconButton
          icon={colorMode === "dark" ? <FaMoon /> : <FaSun />}
          aria-label={"Alterar tema"}
          onClick={toggleColorMode}
        />
        <Menu>
          <MenuButton>
            <Avatar src={"/user.png"} />
          </MenuButton>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
            <MenuItem>Item 4</MenuItem>
            <MenuItem>Item 5</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Mobile User Menu */}

      <Flex display={{ base: "flex", md: "none" }} mr={5}>
        <Avatar src={"/user.png"} onClick={onOpen} mr={5} />
      </Flex>

      <Drawer isOpen={isOpen} placement={"right"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Text>CORPO</Text>
            <Divider />
            <Flex
              mt={5}
              justifyContent={"space-evenly"}
              alignContent={"center"}
            >
              <FaSun size={28} />
              <Switch
                onChange={toggleColorMode}
                defaultChecked={colorMode === "dark"}
                size={"lg"}
              />
              <FaMoon size={28} />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Text>TEMPLATE</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
