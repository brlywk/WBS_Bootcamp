/* eslint-disable react/prop-types */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Navigation = ({ handleSearchChange }) => {
  // state and derived variables
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const mobileNavDisplay = navIsOpen ? "flex" : "none";
  const navShadow = mobileNavDisplay === "none" ? "md" : ["none", "none", "md", "md"];

  // colors for lazyness
  const bgColor = "gray.100";

  // navigation items
  const navItems = [
    { title: "React", searchTerm: "React" },
    { title: "JavaScript", searchTerm: "JavaScript" },
    { title: "CSS", searchTerm: "CSS" },
    { title: "ChatGPT", searchTerm: "ChatGPT" },
  ];

  // handle change of searchTearm
  const handleSearchTopicChange = (topic) => {
    handleSearchChange(topic);
  };

  // search bar handler
  const handleSearchBar = (event) => {
    setSearchBarValue(event.currentTarget.value);
  };

  // submit search
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchBarValue) {
      handleSearchChange(searchBarValue);
      setSearchBarValue("");
    }

    if (event.key === "Escape") {
      setSearchBarValue("");
      event.currentTarget.blur();
    }
  };

  // repeating navigation elements
  const navElements = (
    <>
      {navItems &&
        navItems.length > 0 &&
        navItems.map((navItem) => (
          <Button
            key={navItem.title}
            colorScheme="teal"
            variant={["solid", "solid", "outline", "outline"]}
            w={["100%", "100%", "auto", "auto"]}
            onClick={() => handleSearchTopicChange(navItem.searchTerm)}
          >
            {navItem.title}
          </Button>
        ))}

      {!navItems && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Panic!</AlertTitle>
          <AlertDescription>Something went wrong loading the Navigation.</AlertDescription>
        </Alert>
      )}
    </>
  );
  const searchBar = (
    <Input
      type="text"
      placeholder="Search..."
      maxW={["100%", "100%", "20%", "20%"]}
      value={searchBarValue}
      onChange={handleSearchBar}
      onKeyDown={handleSearchSubmit}
      bgColor="white"
      borderColor="teal.600"
      focusBorderColor="teal.400"
      color="teal.400"
    />
  );

  // render
  return (
    <>
      <Flex
        position="sticky"
        top="0"
        justifyContent="space-between"
        alignItems="center"
        padding={[".5rem", ".5rem", "1rem", "1rem"]}
        gap={[0, 0, "1rem", "1rem"]}
        boxShadow={navShadow}
        bgColor={bgColor}
      >
        {/* "Logo" */}
        <Box>
          <Text bgGradient="linear(to-l, #4FD1C5, #1D4044 )" bgClip="text" fontSize="lg" fontWeight="extrabold">
            WBS HackerNews
          </Text>
        </Box>

        {/* Desktop Nav */}
        <Flex display={["none", "none", "flex", "flex"]} justifyContent="space-between" flexGrow="1">
          <Flex w="100%" justifyContent="space-between">
            <Flex display="flex" justifyContent="flex-start" gap="1rem">
              {navElements}
            </Flex>
            {searchBar}
          </Flex>
        </Flex>

        {/* Mobile - Hamburger Button */}
        <IconButton
          icon={navIsOpen ? <CloseIcon /> : <HamburgerIcon />}
          size="lg"
          mr={2}
          display={["flex", "flex", "none", "none"]}
          onClick={() => setNavIsOpen((prev) => !prev)}
          margin="0"
          colorScheme="teal"
        />
      </Flex>
      {/* Mobile Nav */}
      <Flex
        display={mobileNavDisplay}
        w="100%"
        flexDir="column"
        alignItems="center"
        gap="0.25rem"
        padding={[".5rem", ".5rem", "1rem", "1rem"]}
        boxShadow="md"
        position="sticky"
        top="4rem"
        bgColor={bgColor}
      >
        {navElements}
        {searchBar}
      </Flex>
    </>
  );
};

export default Navigation;
