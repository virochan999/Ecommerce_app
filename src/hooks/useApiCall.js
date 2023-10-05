import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = "GET", requestData = null) => {
    try {
      setLoading(true);

      const options = {
        method,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };

      if (requestData !== null) {
        // Include request data in the body for POST or PUT requests
        options.body = JSON.stringify(requestData);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network Error");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { loading, error, fetchData };
};

export default useApi;
