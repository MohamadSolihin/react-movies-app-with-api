import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  popular: "popular",
  top_rated: "top_rated",
  upcoming: "upcoming",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + type;
    return axiosClient.get(url, { params });
  },
  getTvList: (type, params) => {
    const url = "tv/" + type;
    return axiosClient.get(url, { params });
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    if (!category[cate]) {
      throw new Error(`Invalid category: ${cate}`);
    }
    const url = "search/" + category[cate];
    return axiosClient.get(url, { params });
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, { params });
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    // Perbaikan typo
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
