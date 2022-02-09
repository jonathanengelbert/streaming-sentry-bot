import styled from "styled-components";
import { TmdbMovieRecord, TmdbMovieTitleResponse } from "./types";

const basePosterUrl = "https://image.tmdb.org/t/p/original/";

const StyledSearchResultsPreview = styled.aside`
  width: 50%;
  border: 3px solid red;
`;
const StyledDropDownResult = styled.div`
  background-color: antiquewhite;
  display: flex;
  height: 150px;
  border: 2px solid black;
  margin: 2px;
`;

const MovieThumbnail = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DropDownResult = (movieRecord: TmdbMovieRecord) => {
  const { id, title, poster_path, release_date } = movieRecord
  return (
  <StyledDropDownResult key={id}>
    <MovieThumbnail
      src={`${basePosterUrl}${poster_path}`}
      alt="Movie Poster"
    />
    <p>{title} <span>{release_date}</span></p>
  </StyledDropDownResult>
)};

type PropResult = {
  results: Array<TmdbMovieRecord>
}

const SearchResultsPreview = (props: PropResult ) => {
  const { results } = props
    return (
      <StyledSearchResultsPreview>
        { results.map(movie => DropDownResult(movie))}
      </StyledSearchResultsPreview>
    );
};

export default SearchResultsPreview;
