import React from "react";
import Image from "next/image";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
  useColorMode,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

const links = [
  { label: "My Confessions", to: "/myconfessions" },
  { label: "Coffees", to: "/coffees" },
];

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={useColorModeValue("gray.800", "gray.200")}
    _hover={{
      textDecoration: "none",
      color: useColorModeValue("gray.600", "gray.400"),
    }}
    href={to}
  >
    {children}
  </Link>
);

const Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      h="100vh"
      w="100vw"
      position="relative"
      zIndex="0"
      bg={useColorModeValue("white", "#171923")}
    >
      <Box px={4} maxWidth={"5xl"} m={"auto"} mt={"5"}>
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href={"/"}>
                <Image
                  src={"/confesster.svg"}
                  alt={"Confesster"}
                  width={"120"}
                  height={"120"}
                />
              </Link>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              {links.map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex
            alignItems={"center"}
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <IconButton
              size={"md"}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label={"Toggle Color Mode"}
              onClick={toggleColorMode}
              mr={4}
            />

            <Button
              variant={"solid"}
              colorScheme={"pink"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={() => {}}
            >
              Confess
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              size={"sm"}
              mr={4}
              onClick={() => {}}
            >
              Connect Wallet
            </Button>
          </Flex>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  {label}
                </NavLink>
              ))}
              <IconButton
                size={"md"}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label={"Toggle Color Mode"}
                onClick={toggleColorMode}
                mr={4}
              />

              <Button
                variant={"solid"}
                colorScheme={"pink"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={() => {}}
              >
                Confess
              </Button>
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                size={"sm"}
                mr={4}
                onClick={() => {}}
              >
                Connect Wallet
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Layout;
