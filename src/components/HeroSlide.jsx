import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal, { ModalContent } from './Modal';
import tmdbApi, { category } from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';

import 'swiper/css';

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
      const getMovies = async () => {
          try {
              const response = await tmdbApi.getList('movie', 'popular', { params: { page: 1 } });
              if (response && response.results) {
                  setMovieItems(response.results.slice(1, 4));  // Only first 3 items for now
              } else {
                  console.error('No movies found in the response.');
                  setMovieItems([]);
              }
          } catch (error) {
              console.error('Error fetching movies:', error.message);
          }
      };
      getMovies();
  }, []);

  return (
    <div className="relative">
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            <HeroSlideItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = ({ item }) => {
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  const fetchTrailer = async () => {
    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id);
      if (videos.results.length > 0) {
        setTrailerUrl(`https://www.youtube.com/embed/${videos.results[0].key}`);
      } else {
        setTrailerUrl(null);
      }
      setModalActive(true);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      className="h-[750px] w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'black' }} // Ensure the background is black
    >
      {/* Background image */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${background}), linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover', // Ensure the image covers the container
          backgroundBlendMode: 'overlay',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-start">
        <h2 className="text-5xl font-bold text-white mb-16">{item.title}</h2>
        <p className="text-white mb-6 w-1/2">{item.overview}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/movie/${item.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Watch Now
          </button>
          <button
            onClick={fetchTrailer}
            className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600"
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Modal for Trailer */}
      <Modal active={isModalActive} id={`modal_${item.id}`}>
        <ModalContent onClose={() => setModalActive(false)}>
          {/* Close Button */}
          <button
            onClick={() => setModalActive(false)}
            className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100"
            aria-label="Close Modal"
          >
            ✕
          </button>

          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              width="900px"
              height="600px"
              allow="autoplay; encrypted-media"
              title="Trailer"
              className="rounded-lg"
            ></iframe>
          ) : (
            <p className="text-center text-gray-700">No trailer available</p>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

HeroSlideItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HeroSlide;
