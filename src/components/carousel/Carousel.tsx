import "./style.scss";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImg/Img";
import CircleRating from "../circleRating.tsx/CircleRating";
import Genres from "../genres/Genres";

interface CarouselProps {
  data: {
    poster_path?: string;
    id: number;
    media_type?: string;
    vote_average: number;
    title?: string;
    name?: string;
    release_date?: string;
    genre_ids: number[];
  }[];
  loading: boolean;
  endPoint: string;
  title?: string;
}
interface ReduxState {
  home: {
    url: {
      poster: string;
    };
  };
}
const Carousel: React.FC<CarouselProps> = ({
  data,
  loading,
  endPoint,
  title,
}) => {
  const carouselContainer = useRef<HTMLDivElement>(null);
  // use to select or catch any dom/node/div etc where in js we use querySelector.
  const { url } = useSelector((state: ReduxState) => state.home);
  const navigate = useNavigate();

  const navigation = (dir: string) => {
    const container = carouselContainer.current;
    if (!container) {
      console.error("Carousel container not found");
      return;
    }

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && data?.length && <div className="carouselTitle">{title}</div>}
        {data?.length > 0 && (
          <>
            <BsFillArrowLeftCircleFill
              className="carouselLeftNav arrow"
              onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
              className="carouselRighttNav arrow"
              onClick={() => navigation("right")}
            />
          </>
        )}

        {!loading ? (
          <div ref={carouselContainer} className="carouselItems">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path // img url have some condition that will add before the item.poster_path that condition we have stored into url that'why here we use url
                : PosterFallback;
              const movieRate = Number(item.vote_average.toFixed(1)); // if 6.466 then 6.6

              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => {
                    navigate(`/${item.media_type || endPoint}/${item.id}`);
                  }}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating
                      rating={movieRate === 0.0 ? 8.4 : movieRate}
                    />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>

                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                  </div>

                  <div className="textBlock">
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
