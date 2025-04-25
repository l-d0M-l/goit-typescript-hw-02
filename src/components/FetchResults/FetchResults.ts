import axios, { AxiosError } from "axios";
import ImageI from "../App/AppTypes";
// interface Photo {
//   id: string;
//   urls: {
//     small: string;
//     regular: string;
//     full: string;
//   };
//   description: string | null;
//   alt_description: string | null;
// }

interface FetchDataResponse {
  results: ImageI[]; // aray of pictures
  hasMore: boolean; // check for more pages
}

interface ResponseData {
  total_pages: number;
  results: ImageI[];
}

export const fetchData = async (
  searchedQuery: string,
  page: number
): Promise<FetchDataResponse> => {
  try {
    const response = await axios.get<ResponseData>(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: searchedQuery,
          page: page,
          per_page: 12,
          client_id: "oV-SR7oduFjhBdx6mxZBN0X7sjzTcn0Pdxqy0dROVEk",
        },
      }
    );
    console.log(response);
    const hasMorePages = page < response.data.total_pages;
    return {
      results: response.data.results,
      hasMore: hasMorePages,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      throw new Error(`Failed to fetch photos: ${error.message}`);
    } else {
      console.log("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
