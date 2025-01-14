import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';

const CastList = memo((props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await tmdbApi.credits(category, props.id);
        setCasts(res.cast);
      } catch (error) {
        console.error('Failed to fetch cast details:', error);
      } finally {
        setLoading(false);
      }
    };
    getCredits();
  }, [category, props.id]);

  const displayedCasts = showAll ? casts : casts.slice(0, 5);

  return (
    <div className="casts">
      {loading ? (
        <p>Loading cast details...</p>
      ) : (
        <>
          {displayedCasts.map((item, i) => (
            <div key={i} className="casts__item" aria-label={`Cast member: ${item.name || 'Unknown Actor'}`}>
              <div
                className="casts__item__img"
                style={{backgroundImage: `url(${item.profile_path ? apiConfig.w500Image(item.profile_path) : ''})`}}
              ></div>
              <p className="casts__item__name">{item.name || 'Unknown Actor'}</p>
            </div>
          ))}
          {casts.length > 5 && (
            <button onClick={() => setShowAll(!showAll)} className="text-blue-500 mt-4">
              {showAll ? 'Show Less' : 'View All'}
            </button>
          )}
        </>
      )}
    </div>
  );
});

CastList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CastList;
