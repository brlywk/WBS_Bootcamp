/* eslint-disable react/prop-types */
import { Flex, IconButton, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Pagination = ({ currentPage, totalPages, changeHandler }) => {
  // we don't need states because changes cause rerender anyway
  const hasPrevious = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  // handle changes via input field
  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value;

      // only allow numbers 0 < number < totalPages
      if (!Number(value) || value > totalPages || value <= 0) {
        event.currentTarget.blur();
        return;
      }

      // -1 because API starts at page 0, but we want to display page 1
      changeHandler(value - 1);
    }

    if (event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  // handle click of prev / next buttons
  const handleButtonClick = (change) => {
    const newPage = currentPage + change;

    if (newPage >= 0 && newPage < totalPages) {
      changeHandler(newPage);
    }
  };

  return (
    <Flex marginY="2rem" paddingX={["1rem", "1rem", "0", "0"]} justifyContent="center">
      {/* The beginning of everything */}
      <IconButton
        icon={<ArrowLeftIcon />}
        marginRight=".25rem"
        fontSize=".65rem"
        isDisabled={currentPage === 0}
        onClick={() => changeHandler(0)}
      />

      {/* Previous page */}
      <IconButton
        icon={<ArrowBackIcon />}
        marginRight=".25rem"
        isDisabled={!hasPrevious}
        onClick={() => handleButtonClick(-1)}
      />

      {/* Jump to page */}
      <InputGroup width="auto">
        <Input
          type="text"
          defaultValue={currentPage + 1}
          htmlSize={5}
          bgColor="white"
          borderColor="teal.600"
          focusBorderColor="teal.400"
          color="teal.400"
          onFocus={(event) => event.currentTarget.select()}
          onBlur={(event) => (event.currentTarget.value = currentPage + 1)}
          onKeyDown={handleInputChange}
        />
        <InputRightElement pointerEvents="none" color="teal.500">
          <Text color="gray.300" fontWeight="bold" marginRight=".25rem">
            of
          </Text>
          <Text color="gray.300" marginRight="1rem">
            {totalPages}
          </Text>
        </InputRightElement>
      </InputGroup>

      {/* Next page */}
      <IconButton
        icon={<ArrowForwardIcon />}
        marginX=".25rem"
        isDisabled={!hasNext}
        onClick={() => handleButtonClick(+1)}
      />

      {/* The end of everything */}
      <IconButton
        icon={<ArrowRightIcon />}
        marginRight=".25rem"
        fontSize=".65rem"
        isDisabled={currentPage === totalPages - 1}
        onClick={() => changeHandler(totalPages - 1)}
      />
    </Flex>
  );
};

export default Pagination;
