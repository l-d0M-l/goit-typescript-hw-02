import axios from "axios";

export const fetchData = async (searchedQuery, page) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: searchedQuery,
        page: page,
        per_page: 12,
        client_id: "oV-SR7oduFjhBdx6mxZBN0X7sjzTcn0Pdxqy0dROVEk",
      },
    });
    console.log(response.data, "asasas");
    const hasMorePages = page < response.data.total_pages;
    return {
      results: response.data.results,
      hasMore: hasMorePages,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch photos: ${error.message}`);
  }
};
