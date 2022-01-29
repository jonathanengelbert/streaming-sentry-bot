import { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const query = "&query=";

function debounce(func: ReturnType<any>, timeout = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Array<any>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const queryMovies = debounce(async (n: string) => {
  const data = await axios.get(baseUrl + API_KEY + query + n);
  console.log(data);
}, 800);

const MovieSearch = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    queryMovies(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title"></label>
      <input type="text" onChange={handleOnChange} />
    </form>
  );
};

export default MovieSearch;
