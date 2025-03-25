import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import { fetchData } from "../FetchResults/FetchResults";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import css from "./App.module.css";
import { MoonLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [searchedQuery, setSearchedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState();
  //for modal window
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  function searchImages(searchInfo) {
    console.log(searchInfo);
    setSearchedQuery(searchInfo);
    setPage(1);
    setArticles([]);
  }

  function loadMore() {
    setPage(page + 1);
  }
  useEffect(() => {
    // do not fetch at first try
    if (!searchedQuery) return;

    //search the photos
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const { results, hasMore } = await fetchData(searchedQuery, page);
        console.log(results);
        setHasMore(hasMore);
        setArticles((prevArticles) => {
          return [...prevArticles, ...results];
        });
        if (results.length === 0) {
          toast.error("Sorry, no photos found for this query", {
            position: "top-right",
            style: {
              fontSize: "12px",
              padding: "4px 8px",
              margin: "4px",
              borderRadius: "4px",
            },
          });
        }
      } catch (error) {
        setError(true);
        setHasMore(false);
        toast.error("Woops, something went wrong, try reloading the page", {
          position: "top-right",
          style: {
            fontSize: "12px",
            padding: "4px 8px",
            margin: "4px",
            borderRadius: "4px",
          },
        });
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page, searchedQuery]);
  return (
    <>
      <SearchBar onSearch={searchImages}></SearchBar>
      {error && <b>Woops, something went wrong, try reloading the page</b>}
      {articles.length > 0 && (
        <ImageGallery
          articles={articles}
          onImageClick={handleImageClick}
        ></ImageGallery>
      )}

      {isLoading && (
        <div className={css.moonLoaderWrapper}>
          <MoonLoader size={30}></MoonLoader>
        </div>
      )}
      {articles.length > 0 && hasMore && (
        <LoadMoreBtn onClick={loadMore}></LoadMoreBtn>
      )}
      <Toaster />

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
