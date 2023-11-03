/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const NewsItem = ({ newsItem }) => {
  // state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // simple function to get tld from url
  const getTld = (url) => {
    if (!url) return "";

    // every website should be using https:// by now (hopefully...)
    let tld = url.replace("https://", "");
    tld = tld.replace("www.", "");
    tld = tld.slice(0, tld.indexOf("/"));

    return tld;
  };

  // get time since post creation
  const getTimeAgo = (createdAt) => {
    // https://day.js.org/
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    dayjs.tz.setDefault(dayjs.tz.guess());
    const created = dayjs(createdAt);

    return created.fromNow();
  };

  return (
    <>
      <Flex flexDirection="column" w="100%">
        {/* Title & Tag */}
        <Stack direction={["column", "column", "row", "row"]} alignItems="center">
          {/* External Link */}
          {newsItem.url && (
            <Link href={newsItem.url} alignSelf="flex-start" isExternal>
              {newsItem.title}
            </Link>
          )}
          {/* Open Modal Link */}
          {!newsItem.url && (
            <Link onClick={onOpen} alignSelf="flex-start">
              {newsItem.title}
            </Link>
          )}

          {/* External Link TLD Tag */}
          {newsItem.url && (
            <Tag
              size="sm"
              w={["100%", "100%", "fit-content", "fit-content"]}
              colorScheme="teal"
              justifyContent="center"
            >
              {getTld(newsItem.url)}
            </Tag>
          )}
          {/* Modal Open Story Tag */}
          {!newsItem.url && (
            <Tag
              size="sm"
              w={["100%", "100%", "fit-content", "fit-content"]}
              colorScheme="gray"
              justifyContent="center"
            >
              Show
            </Tag>
          )}
        </Stack>

        {/* 2nd row */}
        <Stack direction="row" fontSize="xs" divider={<StackDivider />} marginTop=".5rem">
          <Text>{newsItem.points} points</Text>
          <Text>{newsItem.author}</Text>
          <Text>{getTimeAgo(newsItem.created_at)}</Text>
        </Stack>
      </Flex>

      {/* Story Text Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={["full", "full", "xl", "xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{newsItem.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{newsItem.story_text && parse(newsItem.story_text)}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewsItem;
