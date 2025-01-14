import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'; // Importing the play icon
import apiConfig from '../api/apiConfig';

const MovieCard = ({ item, category }) => {
  const link = `/${category}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link} className="movie-card relative group">
      {/* Card Background */}
      <div
        className="w-full bg-cover bg-top rounded-lg mb-4"
        style={{ backgroundImage: `url(${bg})`, paddingTop: '160%' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg"></div>

        {/* Button */}
        <button
          className="absolute inset-0 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
          aria-label="Play Movie"
        >
          <FaPlay className="text-white text-4xl" />
        </button>
      </div>

      {/* Movie Title */}
      <h3 className="text-white text-center mt-2 text-lg font-semibold">
        {item.title || item.name}
      </h3>
    </Link>
  );
};

export default MovieCard;
