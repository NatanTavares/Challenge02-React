import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface GenreContextData {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
}

interface GenreProviderProps {
  children: ReactNode;
}

const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({ children }: GenreProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider
      value={{
        selectedGenreId,
        selectedGenre,
        genres,
        handleClickButton,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}

export const UseGenre = (): GenreContextData => useContext(GenreContext);
