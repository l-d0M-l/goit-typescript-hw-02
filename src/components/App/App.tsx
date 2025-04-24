import React, { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import { fetchData } from "../FetchResults/FetchResults";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import css from "./App.module.css";

import { MoonLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import ImageI from "./AppTypes";
// interface of photos we get from backend
// interface Image {
//   url: string;
//   id: number;
//   [key: string]: any;
// }

function App() {
  const [searchedQuery, setSearchedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [articles, setArticles] = useState<ImageI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  //for modal window

  const [selectedImage, setSelectedImage] = useState<ImageI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (image: ImageI): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const searchImages = (searchInfo: string): void => {
    setSearchedQuery(searchInfo);
    setPage(1);
    setArticles([]);
  };

  const loadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    // do not fetch at first try
    if (!searchedQuery) return;

    //search the photos
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const { results, hasMore } = await fetchData(searchedQuery, page);
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
