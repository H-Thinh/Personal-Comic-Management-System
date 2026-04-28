import { useEffect, useState } from "react";
import { InterfaceDefault } from "../../../types/InterfaceDefault";
import { getGenreList } from "../../../api/genresApi";

interface ListGenreProps {
  selectedGenres: number[];
  handleSelectGenre: (id: number) => void;
}

const ListGenre: React.FC<ListGenreProps> = ({
  selectedGenres,
  handleSelectGenre,
}) => {
  const [dataGenre, setDataGenre] = useState<InterfaceDefault[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resGenre = await getGenreList();

        setDataGenre(resGenre.Genre);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="form-group" style={{ display: "flex" }}>
      <ul className="list-genre">
        {Object.keys(dataGenre).map((key, i) => (
          <li
            key={i}
            value={key}
            className={selectedGenres.includes(dataGenre[i].id) ? "active" : ""}
            onClick={() => handleSelectGenre(dataGenre[i].id)}
          >
            {dataGenre[i].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGenre;
