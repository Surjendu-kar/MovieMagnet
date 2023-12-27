import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { fetchDataFromApi } from "./utils/api";
// import { useSelector } from "react-redux";
import {  useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch(); // used to call hook
  // const { url } = useSelector((state) => state.home); // // used to get particular key like url,genres
  // console.log('url',url);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration", "").then((res) => {
      // console.log('res',res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url)); // used to call hook
    });
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route
          path="
        "
          element={<SearchResult />}
        />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
