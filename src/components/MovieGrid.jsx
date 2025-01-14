import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MovieCard from './MovieCard';
import tmdbApi, { category, movieType, tvType } from '../api/tmdbApi';

const MovieGrid = ({ category: propCategory }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const fetchMovies = async () => {
            let response = null;
            const params = keyword
                ? { query: keyword, page }
                : { page };
    
            try {
                if (!keyword) {
                    response = propCategory === category.movie
                        ? await tmdbApi.getList(category.movie, movieType.upcoming, params)
                        : await tmdbApi.getList(category.tv, tvType.popular, params);
                } else {
                    response = await tmdbApi.search(propCategory, keyword, params);
                }
    
                setItems((prevItems) => (page === 1 ? response.results : [...prevItems, ...response.results]));
                setTotalPages(response.total_pages);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };
    
        fetchMovies();
    }, [keyword, page, propCategory]);
    

    const loadMore = () => setPage((prevPage) => prevPage + 1);

    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <MovieSearch category={propCategory} initialKeyword={keyword} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <MovieCard category={propCategory} item={item} key={index} />
                ))}
            </div>
            {page < totalPages && (
                <div className="text-center mt-6">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

const MovieSearch = ({ category, initialKeyword = '' }) => {
    const [keyword, setKeyword] = useState(initialKeyword);
    const navigate = useNavigate();

    const handleSearch = useCallback(() => {
        if (keyword.trim()) {
            navigate(`/${category}/search/${keyword}`); // Correctly reference the `category` directly.
        }
    }, [keyword, category, navigate]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleSearch]);

    return (
        <div className="relative max-w-md mx-auto">
            <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 pr-20 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Search
            </button>
        </div>
    );
};


export default MovieGrid;
