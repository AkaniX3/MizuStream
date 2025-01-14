const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    authToken: process.env.REACT_APP_AUTH_TOKEN,
    apiKey: process.env.REACT_APP_API_KEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;