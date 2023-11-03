/* eslint-disable react/prop-types */
import { Divider, Flex, Text } from "@chakra-ui/react";
import NewsItem from "./NewsItem";
import { Fragment } from "react";

const NewsList = ({ newsList, numberOffset = 0 }) => {
  return (
    <Flex marginY={["1rem", "1rem", "2rem", "2rem"]} paddingX={["1rem", "1rem", "0", "0"]} justifyContent="center">
      <Flex flexDirection="column" w={["100%", "100%", "80%", "80%"]} gap="1rem">
        {newsList &&
          newsList.length > 0 &&
          newsList.map((item, i) => (
            <Fragment key={item.objectID}>
              <Flex gap=".5rem" justifyContent="flex-start">
                <Text fontWeight="bold" bgGradient="linear(to-l, #4FD1C5, #1D4044 )" bgClip="text">{`${
                  numberOffset + i + 1
                }.`}</Text>
                <NewsItem newsItem={item} />
              </Flex>
              {i < newsList.length - 1 && <Divider zIndex="-1" />}
            </Fragment>
          ))}
      </Flex>
    </Flex>
  );
};

export default NewsList;
