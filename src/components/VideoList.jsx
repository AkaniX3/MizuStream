import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../api/tmdbApi';
import PropTypes from 'prop-types';

// VideoList Component
const VideoList = ({ id }) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await tmdbApi.getVideos(category, id);
      setVideos(res.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }, [category, id]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <>
      {videos.length ? (
        videos.map((item, i) => (
          <Video key={i} item={item} />
        ))
      ) : (
        <p>No videos available.</p>
      )}
    </>
  );
};

VideoList.propTypes = {
  id: PropTypes.string.isRequired,
};

// Video Component
const Video = React.memo(({ item }) => {
  const iframeRef = useRef(null);

  // Dynamically adjust iframe height based on its width
  useEffect(() => {
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
    }
  }, []);

  // Fallback for missing video key
  const videoUrl = useMemo(() => {
    if (item.key) {
      return `https://www.youtube.com/embed/${item.key}`;
    }
    return ''; // No URL if the key is missing
  }, [item.key]);

  return (
    <div className="video">
      <div className="video title mb-4 mt-16 text-xl font-bold">
        <h2>{item.name}</h2>
      </div>
      {videoUrl ? (
        <iframe
          src={videoUrl}
          ref={iframeRef}
          width="100%"
            title={item.name}
          allowFullScreen
        />
      ) : (
        <p>Video unavailable</p>
      )}
    </div>
  );
});

Video.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoList;
