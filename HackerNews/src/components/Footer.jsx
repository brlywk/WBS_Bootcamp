import { Box, Flex, Link } from "@chakra-ui/react";

const Footer = () => {
  // render
  return (
    <Flex
      fontSize=".75rem"
      marginTop={["2rem", "2rem", "4rem", "4rem"]}
      marginBottom={[0, 0, "2rem", "2rem"]}
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        w={["100%", "100%", "80%", "80%"]}
        padding="1rem"
        bgColor="gray.100"
        rounded={["none", "none", "lg", "lg"]}
      >
        <Box>By Vijaya and Christoph</Box>
        <Box marginTop=".25rem">
          Made with{" "}
          <Link href="https://www.react.dev" color="teal.600" isExternal>
            React
          </Link>{" "}
          and{" "}
          <Link href="https://chakra-ui.com/" color="teal.600" isExternal>
            Chakra UI
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
