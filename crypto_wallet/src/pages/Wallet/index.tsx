import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Textarea,
  Button,
  SimpleGrid,
  AvatarGroup,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import ParticlesComponent from "../../components/Particles";
import btc from "../../assets/btc.svg";
import eth from "../../assets/eth.svg";
import sol from "../../assets/sol.svg";
import useWallet from "../../hooks/useWallet";
import { useState } from "react";

const Wallet = () => {
  const { generateMnemonicPhrase, getMemonicSeed, getSolanaAdress } =
    useWallet();

  const [mnemonic, setMnemomic] = useState<string>();

  const handleGenerateMnemonic = async () => {
    // const phrase = await generateMnemonicPhrase();

    const seed = await getMemonicSeed(
      "penalty fade grow rapid extend liar fix invest clog torch worry slow"
    );

    const address = getSolanaAdress(1, seed);

    // setMnemomic(phrase);

    console.log(address);
  };
  return (
    <>
      <Box position={"relative"} bgGradient={"linear(to-l, #005C97,#05143F)"}>
        <Box>
          <ParticlesComponent />
        </Box>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          minH={"100vh"}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              color={"#f1faee"}
            >
              100x Dev
              <Text
                as={"p"}
                bgGradient="linear(to-r, #DD5E89,#F7BB97)"
                bgClip="text"
              >
                Crypto Wallet
              </Text>
            </Heading>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup>
                <Avatar
                  src={btc}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "lg", md: "xl" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    bgColor: "#FFFFFF",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
                <Avatar
                  src={eth}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "lg", md: "xl" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    bgColor: "#627EEA",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
                <Avatar
                  src={sol}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "lg", md: "xl" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    bgColor: "#000000",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              </AvatarGroup>
            </Stack>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            mb={4}
            zIndex={10}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Create Your Wallet
              </Heading>
              <Text color={"dark.500"} fontSize={{ base: "sm", sm: "md" }}>
                Set up your secure crypto wallet in minutes and take control of
                your digital assets. Your keys, your crypto—get started now!
              </Text>
            </Stack>
            <Box as={"form"} mt={2}>
              <Stack spacing={4}>
                <Button
                  onClick={handleGenerateMnemonic}
                  fontFamily={"heading"}
                  w={"full"}
                  bgGradient="linear(to-r, #000428,#004e92)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, #43cea2,#185a9d)",
                    boxShadow: "xl",
                  }}
                >
                  Create new wallet
                </Button>
                <Textarea
                  placeholder="Key phrase"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  mt={2}
                ></Textarea>
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={2}
                w={"full"}
                bgGradient="linear(to-r, #000428,#004e92)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, #43cea2,#185a9d)",
                  boxShadow: "xl",
                }}
              >
                Add a wallet
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Wallet;
