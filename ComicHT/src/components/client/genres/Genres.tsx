import "./Genres.css";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getComicByIdGenre, getGenreList } from "../../../api/genresApi";

import { ComicType } from "../../../types/ComicType";

import ListComic from "../../common/listComic/ListComic";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function Genres() {
  const [searchParams] = useSearchParams();

  const nagivate = useNavigate();
  const category = searchParams.get("category");

  const [dataListGenres, setDataListGenres] = useState<
    { id: number; name: string }[]
  >([]);

  const [dataComicByGenre, setDataComicByGenre] = useState<ComicType[]>([]);

  const [isTableGenres, setIsTableGenres] = useState<boolean>(false);

  const [numberGenre, setNumberGenre] = useState<number>(
    Number(localStorage.getItem("selectGenre") || category)
  );

  const getListGenres = async () => {
    try {
      const [resGenre, resComic] = await Promise.all([
        getGenreList(),
        getComicByIdGenre(Number(category)),
      ]);
      setDataListGenres(resGenre.Genre);
      setDataComicByGenre(resComic.comics);
    } catch (error) {}
  };

  useEffect(() => {
    getListGenres();
  }, [category]);

  return (
    <>
      <div className="container">
        <div className="list-genres">
          <h2 className="flex items-center">
            <p className="mr-2">Thể loại</p>
            {isTableGenres ? (
              <FaCaretUp
                className="cursor-pointer"
                onClick={() => setIsTableGenres(!isTableGenres)}
              />
            ) : (
              <FaCaretDown
                className="cursor-pointer"
                onClick={() => setIsTableGenres(!isTableGenres)}
              />
            )}
          </h2>
          {isTableGenres ? (
            <div>
              <ul className="genres-more grid grid-cols-9 gap-1">
                {dataListGenres.map((genre) => (
                  <li
                    className={`${genre.id === numberGenre ? "active" : ""}`}
                    onClick={() => setNumberGenre(genre.id)}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
              <button
                className="bg-red-500 p-2 mt-4 float-right text-white rounded-lg"
                onClick={() => {
                  localStorage.setItem("selectGenre", String(numberGenre));
                  nagivate(`/genres?category=${numberGenre}`);
                }}
              >
                Tìm kiếm
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <ListComic
          title="Truyện theo thể loại bạn chọn"
          dataComic={dataComicByGenre}
          isShowMore={false}
        />
      </div>
    </>
  );
}

export default Genres;
