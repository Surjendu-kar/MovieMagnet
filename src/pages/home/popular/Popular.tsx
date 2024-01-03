import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
interface MovieData {
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
  }[];
}

//home -> style.scss
function Popular() {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch<MovieData>(`/${endPoint}/popular`);

  const onTabChange = (tab: string) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        data={data?.results}
        loading={loading}
        endPoint={endPoint}
        title={""}
      />
    </div>
  );
}

export default Popular;
