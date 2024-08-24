import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Textarea,
  Button,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import ParticlesComponent from "../../components/Particles";
import btc from "../../assets/btc.svg";
import eth from "../../assets/eth.svg";
import sol from "../../assets/sol.svg";

export default function JoinOurTeam() {
  return (
    <>
      <Box position={"relative"} bgGradient={"linear(to-bl, #1d3557,#001b2e)"}>
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
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              color={"#f1faee"}
            >
              100x Dev <p>Crypto Wallet</p>
            </Heading>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <Image
                borderRadius="full"
                boxSize="100px"
                src={btc}
                alt="Bitcoin"
                zIndex={10}
              />
              <Image
                borderRadius="full"
                boxSize="100px"
                src={eth}
                alt="Etherium"
                zIndex={10}
              />
              <Image
                borderRadius="full"
                boxSize="100px"
                src={sol}
                alt="Solana"
                zIndex={10}
              />
            </Stack>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            mb={4}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Create Your Wallet
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"dark.500"} fontSize={{ base: "sm", sm: "md" }}>
                Set up your secure crypto wallet in minutes and take control of
                your digital assets. Your keys, your crypto—get started now!
              </Text>
            </Stack>
            <Box as={"form"} mt={2}>
              <Stack spacing={4}>
                <Button
                  fontFamily={"heading"}
                  w={"full"}
                  bgGradient="linear(to-r, #8b2fc9,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
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
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Add a wallet
              </Button>
            </Box>
            form
          </Stack>
        </Container>
      </Box>
    </>
  );
}
