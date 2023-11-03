/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Center, Spinner, Flex } from "@chakra-ui/react";
import axios from "axios";
import Navigation from "./components/Navigation";
import NewsList from "./components/NewsList";
import Footer from "./components/Footer";
import Pagination from "./components/Pagination";

function App() {
  // all the states!
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("React");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);

  // settings
  const numberOfPages = 30;

  // fetch data
  useEffect(() => {
    // reset state to starting point
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    // fetch data from API
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=${numberOfPages}&query=${searchTerm}&page=${currentPage}`
      )
      .then((res) => {
        setIsLoading(false);
        setTotalPages(res.data.nbPages);
        setNews(res.data.hits);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(err.message);
      });
  }, [searchTerm, currentPage]);

  // handle new search terms
  const handleSearchTermChange = (newSearchTerm) => {
    // reset page to zero to avoid any API call issues
    setCurrentPage(0);
    setSearchTerm(newSearchTerm);
  };

  // render
  return (
    <>
      {/* Nav */}
      <Navigation handleSearchChange={handleSearchTermChange} />

      {/* Loading Spinner */}
      {isLoading && (
        <Center marginY="4rem">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
        </Center>
      )}

      {/* News List */}
      {!isLoading && !isError && (
        <>
          <NewsList newsList={news} numberOffset={currentPage * numberOfPages} />
          <Pagination currentPage={currentPage} totalPages={totalPages} changeHandler={setCurrentPage} />
        </>
      )}

      {/* Error :( */}
      {!isLoading && isError && (
        <Flex
          w={["100%", "100%", "80%", "80%"]}
          marginY={["2rem", "2rem", "4rem", "4rem"]}
          marginX="auto"
          paddingX={["1rem", "1rem", "0", "0"]}
        >
          <Alert
            status="error"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            rounded="lg"
            gap="1rem"
          >
            <AlertIcon boxSize="3rem" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </Flex>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
