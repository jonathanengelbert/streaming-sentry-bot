import axios from "axios";

import { ChangeEvent, ComponentState, FormEvent, useState } from "react";
import { TmdbMovieTitleResponse } from "./types";
import { debounce } from "../../../utils";
import SearchResultsPreview from "./SearchResultsPreview";


const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const query = "&query=";


const queryMovies = debounce(
  async (movieTitle: string, state: ComponentState) => {
    if (!movieTitle) {
      return;
    }
    const response = await axios
      .get<TmdbMovieTitleResponse>(baseUrl + API_KEY + query + movieTitle)
      .then((response) => response.data)
      .catch((e) => {
        console.log(e);
      });
    state(response);
  },
  800
);

const TitleSearch = () => {
  const sample = {
    adult: false,
    backdrop_path: "/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg",
    genre_ids: [878, 28, 12],
    id: 24428,
    original_language: "en",
    original_title: "The Avengers",
    overview:
      "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
    popularity: 309.739,
    poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    release_date: "2012-04-25",
    title: "The Avengers",
    video: false,
    vote_average: 7.7,
    vote_count: 26287,
  };

  const [movieResults, setMovieResults] =
    useState<TmdbMovieTitleResponse | null>(null);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(movieResults);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    queryMovies(e.target.value, setMovieResults);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        <input type="text" onChange={handleOnChange} />
        { movieResults
            ? <SearchResultsPreview results={movieResults.results}/>
            : null
        }
      </form>
    </>
  );
};

export default TitleSearch;
