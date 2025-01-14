import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";

import CastList from "../components/CastList";
import VideoList from "../components/VideoList";
import MovieList from "../components/MovieList";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await tmdbApi.detail(category, id, { params: {} });
        setItem(response);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetail();
  }, [category, id]);

  const bannerImage = useMemo(() => {
    return item ? apiConfig.originalImage(item.backdrop_path || item.poster_path) : "";
  }, [item]);

  const posterImage = useMemo(() => {
    return item ? apiConfig.originalImage(item.poster_path || item.backdrop_path) : "";
  }, [item]);

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {item && (
        <>
          {/* Banner */}
          <div
            className="relative h-[600px] bg-cover bg-center z-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(31, 41, 55, 1)), url(${bannerImage})`,
            }}
          >
            <div className="absolute inset-0"></div>
          </div>

          {/* Movie Content */}
          <div className="container mx-auto flex flex-col md:flex-row gap-32 px-32 mt-[-300px] relative z-10">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-[400px]">
              <div
                className="w-full h-0 pb-[150%] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${posterImage})` }}
              ></div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-16">{item.title || item.name}</h1>
              <div className="flex flex-wrap gap-2 mb-8">
                {item.genres?.slice(0, 5).map((genre, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-white rounded-lg text-sm font-medium bg-gray-800 text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="mb-12">{item.overview}</p>

              {/* Casts */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Casts</h2>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="container mx-auto px-4 mt-8">
            {/* Videos */}
            <div className="mb-8">
              <VideoList id={item.id} />
            </div>

            {/* Similar Movies */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 mt-24">Similar</h2>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;