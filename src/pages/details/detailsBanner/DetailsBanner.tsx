import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import PosterFallback from "../../../assets/no-poster.png";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImg/Img";
import CircleRating from "../../../components/circleRating.tsx/CircleRating.js";
import { PlayIcon } from "../PlayIcon.js";
import VideoPopup from "../../../components/videoPopup/VideoPopup.js";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((each) => each.id);

  const director = crew?.filter(
    (f, index, self) =>
      (f.job === "Director" || f.known_for_department === "Directing") &&
      self.findIndex((t) => t.id === f.id) === index
  );

  let directorString = "";

  if (director && director.length > 0) {
    directorString = director.map((d) => d.name).join(", ");
  } else {
    directorString = "No directors found";
  }

  const writer = crew?.filter(
    (f) =>
      f.job === "Screenplay" ||
      f.job === "Story" ||
      f.job === "Writer" ||
      f.department === "Writing"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>

                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : {""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {(data.release_date || data.first_air_date) && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <span className="text">
                            {dayjs(
                              data.release_date || data.first_air_date
                            ).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : {""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Director */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">{directorString}</span>
                      </div>
                    )}
                    {/* Writer */}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((each, index) => (
                            <span key={index}>
                              {each.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {/* For Tv series */}

                    {!director && data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((each, index) => (
                            <span key={index}>
                              {each.name}
                              {data?.created_by?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
