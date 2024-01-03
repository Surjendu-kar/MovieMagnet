import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<string | null>("loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url, "")
      .then((res) => {
        setLoading(null);
        setData(res as T);
      })
      .catch(() => {
        setLoading(null);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
