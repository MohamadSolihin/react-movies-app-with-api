const apiConfig = {
  baseURL: "https://api.themoviedb.org/3/",
  apikey: "0a880d414e6058278c035c3aef1213dd",
  originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
