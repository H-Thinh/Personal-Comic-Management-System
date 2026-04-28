import { Switch } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchComicsProps {
  user: { role: string } | null;
  input: { search: string };
  searchRef: React.RefObject<HTMLInputElement | null>;
  isDownSearch: boolean;
  dataSearchComic: { id: number; title: string; coverImage: string }[];
  setInput: React.Dispatch<
    React.SetStateAction<{ message: string; search: string }>
  >;
  setIsDownSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDownGenres: React.Dispatch<React.SetStateAction<boolean>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchIcon = CiSearch as React.FC<{
  className?: string;
  size?: number;
  onClick?: Function;
}>;

function SearchComics({
  user,
  input,
  searchRef,
  isDownSearch,
  dataSearchComic,
  setInput,
  handleInput,
  setIsDownSearch,
  setIsDownGenres,
}: SearchComicsProps) {
  const navigate = useNavigate();

  function handleFocusInput() {
    if (!input) {
      searchRef.current?.focus();
    } else {
      alert("Tìm kiếm thành công");
    }
  }

  return (
    <div className="search items-center">
      <input
        ref={searchRef}
        type="text"
        placeholder="Tìm kiếm truyện..."
        name="search"
        value={input.search}
        className="search-comic"
        onChange={handleInput}
        onClick={() => setIsDownGenres(false)}
      />
      <SearchIcon className="search-btn" size={30} onClick={handleFocusInput} />
      {user?.role === "Client" ? (
        ""
      ) : (
        <Switch
          className="tex"
          unCheckedChildren={<FaUser style={{ height: 20 }} />}
          onChange={() => navigate("/admin")}
        />
      )}
      <div className={`search-down ${isDownSearch ? "" : "hide"}`}>
        <ul className="search-list-result">
          {dataSearchComic.length > 0 ? (
            dataSearchComic.map((comic) => (
              <li
                key={comic.id}
                className="cursor-pointer flex items-center"
                onClick={() => {
                  navigate(`/detail/${comic.id}`);
                  setInput((prev) => ({ ...prev, search: "" }));
                  setIsDownSearch(false);
                }}
              >
                <div className="search-img">
                  <img src={comic.coverImage} alt={comic.title} />
                </div>
                <div className="search-info ml-2">
                  <p className="name">{comic.title}</p>
                </div>
              </li>
            ))
          ) : (
            <li
              className="text-gray-500 text-center p-2"
              style={{ height: "30px" }}
            >
              Không tìm thấy truyện nào
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchComics;
