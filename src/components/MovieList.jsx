import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';

import tmdbApi from '../api/tmdbApi';

import MovieCard from './MovieCard';

const MovieList = ({ category, type, id }) => {
  const [items, setItems] = useState([]);

  const getList = useCallback(async () => {
    try {
      let response = null;
      const params = {};

      if (type !== 'similar') {
        if (category === category.movie) {
          response = await tmdbApi.getList(category, type, { params });
        } else {
          response = await tmdbApi.getList(category, type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setItems(response.results || []);
    } catch (error) {
      console.error('Failed to fetch movie list:', error);
    }
  }, [category, type, id]);

  useEffect(() => {
    getList();
    return () => {
      setItems([]);
    };
  }, [getList]);

  return (
    <div
      className="movie-list w-full py-4 overflow-x-auto scrollbar-hidden" // Enable horizontal scrolling
      style={{ WebkitOverflowScrolling: 'touch' }} // Smooth scrolling on touch devices
    >
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        preventClicks={false} // Allow clickable MovieCards
        preventClicksPropagation={false}
        touchStartForcePreventDefault={false}
        resistanceRatio={0.85}
        className="flex items-center"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="w-1/6 sm:w-1/4 md:w-1/5 lg:w-1/6">
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default MovieList;
