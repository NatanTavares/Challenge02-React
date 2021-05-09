import { UseGenre } from "../contexts/GenreContext";

export function Header() {
  const { selectedGenre } = UseGenre();

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>
    </div>
  );
}
