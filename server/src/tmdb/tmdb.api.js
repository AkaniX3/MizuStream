import axiosClient from "../axios/axios.client";
import tmdbEndpoints from "./tmdb.endpoint";

const tmdbApi = {
    MediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmdbEndpoints.MediaList({ mediaType, mediaCategory, page })
    ),
    MediaDetail: async ({ mediaType, page }) => await axiosClient.get(
        tmdbEndpoints.MediaDetail({ mediaType, page })
    ),
    MediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmdbEndpoints.MediaGenres({ mediaType })
    ),
    MediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.MediaCredits({ mediaType, mediaId })
    ),
    MediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.MediaVideos({ mediaType, mediaId })
    ),
    MediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.MediaImages({ mediaType, mediaId })
    ),
    MediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndpoints.MediaRecommend({ mediaType, mediaId })
    ),
    MediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndpoints.MediaSearch({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndpoints.personMedias({ personId })
    )
}