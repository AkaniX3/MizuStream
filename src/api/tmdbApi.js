import axiosClient from "./axiosClient";

export const category = { movie: 'movie', tv: 'tv' };
export const movieType = { upcoming: 'upcoming', popular: 'popular', top_rated: 'top_rated' };
export const tvType = { on_the_air: 'on_the_air', popular: 'popular', top_rated: 'top_rated' };

const tmdbApi = {
    getList: (cate, type, params = {}) => {
        if (!Object.keys(category).includes(cate)) throw new Error(`Invalid category: ${cate}`);
        const validTypes = cate === 'movie' ? movieType : tvType;
        if (!Object.values(validTypes).includes(type)) throw new Error(`Invalid type: ${type} for category: ${cate}`);
        const url = `${category[cate]}/${type}`;
        return axiosClient.get(url, { params });
    },
    getVideos: (cate, id) => axiosClient.get(`${category[cate]}/${id}/videos`, { params: {} }),
    search: (cate, keyword, params) => axiosClient.get(`/search/${cate}`, { params: { query: keyword, ...params } }),    
    detail: (cate, id, params) => axiosClient.get(`${category[cate]}/${id}`, params),
    credits: (cate, id) => axiosClient.get(`${category[cate]}/${id}/credits`, { params: {} }),
    similar: (cate, id) => axiosClient.get(`${category[cate]}/${id}/similar`, { params: {} }),
};

export default tmdbApi;
