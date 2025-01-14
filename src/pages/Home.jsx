import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlide from '../components/HeroSlide';
import MovieList from '../components/MovieList';

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
  return (
    <>
      <HeroSlide />

      <div className="w-full mx-auto bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mt-8 mb-6">
            <h2 className="text-4xl font-extrabold text-white">
              Trending Movies
            </h2>
            <Link to="/movie">
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
                See All Movies
              </button>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}/>
        </div>
      </div>

      <div className="w-full mx-auto bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mt-8 mb-6">
            <h2 className="text-4xl font-extrabold text-white">
              Top Rated Movies
            </h2>
            <Link to="/movie">
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
                See All Movies
              </button>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>
      </div>

      <div className="w-full mx-auto bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mt-8 mb-6">
            <h2 className="text-4xl font-extrabold text-white">
              Trending TV Series
            </h2>
            <Link to="/tv">
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
                See All TV Series
              </button>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}/>
        </div>
      </div>

      <div className="w-full mx-auto bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mt-8 mb-6">
            <h2 className="text-4xl font-extrabold text-white">
              Top Rated TV Series
            </h2>
            <Link to="/tv">
              <button className="px-6 py-2 border border-white text-white bg-transparent rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
                See All TV Series
              </button>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated}/>
        </div>
      </div>
    </>
  );
};

export default Home;
