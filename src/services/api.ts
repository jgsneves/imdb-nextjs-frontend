import axios from "axios";
import { store } from "../store";

export interface LoginResponse {
  access_token: string;
  expires_in: string;
}

export interface GetMoviesQueryParams {
  directorName?: string;
  genre?: string;
  name?: string;
  actors?: string;
}

export interface Movie {
  actors: string[];
  createdAt: Date;
  directorName: string;
  genre: string;
  id: string;
  name: string;
  releaseDate: Date;
  updatedAt: Date;
}

export class ApiService {
  private static BASE_URL = process.env.API_URL;

  public static login() {
    return this.buildAuthAxiosInstance().post<LoginResponse>("/login");
  }

  public static getMovies({
    actors,
    directorName,
    genre,
    name,
  }: GetMoviesQueryParams) {
    return this.buildAxiosInstance().get<Movie[]>("/movies", {
      params: {
        actors,
        directorName,
        genre,
        name,
      },
    });
  }

  private static buildAuthAxiosInstance() {
    if (!this.BASE_URL) throw new Error("API_URL env variable is not defined");

    return axios.create({
      baseURL: this.BASE_URL,
    });
  }

  private static buildAxiosInstance() {
    if (!this.BASE_URL) throw new Error("API_URL env variable is not defined");

    const { auth } = store.getState();

    return axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
  }
}
