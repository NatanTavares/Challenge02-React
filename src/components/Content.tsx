import { useEffect, useState } from "react";
import { UseGenre } from "../contexts/GenreContext";
import { api } from "../services/api";

import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import "../styles/content.scss";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const { selectedGenreId } = UseGenre();
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header />

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
