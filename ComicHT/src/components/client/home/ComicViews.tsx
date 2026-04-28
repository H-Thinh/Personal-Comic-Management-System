import { useNavigate } from "react-router-dom";

import { ComicType } from "../../../types/ComicType";

import { FaRegEye, FaStar } from "react-icons/fa";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { getComicListByView } from "../../../api/comicApi";

interface ComicViewsProps {}

function ComicViews({}: ComicViewsProps) {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [dataComicRank, setDataComicRank] = useState<ComicType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resRankComic = await getComicListByView(page);
        setDataComicRank(resRankComic.data);
        setTotalPage(resRankComic.totalPages);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  return (
    <div className="list-item">
      <h2>Truyện hay</h2>

      <ul className="grid grid-cols-2 gap-4 mt-6">
        {dataComicRank?.map((comic) => {
          const rates = comic.rates.reduce(
            (sum, rate) => (rate.status === "active" ? sum + rate.rating : 0),
            0
          );

          return (
            <li
              className="relative flex bg-gray-100 rounded-lg mb-1 p-2"
              key={comic.id}
            >
              <img
                src={comic.coverImage}
                alt={comic.title}
                style={{ width: 127, height: 200 }}
                className="cursor-pointer ml-2"
                onClick={() => navigate(`/detail/${comic.id}`)}
              />
              <div className="ml-6">
                <p
                  className="name-comic"
                  onClick={() => navigate(`/detail/${comic.id}`)}
                >
                  {comic.title}
                </p>
                <p className="chap-comic">{comic.chapters.length} Chap</p>
                <div className="text-sm mt-2">
                  {comic.genres.slice(0, 5).map((genre) => (
                    <span
                      className="bg-red-200 p-1 rounded-lg mr-2 cursor-pointer text-pink-800 mb-10"
                      key={genre.id}
                      onClick={() => navigate(`/genres?category=${genre.id}`)}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="line-clamp-3 text-sm mt-4" style={{ width: 400 }}>
                  {comic.content}
                </p>
                <div className="mt-2 flex justify-end">
                  <span className="flex items-center text-sm mr-2">
                    <FaStar color="yellow" />
                    <p className="ml-1">{rates}</p>
                  </span>
                  <span className="flex items-center text-sm">
                    <FaRegEye />
                    <p className="ml-1">{comic.views}</p>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        align="end"
        total={totalPage}
        pageSize={10}
        itemRender={(page, type, originalElement) => {
          if (type === "page") return null; // ẩn số trang
          return originalElement; // chỉ Prev/Next
        }}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default ComicViews;
