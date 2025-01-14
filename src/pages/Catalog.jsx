import React from 'react';
import { useParams } from 'react-router';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/MovieGrid';

const Catalog = () => {
  const { category } = useParams();

  const pageTitle = category === cate.movie ? 'Movies' : 'TV Series';

  return (
    <>
      {/* Main Container */}
      <div className="bg-gray-800 mx-auto px-4 py-8 pt-32">
        {/* Header and Content */}
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-white mb-6">
            Explore {pageTitle}
          </h2>
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
